import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ActualizarLibro() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [anio_public, setAnioPublicidad] = useState("");
    const [stock, setStock] = useState("");

    useEffect(() => {
        fetch(`http://localhost:2100/apil/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setTitulo(data.titulo);
                setAutor(data.autor);
                const fechaModificada = new Date(data.anio_public).toISOString().split('T')[0];
                setAnioPublicidad(fechaModificada);
                setStock(data.stock);
            })
            .catch((error) => console.error("Error al cargar Libro:", error));
    }, [id]);

    const actualizarLibro = async () => {
        try {
            await fetch(`http://localhost:2100/apil/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ titulo, autor, anio_public, stock }),
            });

            alert("Libro actualizado exitosamente");
            navigate("/libros"); 
        } catch (error) {
            console.error("Error al actualizar el libro:", error);
        }
    };

    return (
        <div>
            <h2>Actualizar Libro</h2>
            <div>
                <label>Titulo:</label>
                <input
                    type="text"
                    placeholder="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
            </div>
            <div>
                <label>Autor:</label>
                <input
                    type="text"
                    placeholder="autor"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                />
            </div>
            <div>
                <label>Fecha Publicacion:</label>
                <input
                    type="date"
                    placeholder="fecha"
                    value={anio_public}
                    onChange={(e) => setAnioPublicidad(e.target.value)}
                />
            </div>
            <div>
                <label>Stock:</label>
                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
            </div>
            <button type="button" onClick={actualizarLibro}>
                Actualizar Libro
            </button>
            <button type="button" onClick={() => navigate("/libros")}>
                Cancelar
            </button>
        </div>
    );
}

export default ActualizarLibro;