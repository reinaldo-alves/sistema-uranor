import { useEffect } from 'react';
import Login from './pages/login/login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
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
import AddMedium from './pages/mediuns/AddAndEditMedium/AddMedium';
import YoungMedium from './pages/mediuns/YoungMedium/YoungMedium';
import ShowMedium from './pages/mediuns/ShowMedium/ShowMedium';
import Maintenance from './pages/maintenance/maintenance';
import Adjuntos from './pages/maintenance/adjuntos/adjuntos';
import Ministros from './pages/maintenance/ministros/ministros';
import { useContext, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import Guias from './pages/maintenance/guias/guias';
import Cavaleiros from './pages/maintenance/cavaleiros/cavaleiros';
import Templos from './pages/maintenance/templos/templos';
import Falanges from './pages/maintenance/falanges/falanges';
import Users from './pages/maintenance/users/users';
import Backup from './pages/maintenance/backup/backup';
import PrivateRoutes from './utilities/PrivateRoutes';
import ChangePassword from './pages/maintenance/changePassword/changePassword';
import EditMedium from './pages/mediuns/AddAndEditMedium/EditMedium';
import Iniciacao from './pages/consagracoes/iniciacao/iniciacao';
import Elevacao from './pages/consagracoes/elevacao/elevacao';
import Centuria from './pages/consagracoes/centuria/centuria';
import Reclassificacao from './pages/consagracoes/reclassificacao/reclassificacao';
import UpdateIniciacao from './pages/consagracoes/iniciacao/updateIniciacao';
import UpdateElevacao from './pages/consagracoes/elevacao/updateElevacao';

function App() {
  const [mainContainer, setMainContainer] = useState('199')
  
  const handleResize = () => {
    if (window.innerWidth > 825) {
      setMainContainer('199');
    } else if (window.innerWidth > 720) {
      setMainContainer('194');
    } else {
      setMainContainer('138');
    }
  };

  useEffect(() => {
    handleResize();
    const handleResizeEvent = () => {
      handleResize();
    };
    window.addEventListener('resize', handleResizeEvent);
    return () => {
      window.removeEventListener('resize', handleResizeEvent);
    };
  }, []);
  
  const theme = {
    height: {
      loginContent: 'calc(100vh - 158px)',
      homeContent: 'calc(100vh - 162px)',
      mainContent: `calc(100vh - ${mainContainer}px)`
    },
    color: {
      lighterColor: '#fff',
      mediumColorTr: 'rgba(153, 187, 255, 0.85)',
      mediumColorOp: 'rgba(153, 187, 255, 1)',
      darkerColor: '#002776'
    }
  }

  const { user, login } = useContext(UserContext)
  
  return (
    <ThemeProvider theme={theme}>
      <Background>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
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
              <Route path='/manutencao/usuarios/alterarsenha' element={<ChangePassword />} />
              <Route path='/mediuns/consulta' element={<SearchMedium />} />
              <Route path='/mediuns/consulta/:id' element={<ShowMedium />} />
              <Route path='/mediuns/editar/:id' element={<EditMedium />} />
              <Route path='/mediuns/cadastro' element={<AddMedium />} />
              <Route path='/mediuns/menor' element={<YoungMedium />} />
              <Route path='/cantosechaves' element={<CantosChaves />} />
              <Route path='/desenvolvimento' element={<Desenvolvimento />} />
              <Route path='/cursos' element={<Cursos />} />
              <Route path='/consagracoes' element={<Consagracoes />} />
              <Route path='/consagracoes/iniciacao' element={<Iniciacao />} />
              <Route path='/consagracoes/iniciacao/atualizar' element={<UpdateIniciacao />} />
              <Route path='/consagracoes/elevacao' element={<Elevacao />} />
              <Route path='/consagracoes/elevacao/atualizar' element={<UpdateElevacao />} />
              <Route path='/consagracoes/centuria' element={<Centuria />} />
              <Route path='/consagracoes/reclassificacao' element={<Reclassificacao />} />
              <Route path='/relatorios' element={<Relatorios />} /> 
              <Route path='/documentosuteis' element={<DocumentosUteis />} />
              <Route path='/biblioteca' element={<Biblioteca />} />
              <Route path='*' element={<PageNotFound />} />
            </Route>
            <Route path='/login' element={!login? <Login /> : <Navigate to='/' />} />
          </Routes>
        </BrowserRouter>
        <Footer>Sistema Uranor - v.1.1.0 - ©2023 Uranor do Amanhecer. Todos os direitos reservados.</Footer>
      </Background>
    </ThemeProvider>
  );
}

export default App;

//Melhorar sistema de redirecionar para tela de login quanto o token vencer.
