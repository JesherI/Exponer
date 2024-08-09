"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/header/header"
import './style.css'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

const AdminPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

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
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <div>
    </div>
  );
};

export default AdminPage;
