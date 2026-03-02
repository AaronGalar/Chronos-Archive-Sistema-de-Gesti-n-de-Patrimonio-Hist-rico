import React from 'react';
import { useJwt } from "react-jwt";

function Profile() {
  const token = localStorage.getItem("token");
  // Requisito: "Para decodificar el token usar react-jwt"
  const { decodedToken } = useJwt(token || "");

  if (!decodedToken) return <div>Cargando perfil...</div>;

  return (
    <div>
      <h1>Mi Perfil</h1>
      <div style={{ background: '#eee', padding: '15px', borderRadius: '5px' }}>
        {/* Requisito: "mostrar los datos del usuario logueado" */}
        <p><strong>Usuario / Email:</strong> {decodedToken.username || decodedToken.email}</p>
        <p><strong>Tipo de cuenta:</strong> {decodedToken.type}</p>
        <p><strong>ID Interno:</strong> {decodedToken.id}</p>
        
      </div>
    </div>
  );
}

export default Profile;
