"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from 'app/app/components/header/header';
import { useRouter } from 'next/navigation'; // Usa 'next/navigation' para la carpeta 'app'
import Link from 'next/link';
import './../style.css';

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
    const router = useRouter();


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
                router.push('/');
            })
            .catch(err => {
                console.error("Error al cerrar sesión:", err);
                setError('Error al cerrar sesión.');
            });
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    if (currentUser) {
        return (
            <div>
                <Header></Header>
                <div className="navbar">
                    <form onSubmit={submitLogout}>
                        <button type="submit" className="logout-button">Log out</button>
                    </form>
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
