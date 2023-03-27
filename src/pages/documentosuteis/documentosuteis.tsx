import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import './styles.css'

function DocumentosUteis() {
    
    const navigate = useNavigate();
    
    return (
        <>
            <Header />
            <header className='sec-header-container'>
                <nav>
                    <ul className='secondary-header'>
                        <li className='secondary-list' onClick={() => navigate('/')}>Página Inicial</li>
                    </ul>
                </nav>
            </header>
            <div className='global-container-docs'>
                <h1 className='section-title'>Documentos Úteis</h1>
                <div className='cards-docs-container'>
                    <div className='card-docs'>Chamada Oficial das Falanges Missionárias</div>
                    <div className='card-docs'>Prefixos das Falanges Missionárias</div>
                    <div className='card-docs'>Relação de Turnos de Trabalho</div>
                    <div className='card-docs'>Calendário de Atividades Doutrinárias</div>
                    <div className='card-docs'>Escala dos Devas</div>
                </div>
            </div>
        </>
    )
}

export default DocumentosUteis