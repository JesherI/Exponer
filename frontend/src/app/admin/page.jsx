"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/header/header"
import Image from "next/image"
import './style.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

const AdminPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    client.get("/api/user")
      .then(res => {
        setCurrentUser(res.data);
        setError(null);
      })
      .catch(err => {
        console.error("Error al obtener el usuario:", err);
        setCurrentUser(null);
        setError('No estás autenticado. Por favor, inicia sesión.');
      });
  }, []);

  function submitLogout(e) {
    e.preventDefault();
    client.post("/api/logout")
      .then(() => {
        setCurrentUser(null);
        setError(null);
        router.push('/'); 
      })
      .catch(err => {
        console.error("Error al cerrar sesión:", err);
        setError('Error al cerrar sesión.');
      });
  }

  if (currentUser) {
    return (
      <div>
        <Header></Header>
        <div class="navbar">
          <div>
            <form onSubmit={submitLogout}>
              <button type="submit" variant="light">Log out</button>
            </form>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="center">
          <main className="body">
            <div className="title">
              <h1>Secretaría de Movilidad y Transporte</h1>
            </div>
            <div className="container">
              <div className="container">
                <div className='Tipos'>
                  <h1>Mi perfil</h1>
                </div>
                <div className="box-container">
                  <div className="text-boxes">
                    <div className="text-box">
                      <p>Administrador</p>
                    </div>
                    <div className="text-box">
                      <p>Nombre</p>
                      <div className='Lapiz'>
                        <Image src="/lapiz.png" alt="lapiz" width={20} height={20} />
                      </div>
                    </div>
                    <div className="text-box">
                      <p>Correo Electronico</p>
                      <div className='Lapiz'>
                        <Image src="/lapiz.png" alt="lapiz" width={20} height={20} />
                      </div>
                    </div>
                    <div className="text-box">
                      <p>Numero Telefonico</p>
                      <div className='Lapiz'>
                        <Image src="/lapiz.png" alt="lapiz" width={20} height={20} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='linea'>


                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className="image-boxes">
                    <Link href="/licences">
                      <div className="box">
                        <Image src="/admin1.jpeg" alt="Image 1" width={150} height={200} />
                        <center>
                          <p>Licencias</p><br />
                          <h1>Edita, Crea y Elimina <br /> las licencias desde aqui </h1>
                        </center>
                      </div>
                    </Link>
                    <div className="box">
                      <Image src="/admin3.png" alt="Image 2" width={150} height={200} />
                      <p>Reportes</p>
                      <p>Generar Reporte</p>
                      <p>Visualizar Reporte</p>
                    </div>
                    <div className="box">
                      <Image src="/admin2.jpeg" alt="Image 3" width={150} height={200} />
                      <p>Cursos</p>
                      <p>Agregar curso</p>
                      <p>Eliminar curso</p>
                      <p>Editar curso</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="center">
        {error ? <h2>{error}</h2> : <h2>Cargando...</h2>}
      </div>
    </div>
  );
};

export default AdminPage;
