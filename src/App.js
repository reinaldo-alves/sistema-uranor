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
import Adjuntos from './pages/maintenance/adjuntos';
import Ministros from './pages/maintenance/ministros';
import { useContext, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import Guias from './pages/maintenance/guias';
import Cavaleiros from './pages/maintenance/cavaleiros';
import Templos from './pages/maintenance/templos';
import Falanges from './pages/maintenance/falanges';
import Users from './pages/maintenance/users';
import Backup from './pages/maintenance/backup';
import PrivateRoutes from './utilities/PrivateRoutes';
import ChangePassword from './pages/maintenance/changePassword';
import EditMedium from './pages/mediuns/AddAndEditMedium/EditMedium';
import Iniciacao from './pages/consagracoes/iniciacao/iniciacao';
import Elevacao from './pages/consagracoes/elevacao/elevacao';
import Centuria from './pages/consagracoes/centuria/centuria';
import Reclassificacao from './pages/consagracoes/reclassificacao/reclassificacao';
import UpdateIniciacao from './pages/consagracoes/iniciacao/updateIniciacao';
import UpdateElevacao from './pages/consagracoes/elevacao/updateElevacao';
import UpdateCenturia from './pages/consagracoes/centuria/updateCenturia';
import TimeLine from './pages/mediuns/TimeLine/TimeLine';
import LivroDeLeis from './pages/biblioteca/livrodeleis';
import Unificacao from './pages/biblioteca/unificacao';
import ManualDevas from './pages/biblioteca/manualdevas';
import Cartas from './pages/biblioteca/cartas';
import PequenasHistorias from './pages/biblioteca/pequenashistorias';
import InstrucoesPraticas from './pages/biblioteca/instrucoespraticas';
import Calendar from './pages/maintenance/calendar';
import AddAspirante from './pages/desenvolvimento/AddAspirante';
import DesenvDocs from './pages/desenvolvimento/DesenvDocs';
import AddYoungMedium from './pages/mediuns/YoungMedium/AddYoungMedium';
import EditYoungMedium from './pages/mediuns/YoungMedium/EditYoungMedium';
import ShowYoungMedium from './pages/mediuns/YoungMedium/ShowYoungMedium';

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
                  <Route path='/manutencao/calendario' element={<Calendar />} />
                  <Route path='/consagracoes/iniciacao/atualizar' element={<UpdateIniciacao />} />
                  <Route path='/consagracoes/elevacao/atualizar' element={<UpdateElevacao />} />
                  <Route path='/consagracoes/centuria/atualizar' element={<UpdateCenturia />} />
                </>  
              : ''}
              <Route path='/manutencao/usuarios/alterarsenha' element={<ChangePassword />} />
              <Route path='/mediuns/consulta' element={<SearchMedium />} />
              <Route path='/mediuns/consulta/:id' element={<ShowMedium />} />
              <Route path='/mediuns/editar/:id' element={<EditMedium />} />
              <Route path='/mediuns/historico/:id' element={<TimeLine />} />
              <Route path='/mediuns/cadastro' element={<AddMedium />} />
              <Route path='/mediuns/menor' element={<YoungMedium />} />
              <Route path='/mediuns/menor/:id' element={<ShowYoungMedium />} />
              <Route path='/mediuns/menor/editar/:id' element={<EditYoungMedium />} />
              <Route path='/mediuns/menor/cadastro' element={<AddYoungMedium />} />
              <Route path='/cantosechaves' element={<CantosChaves />} />
              <Route path='/desenvolvimento/frequencia' element={<Desenvolvimento />} />
              <Route path='/desenvolvimento/cadastro' element={<AddAspirante />} />
              <Route path='/desenvolvimento/documentos' element={<DesenvDocs />} />
              <Route path='/cursos' element={<Cursos />} />
              <Route path='/consagracoes' element={<Consagracoes />} />
              <Route path='/consagracoes/iniciacao' element={<Iniciacao />} />
              <Route path='/consagracoes/elevacao' element={<Elevacao />} />
              <Route path='/consagracoes/centuria' element={<Centuria />} />
              <Route path='/consagracoes/reclassificacao' element={<Reclassificacao />} />
              <Route path='/relatorios' element={<Relatorios />} /> 
              <Route path='/documentosuteis' element={<DocumentosUteis />} />
              <Route path='/biblioteca' element={<Biblioteca />} />
              <Route path='/biblioteca/livrodeleis' element={<LivroDeLeis />} />
              <Route path='/biblioteca/unificacao' element={<Unificacao />} />
              <Route path='/biblioteca/manualdevas' element={<ManualDevas />} />
              <Route path='/biblioteca/cartas' element={<Cartas />} />
              <Route path='/biblioteca/pequenashistorias' element={<PequenasHistorias />} />
              <Route path='/biblioteca/instrucoespraticas' element={<InstrucoesPraticas />} />
              <Route path='*' element={<PageNotFound />} />
            </Route>
            <Route path='/login' element={!login? <Login /> : <Navigate to='/' />} />
          </Routes>
        </BrowserRouter>
        <Footer>Sistema Uranor - v.1.4.1 - ©2025 Uranor do Amanhecer. Todos os direitos reservados.</Footer>
      </Background>
    </ThemeProvider>
  );
}

export default App;
