import React, { useState, useEffect, useCallback } from 'react';
import useToken from '../useToken';

function Students() {
  const [students, setStudents] = useState([]);
  const { token, user } = useToken();
  const [newFigure, setNewFigure] = useState({ name: '', last_name: '', dni: '' });

  const fetchStudents = useCallback(async () => {
    if (!user?.id) return;
    // Corregimos la ruta: admin ve todo, teacher solo lo suyo
    const url = user.type === 'admin' 
      ? `http://localhost:3000/api/students`
      : `http://localhost:3000/api/teachers/${user.id}/students`;

    const res = await fetch(url, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    setStudents(Array.isArray(data) ? data : []);
  }, [user, token]);

  const handleAdd = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ ...newFigure, teacher_id: user.id })
    });
    setNewFigure({ name: '', last_name: '', dni: '' });
    fetchStudents();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar del archivo?")) return;
    await fetch(`http://localhost:3000/api/students/${id}`, {
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}` }
    });
    fetchStudents();
  };

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  return (
    <div className="container">
      <h1>📚 Archivo Histórico</h1>
      <form onSubmit={handleAdd} className="form-alta">
        <input placeholder="Nombre" value={newFigure.name} onChange={e => setNewFigure({...newFigure, name: e.target.value})} required />
        <input placeholder="Contexto" value={newFigure.last_name} onChange={e => setNewFigure({...newFigure, last_name: e.target.value})} required />
        <input placeholder="Ref. Interna (DNI)" value={newFigure.dni} onChange={e => setNewFigure({...newFigure, dni: e.target.value})} required />
        <button type="submit">Añadir Figura</button>
      </form>
      <table>
        <thead>
          <tr><th>Figura</th><th>Contexto</th><th>Ref.</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td><td>{s.last_name}</td><td>{s.dni || s.id_card}</td>
              <td><button onClick={() => handleDelete(s.id)} className="btn-delete">✖</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;