import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import './styles.css'
import CavEsp from '../../docs/CavaleiroEspecial.pdf'
import ECavEsp from '../../docs/Escrava.pdf'
import NCavEsp from '../../docs/NinfaSol.pdf'
import Gre from '../../docs/Grega.pdf'
import May from '../../docs/Maya.pdf'
import Pri from '../../docs/PrincipeMaya.pdf'
import Jac from '../../docs/Jacana.pdf'
import Ari from '../../docs/Ariana.pdf'
import Mad from '../../docs/Madalena.pdf'
import Fra from '../../docs/Franciscana.pdf'
import Nar from '../../docs/Narayama.pdf'
import Roc from '../../docs/Rochana.pdf'
import Cay from '../../docs/Caycara.pdf'
import Tup from '../../docs/Tupinamba.pdf'
import CAg from '../../docs/CiganaAganara.pdf'
import CTa from '../../docs/CiganaTagana.pdf'
import Agu from '../../docs/AgulhaIsmenia.pdf'
import Nia from '../../docs/Niatra.pdf'
import Apo from '../../docs/Aponara.pdf'
import Nit from '../../docs/Nityama.pdf'
import NitC from '../../docs/NityamaChama.pdf'
import NitT from '../../docs/NityamaTurigano.pdf'
import Sam from '../../docs/Samaritana.pdf'
import SamT from '../../docs/SamaritanaTurigano.pdf'
import Mag from '../../docs/Mago.pdf'
import MagOn from '../../docs/MagoAcender.pdf'
import MagOff from '../../docs/MagoApagar.pdf'
import YurS from '../../docs/YuricySol.pdf'
import YurL from '../../docs/YuricyLua.pdf'
import Yur1 from '../../docs/YuricySol1Canto.pdf'
import YurT from '../../docs/YuricyTurigano.pdf'
import Dha from '../../docs/DharmoOxinto.pdf'
import DhaL from '../../docs/DharmoOxintoLeito.pdf'
import Mur from '../../docs/Muruaicy.pdf'
import MurP from '../../docs/MuruaicyPortoes.pdf'

