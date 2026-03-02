import React, { useState } from 'react';

export default function Login({ setToken }) {
  // Estados para los campos: username y password
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();

    // Requisito: "Solicitar un token al endpoint /token del backend"
    const response = await fetch('http://localhost:3000/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if(data.token) {
      // Requisito: "Almacenar el token en el localstorage" 
      setToken(data.token); 
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  }

  return(
    <div id="error-page">
      <h1>Inicia Sesión</h1>
      <form id="contact-form" onSubmit={handleSubmit}>
        <label>
          <span>Usuario</span>
          <input type="text" onChange={e => setUserName(e.target.value)} required />
        </label>
        <label>
          <span>Contraseña</span>
          <input type="password" onChange={e => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Entrar</button>
        
      </form>
    </div>
  )
}