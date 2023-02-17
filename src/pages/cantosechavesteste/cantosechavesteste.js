import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import './styles.css'
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

function CantosChavesTeste() {
    
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
            <div className='global-containera'>
                <h1 className='section-title'>Cantos das Falanges Missionárias</h1>
                <div className='cards-canto-containera'>             
                    <div className={`card-menu-containera ${nitActive ? 'active' : 'inactive'}`}>
                        <div className='card-cantoa card-menua' onClick={nitClick}>Nityama</div>
                        <div className={`dropdown-containera ${nitActive ? 'active' : 'inactive'}`}>
                            <nav className={`dropdowna ${nitActive ? 'active' : 'inactive'}`}>
                                <ul>
                                    <li className='menu-itema'>
                                        <a href={Nit} target='_blank' rel='noreferrer'>Canto da Nityama</a>
                                    </li>
                                    <li className='menu-itema'>
                                        <a href={NitC} target='_blank' rel='noreferrer'>Canto para Chama da Vida</a>
                                    </li>
                                    <li className='menu-itema'>
                                        <a href={NitT} target='_blank' rel='noreferrer'>Canto do Turigano</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className={`card-menu-containera ${samActive ? 'active' : 'inactive'}`}>
                        <div className='card-cantoa card-menua' onClick={samClick}>Samaritana</div>
                        <div className={`dropdown-containera ${samActive ? 'active' : 'inactive'}`}>
                            <nav className={`dropdowna ${samActive ? 'active' : 'inactive'}`}>
                                <ul>
                                    <li className='menu-itema'>
                                        <a href={Sam} target='_blank' rel='noreferrer'>Canto da Samaritana</a>
                                    </li>
                                    <li className='menu-itema'>
                                        <a href={SamT} target='_blank' rel='noreferrer'>Canto do Turigano</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <a href={Gre} target='_blank' rel='noreferrer'>
                        <div className='card-cantoa'>Grega</div>
                    </a>
                    <a href={May} target='_blank' rel='noreferrer'>
                        <div className='card-cantoa'>Maya</div>
                    </a>
                    <div className={`card-menu-containera ${magActive ? 'active' : 'inactive'}`}>
                        <div className='card-cantoa card-menua' onClick={magClick}>Mago</div>
                        <div className={`dropdown-containera ${magActive ? 'active' : 'inactive'}`}>
                            <nav className={`dropdowna ${magActive ? 'active' : 'inactive'}`}>
                                <ul>
                                    <li className='menu-itema'>
                                        <a href={Mag} target='_blank' rel='noreferrer'>Canto do Mago</a>
                                    </li>
                                    <li className='menu-itema'>
                                        <a href={MagOn} target='_blank' rel='noreferrer'>Canto para Acender a Chama</a>
                                    </li>
                                    <li className='menu-itema'>
                                        <a href={MagOff} target='_blank' rel='noreferrer'>Canto para Apagar a Chama</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>                    
                    <a href={Pri} target='_blank' rel='noreferrer'>
                        <div className='card-cantoa'>Príncipe Maya</div>
                    </a>
                    <div className={`card-menu-containera ${yurActive ? 'active' : 'inactive'}`}>
                        <div className='card-cantoa card-menua' onClick={yurClick}>Yuricy</div>
                        <div className={`dropdown-containera ${yurActive ? 'active' : 'inactive'}`}>
                            <nav className={`dropdowna ${yurActive ? 'active' : 'inactive'}`}>
                                <ul>
                                    <li className='menu-itema'>
                                        <a href={YurS} target='_blank' rel='noreferrer'>Canto da Yuricy Sol</a>
                                    </li>
                                    <li className='menu-itema'>
                                        <a href={YurL} target='_blank' rel='noreferrer'>Canto da Yuricy Lua</a>
                                    </li>
                                    <li className='menu-itema'>
                                        <a href={Yur1} target='_blank' rel='noreferrer'>Canto do Aramê</a>
                                    </li>
                                    <li className='menu-itema'>
                                        <a href={YurT} target='_blank' rel='noreferrer'>Canto do Turigano</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className={`card-menu-containera ${dhaActive ? 'active' : 'inactive'}`}>
                        <div className='card-cantoa card-menua' onClick={dhaClick}>Dharmo-Oxinto</div>
                        <div className={`dropdown-containera ${dhaActive ? 'active' : 'inactive'}`}>
                            <nav className={`dropdowna ${dhaActive ? 'active' : 'inactive'}`}>
                                <ul>
                                    <li className='menu-itema'>
                                        <a href={Dha} target='_blank' rel='noreferrer'>Canto da Dharmo-Oxinto</a>
                                    </li>
                                    <li className='menu-itema'>
                                        <a href={DhaL} target='_blank' rel='noreferrer'>Canto do Leito/Turigano</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className={`card-menu-containera ${murActive ? 'active' : 'inactive'}`}>
                        <div className='card-cantoa card-menua' onClick={murClick}>Muruaicy</div>
                        <div className={`dropdown-containera ${murActive ? 'active' : 'inactive'}`}>
                            <nav className={`dropdowna ${murActive ? 'active' : 'inactive'}`}>
                                <ul>
                                    <li className='menu-itema'>
                                        <a href={Mur} target='_blank' rel='noreferrer'>Canto da Muruaicy</a>
                                    </li>
                                    <li className='menu-itema'>
                                        <a href={MurP} target='_blank' rel='noreferrer'>Chave de Abertura dos Portões</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <a href={Jac} target='_blank' rel='noreferrer'>
                        <div className='card-cantoa'>Jaçanã</div>
                    </a>
                    <a href={Ari} target='_blank' rel='noreferrer'>
                        <div className='card-cantoa'>Ariana</div>
                    </a>
                    <a href={Mad} target='_blank' rel='noreferrer'>
                        <div className='card-cantoa'>Madalena</div>
                    </a>
                    <a href={Fra} target='_blank' rel='noreferrer'>
                        <div className='card-cantoa'>Franciscana</div>
                    </a>
                    <a href={Nar} target='_blank' rel='noreferrer'>
                        <div className='card-cantoa'>Narayama</div>
                    </a>
                    <a href={Roc} target='_blank' rel='noreferrer'>
                        <div className='card-cantoa'>Rochana</div>
                    </a>
                    <a href={Cay} target='_blank' rel='noreferrer'>
                        <div className='card-cantoa'>Cayçara</div>
                    </a>
                    <a href={Tup} target='_blank' rel='noreferrer'>
                        <div className='card-cantoa'>Tupinambá</div>
                    </a>
                    <a href={CAg} target='_blank' rel='noreferrer'>
                        <div className='card-cantoa'>Cigana Aganara</div>
                    </a>
                    <a href={CTa} target='_blank' rel='noreferrer'>
                        <div className='card-cantoa'>Cigana Tagana</div>
                    </a>
                    <a href={Agu} target='_blank' rel='noreferrer'>
                        <div className='card-cantoa'>Agulha Ismênia</div>
                    </a>
                    <a href={Nia} target='_blank' rel='noreferrer'>
                        <div className='card-cantoa'>Niatra</div>
                    </a>
                    <a href={Apo} target='_blank' rel='noreferrer'>
                        <div className='card-cantoa'>Aponara</div>
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CantosChavesTeste