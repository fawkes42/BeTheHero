import React, { useState } from 'react'

import './style.css'
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'

import api from '../../service/api'

export default function Register() {
    const history = useHistory()

    let [Nome, setNome] = useState('')
    let [Email, setEmail] = useState('')
    let [Whatsapp, setWhatsapp] = useState('')
    let [Cidade, setCidade] = useState('')
    let [Uf, setUf] = useState('')

    function handleRegister(e) {
        e.preventDefault()
        let data = { Nome, Email, Whatsapp, Cidade, Uf }
        api.post('/ong', data).then(response => {
            alert(`Seu ID de acesso é: ${response.data.Id}`)
            history.push('/')
        }).catch(() => {
            alert(`Erro ao cadastrar`)
        })
    }
    return (
        <div className='register-container'>
            <div className='content'>
                <section>
                        <img src={logoImg} alt='Be The Hero'/>
                        <h1>Cadastro</h1>
                        <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontraremos casos da sua ONG</p>
                        <Link className='back-link' to='/'>
                            <FiArrowLeft size='16' color='#e02041'/>
                            Voltar
                        </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder='Nome da ONG' value={Nome} onChange={e => setNome(e.target.value)}/>
                    <input type='email' placeholder='E-mail' value={Email} onChange={e => setEmail(e.target.value)}/>
                    <input placeholder='WhatsApp' value={Whatsapp} onChange={e => setWhatsapp(e.target.value)}/>
                    <div className='input-group'>
                        <input placeholder='Cidade' value={Cidade} onChange={e => setCidade(e.target.value)}/>
                        <input placeholder='UF' style={{ width: 80 }} value={Uf} onChange={e => setUf(e.target.value)}/>
                    </div>
                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}