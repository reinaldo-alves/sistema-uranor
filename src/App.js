import Login from './pages/login/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './pages/home/home';
import CantosChaves from './pages/cantosechaves/cantosechaves';
import DocumentosUteis from './pages/documentosuteis/documentosuteis';
import { Background, Footer } from './styles';
import { ThemeProvider } from 'styled-components';
import Mediuns from './pages/mediuns/mediuns';
import Desenvolvimento from './pages/desenvolvimento/desenvolvimento';
import Cursos from './pages/cursos/cursos';
import Consagracoes from './pages/consagracoes/consagracoes';
import Relatorios from './pages/relatorios/relatorios';
import Biblioteca from './pages/biblioteca/biblioteca';

function App() {
  const theme = {
    height: {
      loginContent: 'calc(100vh - 158px)',
      homeContent: 'calc(100vh - 162px)',
      mainContent: 'calc(100vh - 199px)'
    },
    color: {
      lighterColor: '#fff',
      mediumColorTr: 'rgba(153, 187, 255, 0.85)',
      mediumColorOp: 'rgba(153, 187, 255, 1)',
      darkerColor: '#002776'
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Background>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path='/mediuns' element={<Mediuns />} />
            <Route path='/cantosechaves' element={<CantosChaves />} />
            <Route path='/desenvolvimento' element={<Desenvolvimento />} />
            <Route path='/cursos' element={<Cursos />} />
            <Route path='/consagracoes' element={<Consagracoes />} />
            <Route path='/relatorios' element={<Relatorios />} /> 
            <Route path='/documentosuteis' element={<DocumentosUteis />} />
            <Route path='/biblioteca' element={<Biblioteca />} />
          </Routes>
        </BrowserRouter>
        <Footer>Sistema Uranor - v.0.0.0 - ©2023 Uranor do Amanhecer. Todos os direitos reservados.</Footer>
      </Background>
    </ThemeProvider>
  );
}

export default App;
