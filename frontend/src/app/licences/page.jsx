"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/header/header";
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Usa 'next/navigation' para la carpeta 'app'
import './style.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

const AdminPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [licences, setLicences] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Usa useRouter desde 'next/navigation'

  useEffect(() => {
    // Obtener usuario
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

    // Obtener licencias
    client.get("/licence/licences")
      .then(res => {
        setLicences(res.data);
      })
      .catch(err => {
        console.error("Error al obtener las licencias:", err);
        setError('Error al obtener las licencias.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function submitLogout(e) {
    e.preventDefault();
    client.post("/api/logout")
      .then(() => {
        setCurrentUser(null);
        setError(null);
        router.push('/'); // Redirige a la raíz
      })
      .catch(err => {
        console.error("Error al cerrar sesión:", err);
        setError('Error al cerrar sesión.');
      });
  }

  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return hash;
  }

  function intToRGB(i) {
    const c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (currentUser) {
    return (
      <div>
        <Header />
        <div className="navbar">
          <form onSubmit={submitLogout}>
            <button type="submit" className="logout-button">Log out</button>
          </form>
        </div>
        <div className="title1">
          <h3>Licencias Disponibles</h3>
        </div>
        <div className="licences-container">
          {licences.map((licence) => (
            <div key={licence.id} className="licences-list">
              <div className="licence-card">
                <a href="#">
                  <div
                    className="licence-letter"
                    style={{ backgroundColor: licence.letter ? `#${intToRGB(hashCode(licence.letter))}` : "#f0f0f0" }}
                  >{licence.letter}</div>
                  <div className="licence-details">
                    <strong>{licence.name}</strong><br />
                    <p>{licence.description}</p>
                  </div>
                </a>
              </div>
            </div>
          ))}
          <Link href="/licences/create" className='licences-list'>
            <div className="licence-card">
              <div className="licence-letter">+</div>
              <div className="licence-details">
                <strong>Agregar Licencias</strong><br /><br />
                <p>Aquí puedes agregar más licencias</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AdminPage;
