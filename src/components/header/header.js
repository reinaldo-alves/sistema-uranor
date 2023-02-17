import React from "react";
import './styles.css'
import logo from '../../assets/jaguar.jpg'

function Header() {
    const user = 'Reinaldo Alves'
    const level = 'Administrador'
    return (
        <header className='header-container'>
            <div className='info-container'>
                <img className='logoHeader' src={logo} alt=''/>
                <div className='textContainer'>
                    <p>URANOR DO AMANHECER</p>
                    <p>CASTELO DOS DEVAS</p>
                </div>
            </div>
            <div className='user-info'>
                <p className='user-and-level'>Usuário: {user}</p>
                <p className='user-and-level'>Nível: {level}</p>
                <div className='button-header-container'>
                    <button className='button-header'>{level === 'Administrador' ? 'Manutenção' : 'Alterar Senha'}</button>
                    <button className='button-header'>Sair</button>
                </div>
            </div>
        </header>
    )
}

export default Header