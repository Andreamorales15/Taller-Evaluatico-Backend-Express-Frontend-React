import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Prestamo() {
    const [usuarios, setUsuarios] = useState([]);
    const [libros, setLibros] = useState([]);
    const navegar = useNavigate();
    const [prestamo, setPrestamo] = useState([]);

    useEffect(() => {
        fetch('http://localhost:2100/apip')
            .then(response => response.json())
            .then(data => setPrestamo(data));

        fetch('http://localhost:2100/apiu')
            .then(response => response.json())
            .then(data => setUsuarios(data));

        fetch('http://localhost:2100/apil')
            .then(response => response.json())
            .then(data => setLibros(data));
    }, []);

    const EliminarPrestamo = (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este préstamo?");
        if (confirmDelete) {
            fetch(`http://localhost:2100/apip/${id}`, {
                method: 'DELETE',
            })
                .then(() => {
                    setPrestamo(prestamo.filter(prestamoid => prestamoid.id !== id));
                    alert("Préstamo eliminado correctamente");
                })
                .catch(error => {
                    alert("Error al eliminar el préstamo: " + error);
                });
        }
    };

    return (
        <div >
            <div >
                <h1 >Lista de préstamos</h1>
                <table >
                    <thead>
                        <tr>
                            <th >ID</th>
                            <th >Usuario</th>
                            <th >Libro</th>
                            <th >Fecha Préstamo</th>
                            <th >Fecha Devolución</th>
                            <th >Estado</th>
                            <th >Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            prestamo.map(prestamo => {
                                const usuario = usuarios.find(usuarios => usuarios.id === prestamo.usuario_id);
                                const libro = libros.find(libros => libros.id === prestamo.libro_id);
                                return (
                                    <tr key={prestamo.id}>
                                        <td >{prestamo.id}</td>
                                        <td >{usuario ? usuario.nombre : "Desconocido"}</td>
                                        <td >{libro ? libro.titulo : "Desconocido"}</td>
                                        <td >{prestamo.fecha_prestamo}</td>
                                        <td >{prestamo.fecha_devolucion}</td>
                                        <td >{prestamo.estado}</td>
                                        <td >
                                             <button
                                                
                                                onClick={() => navegar(`/editp/${prestamo.id}`)}>
                                                Editar
                                            </button> 
                                            <button
                                                onClick={() => EliminarPrestamo(prestamo.id)}>
                                                Eliminar
                                            </button> 
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Prestamo;
