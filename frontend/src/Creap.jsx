import React, { useState, useEffect } from 'react';

function Prestamo() {
    const [prestamo, setPrestamo] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [libros, setLibros] = useState([]);
    const [formData, setFormData] = useState({
        usuario_id: '',
        libro_id: '',
        fecha_prestamo: '',
        fecha_devolucion: '',
        estado: ''
    });

    useEffect(() => {
        fetch('http://localhost:2100/apiu')
            .then(response => response.json())
            .then(data => setUsuarios(data));

        fetch('http://localhost:2100/apil')
            .then(response => response.json())
            .then(data => setLibros(data));

        fetch('http://localhost:2100/apip')
            .then(response => response.json())
            .then(data => setPrestamo(data));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.usuario_id || !formData.libro_id) {
            alert("Debe seleccionar un usuario y un libro");
            return;
        }

        if (!formData.fecha_prestamo || !formData.fecha_devolucion || !formData.estado) {
            alert("Complete todos los campos");
            return;
        }

        if (confirm("¿Estás seguro de que quieres agregar este préstamo?")) {
            fetch('http://localhost:2100/apip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    setPrestamo([...prestamo, data]);
                    setFormData({
                        usuario_id: '',
                        libro_id: '',
                        fecha_prestamo: '',
                        fecha_devolucion: '',
                        estado: ''
                    });
                    alert("Préstamo agregado correctamente");
                })
                .catch(error => {
                    alert("Error al agregar el préstamo: " + error);
                });
        }
    };

    return (
        <div >
            <div >
                <h1 >Crear Préstamo</h1>
                <form onSubmit={handleSubmit}>
                    <div >
                        <label>Usuario:</label>
                        <select
                            name="usuario_id"
                            value={formData.usuario_id}
                            onChange={handleChange}
                           
                        >
                            <option value="" disabled>Seleccione un Usuario</option>
                            {usuarios.map((usuario) => (
                                <option key={usuario.id} value={usuario.id}>
                                    {usuario.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div >
                        <label>Libro:</label>
                        <select
                            name="libro_id"
                            value={formData.libro_id}
                            onChange={handleChange}
                           
                        >
                            <option value="" disabled>Seleccione un Libro</option>
                            {libros.map((libro) => (
                                <option key={libro.id} value={libro.id}>
                                    {libro.titulo}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div >
                        <label>Fecha Préstamo:</label>
                        <input
                            type="date"
                            name="fecha_prestamo"
                            value={formData.fecha_prestamo}
                            onChange={handleChange}
                           
                        />
                    </div>

                    <div >
                        <label>Fecha Devolución:</label>
                        <input
                            type="date"
                            name="fecha_devolucion"
                            value={formData.fecha_devolucion}
                            onChange={handleChange}
                           
                        />
                    </div>

                    <div >
                        <label>Estado:</label>
                        <select
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                           
                        >
                            <option value="" disabled>Seleccione un estado</option>
                            <option value="Prestado">Prestado</option>
                            <option value="Devuelto">Devuelto</option>
                        </select>
                    </div>

                    <button type="submit" >
                        Agregar Préstamo
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Prestamo;
