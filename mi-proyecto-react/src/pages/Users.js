import React, { useEffect, useState, useCallback } from 'react';
import useToken from '../useToken'; // Ruta corregida para entrar en la carpeta src

function Users() {
  const [usuarios, setUsuarios] = useState([]);
  const { token, user } = useToken();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    type: 'teacher'
  });

  // 1. CARGAR LISTA
  const cargarUsuarios = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await response.json();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar investigadores");
    }
  }, [token]);

  // 2. AÑADIR (ALTA)
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("✅ Investigador añadido con éxito");
        setFormData({ email: '', password: '', type: 'teacher' });
        cargarUsuarios();
      } else {
        alert("❌ Error al añadir. Revisa los datos.");
      }
    } catch (err) {
      alert("Error de conexión con el servidor");
    }
  };

  // 3. BORRAR (BAJA) - Función nueva
  const handleDeleteUser = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar a este investigador del archivo?")) {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.ok) {
          alert("🗑️ Investigador eliminado");
          cargarUsuarios(); // Recargamos la lista automáticamente
        } else {
          alert("❌ No se pudo eliminar el usuario.");
        }
      } catch (err) {
        alert("Error al conectar con el servidor para borrar.");
      }
    }
  };

  useEffect(() => {
    if (user?.type === 'admin') cargarUsuarios();
  }, [cargarUsuarios, user]);

  if (user?.type !== 'admin') return <div className="container">Acceso denegado. Solo Directores.</div>;

  return (
    <div className="container">
      <h1>🗄️ Gestión de Investigadores</h1>

      {/* FORMULARIO PARA AÑADIR */}
      <section className="form-alta">
        <h3>Dar de Alta Nuevo Investigador</h3>
        <form onSubmit={handleAddUser}>
          <input 
            type="email" 
            placeholder="Email del investigador" 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            required 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={formData.password} 
            onChange={e => setFormData({...formData, password: e.target.value})} 
            required 
          />
          <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
            <option value="teacher">Historiador (Teacher)</option>
            <option value="admin">Director (Admin)</option>
          </select>
          <button type="submit">Añadir</button>
        </form>
      </section>

      {/* TABLA CON BOTÓN DE BORRAR */}
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Rango</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.type}</td>
              <td>
                {/* Botón para borrar, no permitimos que el admin se borre a sí mismo por error */}
                {u.email !== user.username && (
                  <button 
                    onClick={() => handleDeleteUser(u.id)} 
                    className="btn-delete"
                    style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    🗑️ Borrar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;