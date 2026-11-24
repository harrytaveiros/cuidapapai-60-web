import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Agenda from './pages/Agenda';
import Saude from './pages/Saude';
import Cuidadores from './pages/Cuidadores';
import Perfil from './pages/Perfil';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas fora do MainLayout */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas protegidas do Dashboard dentro do MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/calendar" element={<Agenda />} />
          <Route path="/saude" element={<Saude />} />
          <Route path="/heart" element={<Saude />} />
          <Route path="/cuidadores" element={<Cuidadores />} />
          <Route path="/users" element={<Cuidadores />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        {/* Redirecionamento de segurança para rota raiz */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
