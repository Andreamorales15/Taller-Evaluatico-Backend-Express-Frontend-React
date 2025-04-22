import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Libro() {
    const navegar = useNavigate();
    const [libro, setLibro] = useState([]);

    useEffect(() => {
        fetch('http://localhost:2100/apil/')
            .then(response => response.json())
            .then(data => setLibro(data));
    }, []);

    const EliminarLibro = (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este libro?");
        if (confirmacion) {
            fetch(`http://localhost:2100/apil/${id}`, {
                method: 'DELETE',
            })
            .then(() => {
                setLibro(libro.filter(libroid => libroid.id !== id));
                alert("Libro eliminado correctamente");
            })
            .catch(error => {
                alert("Error al eliminar el libro: " + error);
            });
        }
    };

    return (
        <div>
            <div>
                <h1>Lista de libros</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Año de publicación</th>
                            <th>Stock</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {libro.map(libro => (
                            <tr key={libro.id}>
                                <td>{libro.id}</td>
                                <td>{libro.titulo}</td>
                                <td>{libro.autor}</td>
                                <td>{libro.anio_public}</td>
                                <td>{libro.stock}</td>
                                <td>
                                    <button onClick={() => navegar(`/editl/${libro.id}`)}>
                                        Editar
                                    </button> 
                                    <button onClick={() => EliminarLibro(libro.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Libro;
