import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../service/api'

import './style.css'
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
    const history = useHistory()

    let [Titulo, setTitulo] = useState('')
    let [Descricao, setDescricao] = useState('')
    let [Valor, setValor] = useState('')
    let OngId = localStorage.getItem('OngId')

    function handleNew(e) {
        e.preventDefault()
        let data = { Titulo, Descricao, Valor }
        
        api.post('/incident', data, {
            headers: {
                Authorization: OngId
            }
        }).then(response => {
            alert(`${response.data.id} é o ID do seu caso`)
            history.push('/profile')
        }).catch(() => {
            alert(`Erro ao cadastrar`)
        })
    }

    return (
        <div className='newIncident-container'>
            <div className='content'>
                <section>
                        <img src={logoImg} alt='Be The Hero'/>
                        <h1>Cadastrar novo caso</h1>
                        <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                        <Link className='back-link' to='/profile'>
                            <FiArrowLeft size='16' color='#e02041'/>
                            Voltar
                        </Link>
                </section>
                <form onSubmit={handleNew}>
                    <input placeholder='Titulo do caso' value={Titulo} onChange={e => setTitulo(e.target.value)} />
                    <textarea placeholder='Descrição'value={Descricao} onChange={e => setDescricao(e.target.value)} />
                    <input placeholder='Valor'value={Valor} onChange={e => setValor(e.target.value)} />
                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}