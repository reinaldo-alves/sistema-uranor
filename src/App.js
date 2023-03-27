import Login from './pages/login/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './pages/home/home';
import CantosChaves from './pages/cantosechaves/cantosechaves';
import DocumentosUteis from './pages/documentosuteis/documentosuteis';
import { Background, Footer } from './styles';
import { ThemeProvider } from 'styled-components';

function App() {
  const theme = {
    height: {
      loginContent: 'calc(100vh - 158px)',
      mainContent: 'calc(100vh - 162px)'
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
            <Route path='/cantosechaves' element={<CantosChaves />} /> 
            <Route path='/documentosuteis' element={<DocumentosUteis />} />
          </Routes>
        </BrowserRouter>
        <Footer>Sistema Uranor - v.0.0.0 - ©2023 Uranor do Amanhecer. Todos os direitos reservados.</Footer>
      </Background>
    </ThemeProvider>
  );
}

export default App;
