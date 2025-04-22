import Usuario from './usuario';
import Libro from './libros';
import Prestamo from './prestamos';
function Inicio(){
    return(
        <div>
            <h1>Inicio</h1>
            <p>Bienvenido a la página de inicio.</p>
            <Usuario />
            <Libro />
            <Prestamo />
            
        </div>
    )
}
export default Inicio;