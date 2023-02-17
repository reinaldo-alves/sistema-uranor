import './App.css';
import Login from './pages/login/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './pages/home/home';
import CantosChaves from './pages/cantosechaves/cantosechaves';
import DocumentosUteis from './pages/documentosuteis/documentosuteis';
import CantosChavesTeste from './pages/cantosechavesteste/cantosechavesteste';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/cantosechaves' element={<CantosChaves />} /> 
        <Route path='/documentosuteis' element={<DocumentosUteis />} />
        <Route path='/biblioteca' element={<CantosChavesTeste />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
