import './App.css';
import Login from './pages/login/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './pages/home/home';
import CantosChaves from './pages/cantosechaves/cantosechaves';
import DocumentosUteis from './pages/documentosuteis/documentosuteis';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/cantosechaves' element={<CantosChaves />} /> 
        <Route path='/documentosuteis' element={<DocumentosUteis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