function CantosChaves() {
    
    const navigate = useNavigate();
    const [nitActive, setNitActive] = useState(false)
    const nitClick = () => setNitActive(!nitActive)
    const [samActive, setSamActive] = useState(false)
    const samClick = () => setSamActive(!samActive)
    const [magActive, setMagActive] = useState(false)
    const magClick = () => setMagActive(!magActive)
    const [yurActive, setYurActive] = useState(false)
    const yurClick = () => setYurActive(!yurActive)
    const [dhaActive, setDhaActive] = useState(false)
    const dhaClick = () => setDhaActive(!dhaActive)
    const [murActive, setMurActive] = useState(false)
    const murClick = () => setMurActive(!murActive)

    return (
        <div className='main-fixed'>
            <Header />
            <header className='sec-header-container'>
                <nav>
                    <ul className='secondary-header'>
                        <li className='secondary-list' onClick={() => navigate('/')}>Página Inicial</li>
                    </ul>
                </nav>
            </header>
            <div className='global-container'>
                <h1 className='section-title'>Cantos da Individualidade</h1>
                <div className='cards-canto-container'>
                    <a href={CavEsp} target='_blank' rel='noreferrer'>
                        <div className='card-canto' id='card-ind'>
                            Canto do Cavaleiro Especial
                            <span className='subtitle'>(Doutrinador e Ajanã)</span>
                        </div>
                    </a>
                    <a href={ECavEsp} target='_blank' rel='noreferrer'>
                        <div className='card-canto' id='card-ind'>
                            Canto da Escrava do Cavaleiro Especial
                            <span className='subtitle'>(Ninfa Lua)</span>
                        </div>
                    </a>
                    <a href={NCavEsp} target='_blank' rel='noreferrer'>
                        <div className='card-canto' id='card-ind'>
                            Canto da Ninfa do Cavaleiro Especial
                            <span className='subtitle'>(Ninfa Sol)</span>
                        </div>
                    </a>
                </div>
                <h1 className='section-title'>Cantos das Falanges Missionárias</h1>
                <div className='cards-canto-container' id='fourcolums'>                    
                    <div className={`card-menu-container ${nitActive ? 'active' : 'inactive'}`}>
                        <nav className={`dropdown ${nitActive ? 'active' : 'inactive'}`}>
                            <ul>
                                <li className='menu-item'>
                                    <a href={Nit} target='_blank' rel='noreferrer'>Canto da Nityama</a>
                                </li>
                                <li className='menu-item'>
                                    <a href={NitC} target='_blank' rel='noreferrer'>Canto para Chama da Vida</a>
                                </li>
                                <li className='menu-item'>
                                    <a href={NitT} target='_blank' rel='noreferrer'>Canto do Turigano</a>
                                </li>
                            </ul>
                        </nav>
                        <div className='card-canto card-menu' onClick={nitClick}>Nityama</div>
                    </div>
                    <div className={`card-menu-container ${samActive ? 'active' : 'inactive'}`}>
                        <nav className={`dropdown ${samActive ? 'active' : 'inactive'}`}>
                            <ul>
                                <li className='menu-item'>
                                    <a href={Sam} target='_blank' rel='noreferrer'>Canto da Samaritana</a>
                                </li>
                                <li className='menu-item'>
                                    <a href={SamT} target='_blank' rel='noreferrer'>Canto do Turigano</a>
                                </li>
                            </ul>
                        </nav>
                        <div className='card-canto card-menu' onClick={samClick}>Samaritana</div>
                    </div>
                    <a href={Gre} target='_blank' rel='noreferrer'>
                        <div className='card-canto'>Grega</div>
                    </a>
                    <a href={May} target='_blank' rel='noreferrer'>
                        <div className='card-canto'>Maya</div>
                    </a>
                    <div className={`card-menu-container ${magActive ? 'active' : 'inactive'}`}>
                        <nav className={`dropdown ${magActive ? 'active' : 'inactive'}`}>
                            <ul>
                                <li className='menu-item'>
                                    <a href={Mag} target='_blank' rel='noreferrer'>Canto do Mago</a>
                                </li>
                                <li className='menu-item'>
                                    <a href={MagOn} target='_blank' rel='noreferrer'>Canto para Acender a Chama</a>
                                </li>
                                <li className='menu-item'>
                                    <a href={MagOff} target='_blank' rel='noreferrer'>Canto para Apagar a Chama</a>
                                </li>
                            </ul>
                        </nav>
                        <div className='card-canto card-menu' onClick={magClick}>Mago</div>
                    </div>                    
                    <a href={Pri} target='_blank' rel='noreferrer'>
                        <div className='card-canto'>Príncipe Maya</div>
                    </a>
                    <div className={`card-menu-container ${yurActive ? 'active' : 'inactive'}`}>
                        <nav className={`dropdown ${yurActive ? 'active' : 'inactive'}`}>
                            <ul>
                                <li className='menu-item'>
                                    <a href={YurS} target='_blank' rel='noreferrer'>Canto da Yuricy Sol</a>
                                </li>
                                <li className='menu-item'>
                                    <a href={YurL} target='_blank' rel='noreferrer'>Canto da Yuricy Lua</a>
                                </li>
                                <li className='menu-item'>
                                    <a href={Yur1} target='_blank' rel='noreferrer'>Canto do Aramê</a>
                                </li>
                                <li className='menu-item'>
                                    <a href={YurT} target='_blank' rel='noreferrer'>Canto do Turigano</a>
                                </li>
                            </ul>
                        </nav>
                        <div className='card-canto card-menu' onClick={yurClick}>Yuricy</div>
                    </div>
                    <div className={`card-menu-container ${dhaActive ? 'active' : 'inactive'}`}>
                        <nav className={`dropdown ${dhaActive ? 'active' : 'inactive'}`}>
                            <ul>
                                <li className='menu-item'>
                                    <a href={Dha} target='_blank' rel='noreferrer'>Canto da Dharmo-Oxinto</a>
                                </li>
                                <li className='menu-item'>
                                    <a href={DhaL} target='_blank' rel='noreferrer'>Canto do Leito/Turigano</a>
                                </li>
                            </ul>
                        </nav>
                        <div className='card-canto card-menu' onClick={dhaClick}>Dharmo-Oxinto</div>
                    </div>
                    <div className={`card-menu-container ${murActive ? 'active' : 'inactive'}`}>
                        <nav className={`dropdown ${murActive ? 'active' : 'inactive'}`}>
                            <ul>
                                <li className='menu-item'>
                                    <a href={Mur} target='_blank' rel='noreferrer'>Canto da Muruaicy</a>
                                </li>
                                <li className='menu-item'>
                                    <a href={MurP} target='_blank' rel='noreferrer'>Chave de Abertura dos Portões</a>
                                </li>
                            </ul>
                        </nav>
                        <div className='card-canto card-menu' onClick={murClick}>Muruaicy</div>
                    </div>
                    <a href={Jac} target='_blank' rel='noreferrer'>
                        <div className='card-canto'>Jaçanã</div>
                    </a>
                    <a href={Ari} target='_blank' rel='noreferrer'>
                        <div className='card-canto'>Ariana</div>
                    </a>
                    <a href={Mad} target='_blank' rel='noreferrer'>
                        <div className='card-canto'>Madalena</div>
                    </a>
                    <a href={Fra} target='_blank' rel='noreferrer'>
                        <div className='card-canto'>Franciscana</div>
                    </a>
                    <a href={Nar} target='_blank' rel='noreferrer'>
                        <div className='card-canto'>Narayama</div>
                    </a>
                    <a href={Roc} target='_blank' rel='noreferrer'>
                        <div className='card-canto'>Rochana</div>
                    </a>
                    <a href={Cay} target='_blank' rel='noreferrer'>
                        <div className='card-canto'>Cayçara</div>
                    </a>
                    <a href={Tup} target='_blank' rel='noreferrer'>
                        <div className='card-canto'>Tupinambá</div>
                    </a>
                    <a href={CAg} target='_blank' rel='noreferrer'>
                        <div className='card-canto'>Cigana Aganara</div>
                    </a>
                    <a href={CTa} target='_blank' rel='noreferrer'>
                        <div className='card-canto'>Cigana Tagana</div>
                    </a>
                    <a href={Agu} target='_blank' rel='noreferrer'>
                        <div className='card-canto'>Agulha Ismênia</div>
                    </a>
                    <a href={Nia} target='_blank' rel='noreferrer'>
                        <div className='card-canto'>Niatra</div>
                    </a>
                    <a href={Apo} target='_blank' rel='noreferrer'>
                        <div className='card-canto'>Aponara</div>
                    </a>
                </div>
                <h1 className='section-title'>Chaves dos Trabalhos</h1>
                <div className='cards-canto-container' id='fourcolums'>
                    <div className='card-canto' id='card-chave'>Abatá</div>
                    <div className='card-canto' id='card-chave'>Abertura e Encerramento</div>
                    <div className='card-canto' id='card-chave'>Alabá</div>
                    <div className='card-canto' id='card-chave'>Aramê</div>
                    <div className='card-canto' id='card-chave'>Cura</div>
                    <div className='card-canto' id='card-chave'>Defumação</div>
                    <div className='card-canto' id='card-chave'>Indução</div>
                    <div className='card-canto' id='card-chave'>Junção</div>
                    <div className='card-canto' id='card-chave'>Leito Magnético</div>
                    <div className='card-canto' id='card-chave'>Oráculo</div>
                    <div className='card-canto' id='card-chave'>Randy</div>
                    <div className='card-canto' id='card-chave'>Sudálio</div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CantosChaves