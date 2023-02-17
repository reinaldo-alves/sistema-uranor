import React from 'react'
import Footer from '../../components/footer/footer'
import './styles.css'
import logo from '../../assets/jaguar.jpg'

function Login() {
    return (
        <div className='main'>
            <header className='headerLogin'>
                <img className='logoHeader' src={logo} alt=''/>
                <div className='textContainer'>
                    <p>URANOR DO AMANHECER</p>
                    <p>CASTELO DOS DEVAS</p>
                </div>
            </header>
            <div className='cardContainer'>
                <div className='card'>
                    <h2>Login</h2>
                    <div className="form">
                        <label id='label-login'>Usuário:</label>
                        <input type="text" name="user" id='input-login'/>
                        <label id='label-login'>Senha:</label>
                        <input type="password" name="password" id='input-login' />
                        <button id='button-login'>Entrar</button>
                    </div>
                    <div id='error'>{''}<br /></div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login