import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Usuario from './usuario';
import Libro from './libros';
import Prestamo from './prestamos';
import EditU from './Editu';
import EditP from './Editp';
import EditL from './Editl';
import CreaL from './Creal';
import CreaU from './Creau';
import CreaP from './Creap';
import Inicio from './inicio';
import '../src/App.css'; 
function App() {
  return (
    <Router>
       <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path="/usuarios" element={<Usuario />} />
          <Route path="/libros" element={<Libro />} />
          <Route path="/prestamo" element={<Prestamo />} />
          <Route path="/editu/:id" element={<EditU />} />
          <Route path="/editp/:id" element={<EditP />} />
          <Route path="/editl/:id" element={<EditL />} />
          <Route path="/creal" element={<CreaL />} />
          <Route path="/creau" element={<CreaU />} />
          <Route path="/creap" element={<CreaP />} />
        </Routes>
    </Router>
  );
}

export default App;