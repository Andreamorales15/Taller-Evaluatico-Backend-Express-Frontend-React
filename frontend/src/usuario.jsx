import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Usuario() {
    const navegar = useNavigate();
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        fetch('http://localhost:2100/apiu')
            .then(response => response.json())
            .then(data => setUsuario(data));
    }, []);

    const EliminarUsuario = (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmacion) {
            fetch(`http://localhost:2100/apiu/${id}`, {
                method: 'DELETE',
            })
                .then(() => {
                    setUsuario(usuario.filter(usuarioid => usuarioid.id !== id));
                    alert("Usuario eliminado correctamente");
                })
                .catch(error => {
                    alert("Error al eliminar el usuario: " + error.message);
                });
        }
    };

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuario.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.correo}</td>
                            <td>{usuario.telefono}</td>
                            <td>
                            <button onClick={() => navegar(`/editu/${usuario.id}`)}>Editar</button> 
                                <button onClick={() => EliminarUsuario(usuario.id)}>Eliminar</button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Usuario;
