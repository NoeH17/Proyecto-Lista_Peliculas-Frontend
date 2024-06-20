import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from '../src/components/Form/Form';
import VentanaPrincipal from '../src/components/ventana_principal/ventana_principal';
import RegistroUsuario from '../src/components/registroUsuario/registroUsuario';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/ventana_principal" element={<VentanaPrincipal />} />
                <Route path="/registroUsuario" element={<RegistroUsuario />} />

            </Routes>
        </Router>
    );
}

export default App;
