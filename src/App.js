import Login from './pages/login/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './pages/home/home';
import CantosChaves from './pages/cantosechaves/cantosechaves';
import DocumentosUteis from './pages/documentosuteis/documentosuteis';
import { Background, Footer } from './styles';
import { ThemeProvider } from 'styled-components';
import Desenvolvimento from './pages/desenvolvimento/desenvolvimento';
import Cursos from './pages/cursos/cursos';
import Consagracoes from './pages/consagracoes/consagracoes';
import Relatorios from './pages/relatorios/relatorios';
import Biblioteca from './pages/biblioteca/biblioteca';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import SearchMedium from './pages/mediuns/SearchMedium/SearchMedium';
import AddMedium from './pages/mediuns/AddMedium/AddMedium';
import YoungMedium from './pages/mediuns/YoungMedium/YoungMedium';
import ShowMedium from './pages/mediuns/ShowMedium/ShowMedium';
import Maintenance from './pages/maintenance/maintenance';
import Adjuntos from './pages/maintenance/adjuntos/adjuntos';
import Ministros from './pages/maintenance/ministros/ministros';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import Guias from './pages/maintenance/guias/guias';
import Cavaleiros from './pages/maintenance/cavaleiros/cavaleiros';
import Templos from './pages/maintenance/templos/templos';
import Falanges from './pages/maintenance/falanges/falanges';
import Users from './pages/maintenance/users/users';
import Backup from './pages/maintenance/backup/backup';

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

  const { login, user } = useContext(UserContext)

  if(!login) {
    return (
      <ThemeProvider theme={theme}>
        <Background>
          <BrowserRouter>
            <Routes>
              <Route path='*' element={<Login />} />
            </Routes>
          </BrowserRouter>
        </Background>
      </ThemeProvider>
    )
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Background>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            {user.level === 'Administrador' ? 
              <>
                <Route path='/manutencao' element={<Maintenance />} />
                <Route path='/manutencao/ministros' element={<Ministros />} />
                <Route path='/manutencao/cavaleiros' element={<Cavaleiros />} />
                <Route path='/manutencao/guias' element={<Guias />} />
                <Route path='/manutencao/adjuntos' element={<Adjuntos />} />
                <Route path='/manutencao/templos' element={<Templos />} />
                <Route path='/manutencao/falanges' element={<Falanges />} />
                <Route path='/manutencao/usuarios' element={<Users />} />
                <Route path='/manutencao/backup' element={<Backup />} />
              </>  
            : ''}
            <Route path='/mediuns/consulta' element={<SearchMedium />} />
            <Route path='/mediuns/consulta/:id' element={<ShowMedium />} />
            <Route path='/mediuns/cadastro' element={<AddMedium />} />
            <Route path='/mediuns/menor' element={<YoungMedium />} />
            <Route path='/cantosechaves' element={<CantosChaves />} />
            <Route path='/desenvolvimento' element={<Desenvolvimento />} />
            <Route path='/cursos' element={<Cursos />} />
            <Route path='/consagracoes' element={<Consagracoes />} />
            <Route path='/relatorios' element={<Relatorios />} /> 
            <Route path='/documentosuteis' element={<DocumentosUteis />} />
            <Route path='/biblioteca' element={<Biblioteca />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Footer>Sistema Uranor - v.0.0.0 - ©2023 Uranor do Amanhecer. Todos os direitos reservados.</Footer>
      </Background>
    </ThemeProvider>
  );
}

export default App;
