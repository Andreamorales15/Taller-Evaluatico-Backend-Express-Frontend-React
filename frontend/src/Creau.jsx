import React, { useState, useEffect } from 'react';

function Usuario() {
    const [usuario, setUsuario] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        telefono: ''
    });

    useEffect(() => {
        fetch('http://localhost:2100/apiu')
            .then(response => response.json())
            .then(data => setUsuario(data));
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

        if (!formData.nombre || !formData.correo || !formData.telefono) {
            alert("Complete todos los campos");
            return;
        }

        const confirmacion = window.confirm("¿Estás seguro de que quieres agregar este usuario?");
        if (confirmacion) {
            fetch('http://localhost:2100/apiu/ag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                setUsuario([...usuario, data]);
                setFormData({
                    nombre: '',
                    correo: '',
                    telefono: ''
                });
                alert("Usuario agregado correctamente");
            })
            .catch(error => {
                alert("Error al agregar el usuario: " + error);
            });
        }
    };

    return (
        <div>
            <div>
                <h1>Crear Usuario</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Correo:</label>
                        <input
                            type="email"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">
                        Agregar Usuario
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Usuario;
