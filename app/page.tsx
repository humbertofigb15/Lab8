"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase.config";

type Usuario = {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
  estado: string;
};

export default function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("Viewer");
  const [estado, setEstado] = useState("Activo");

  // READ
  const obtenerUsuarios = async () => {
    const snapshot = await getDocs(collection(db, "usuarios"));

    const datos = snapshot.docs.map((documento) => ({
      id: documento.id,
      ...documento.data(),
    })) as Usuario[];

    setUsuarios(datos);
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // CREATE
  const agregarUsuario = async () => {
    if (!nombre.trim() || !correo.trim()) {
      alert("Completa nombre y correo");
      return;
    }

    await addDoc(collection(db, "usuarios"), {
      nombre,
      correo,
      rol,
      estado,
    });

    setNombre("");
    setCorreo("");
    setRol("Viewer");
    setEstado("Activo");

    obtenerUsuarios();
  };

  // DELETE
  const eliminarUsuario = async (id: string) => {
    const confirmar = confirm(
      "¿Seguro que deseas eliminar este usuario?"
    );

    if (!confirmar) return;

    await deleteDoc(doc(db, "usuarios", id));

    obtenerUsuarios();
  };

  // UPDATE
  const editarUsuario = async (usuario: Usuario) => {
    const nuevoNombre = prompt(
      "Nombre:",
      usuario.nombre
    );

    const nuevoCorreo = prompt(
      "Correo:",
      usuario.correo
    );

    const nuevoRol = prompt(
      "Rol (Admin, Editor o Viewer):",
      usuario.rol
    );

    const nuevoEstado = prompt(
      "Estado (Activo o Inactivo):",
      usuario.estado
    );

    if (
      !nuevoNombre ||
      !nuevoCorreo ||
      !nuevoRol ||
      !nuevoEstado
    ) {
      return;
    }

    await updateDoc(
      doc(db, "usuarios", usuario.id),
      {
        nombre: nuevoNombre,
        correo: nuevoCorreo,
        rol: nuevoRol,
        estado: nuevoEstado,
      }
    );

    obtenerUsuarios();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            VERA
          </h1>

          <p className="text-gray-500 mt-1">
            Administración de usuarios
          </p>
        </div>

        {/* FORMULARIO */}

        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">

          <h2 className="text-xl font-semibold mb-5">
            Registrar usuario
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) =>
                setNombre(e.target.value)
              }
              className="border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) =>
                setCorreo(e.target.value)
              }
              className="border rounded-lg p-3"
            />

            <select
              value={rol}
              onChange={(e) =>
                setRol(e.target.value)
              }
              className="border rounded-lg p-3"
            >
              <option value="Admin">
                Admin
              </option>

              <option value="Editor">
                Editor
              </option>

              <option value="Viewer">
                Viewer
              </option>
            </select>

            <select
              value={estado}
              onChange={(e) =>
                setEstado(e.target.value)
              }
              className="border rounded-lg p-3"
            >
              <option value="Activo">
                Activo
              </option>

              <option value="Inactivo">
                Inactivo
              </option>
            </select>

          </div>

          <button
            onClick={agregarUsuario}
            className="mt-5 bg-black text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-gray-800"
          >
            Agregar usuario
          </button>

        </div>

        {/* TABLA */}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">
              Usuarios registrados
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4">
                    Nombre
                  </th>

                  <th className="text-left p-4">
                    Correo
                  </th>

                  <th className="text-left p-4">
                    Rol
                  </th>

                  <th className="text-left p-4">
                    Estado
                  </th>

                  <th className="text-left p-4">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>

                {usuarios.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-8 text-center text-gray-500"
                    >
                      No hay usuarios registrados
                    </td>
                  </tr>
                ) : (
                  usuarios.map((usuario) => (

                    <tr
                      key={usuario.id}
                      className="border-t"
                    >

                      <td className="p-4 font-medium">
                        {usuario.nombre}
                      </td>

                      <td className="p-4">
                        {usuario.correo}
                      </td>

                      <td className="p-4">
                        {usuario.rol}
                      </td>

                      <td className="p-4">
                        {usuario.estado}
                      </td>

                      <td className="p-4">

                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              editarUsuario(usuario)
                            }
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() =>
                              eliminarUsuario(
                                usuario.id
                              )
                            }
                            className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                          >
                            Eliminar
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </main>
  );
}