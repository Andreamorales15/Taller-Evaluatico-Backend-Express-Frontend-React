import React, { useState, useEffect } from 'react';

function Libro() {
    const [libro, setLibro] = useState([]);
    const [formData, setFormData] = useState({
        titulo: '',
        autor: '',
        anio_public: '',
        stock: ''
    });

    useEffect(() => {
        fetch('http://localhost:2100/apil')
            .then(response => response.json())
            .then(data => setLibro(data));
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

        if (!formData.titulo || !formData.autor || !formData.anio_public || !formData.stock) {
            alert("Complete todos los campos");
            return;
        }
        if (formData.stock <= 0) {
            alert("La cantidad debe ser mayor a 0");
            return;
        }

        const confirmacion = window.confirm("¿Estás seguro de que quieres agregar este libro?");
        if (confirmacion) {
            fetch('http://localhost:2100/apil/ag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    setLibro([...libro, data]);
                    setFormData({
                        titulo: '',
                        autor: '',
                        anio_public: '',
                        stock: ''
                    });
                    alert("Libro agregado correctamente");
                })
                .catch(error => {
                    alert("Error al agregar el libro: " + error);
                });
        }
    };

    return (
        <div>
            <h1>Crear Libro</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titulo:</label>
                    <input
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Autor:</label>
                    <input
                        type="text"
                        name="autor"
                        value={formData.autor}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Año De Publicacion:</label>
                    <input type="date" name="anio_public" className="form-control" value={formData.anio_public} onChange={handleChange} />
                </div>
                <div>
                    <label>Cantidad:</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Agregar Libro</button>
            </form>
        </div>
    );
}

export default Libro;