import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import './styles.css'

function Home() {
    
    const navigate = useNavigate();

    return (
        <div className='main'>
            <Header />
            <div className='options-container'>
                <div className='cards-container'>
                    <div className='card-options' id='mediuns'>Médiuns</div>
                    <div className='card-options' id='cantosechaves' onClick={() => navigate('cantosechaves')}>Cantos e Chaves</div>
                    <div className='card-options' id='desenvolvimento'>Desenvolvimento</div>
                    <div className='card-options' id='cursos'>Cursos</div>
                    <div className='card-options' id='consagracoes'>Consagrações</div>
                    <div className='card-options' id='relatorios'>Relatórios</div>
                    <div className='card-options' id='documentosuteis' onClick={() => navigate('documentosuteis')}>Documentos Úteis</div>
                    <div className='card-options' id='biblioteca' onClick={() => navigate('biblioteca')}>Biblioteca</div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home