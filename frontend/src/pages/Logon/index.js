import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../service/api'

import './style.css'
import { FiLogIn } from 'react-icons/fi'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon() {
    const history = useHistory()

    let [Id, setId] = useState('')

    function handleLogin(e) {
        e.preventDefault()
        api.post('/session', { Id }).then(response => {
            alert(`Login feito com a ONG: ${response.data.Nome}`)
            localStorage.setItem('OngId', Id)
            localStorage.setItem('OngNome', response.data.Nome)
            history.push('/profile')
        }).catch(() => {
            alert(`ONG não encontrada`)
        })
    }

    return (
        <div className='logon-container'>
            <section className='form'>
                <img src={logoImg} alt='Be the Hero'/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input placeholder='Sua ID' value={Id} onChange={e => setId(e.target.value)}/>
                    <button className='button' type='submit'>Entrar</button>
                    <Link className="back-link" to='/register'>
                        <FiLogIn size='16' color='#e02041'/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt='Heroes'/>
        </div>
    )
}