import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ActualizarUsuario() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");

    useEffect(() => {
        fetch(`http://localhost:2100/apiu/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setNombre(data.nombre);
                setCorreo(data.correo);
                setTelefono(data.telefono);
            })
            .catch((error) => console.error("Error al cargar Usuario:", error));
    }, [id]);

    const actualizarUsuario = async () => {
        if (!nombre.trim() || !correo.trim() || !telefono.trim()) {
            alert("Complete todos los campos");
            return;
        }

        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoValido.test(correo)) {
            alert("Ingrese un correo electrónico válido");
            return;
        }

        try {
            await fetch(`http://localhost:2100/apiu/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, correo, telefono }),
            });

            alert("Usuario actualizado exitosamente");
            navigate("/usuarios"); 
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
    };
    return (
        <div>
            <h2>Actualizar Usuario</h2>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div>
                <label>Correo:</label>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
            </div>
            <div>
                <label>Teléfono:</label>
                <input
                    type="text"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
            </div>
            <button type="button" onClick={actualizarUsuario}>
                Actualizar Usuario
            </button>
            <button type="button" onClick={() => navigate("/usuarios")}>
                Cancelar
            </button>
        </div>
    );
}

export default ActualizarUsuario;