import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../service/api'

import logoImg from '../../assets/logo.svg'
import './style.css'

export default function Profile() {
    const history = useHistory()

    const [incidents, setIncidents] = useState([])
    let ongName = localStorage.getItem('OngNome')
    let OngId = localStorage.getItem('OngId')

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: OngId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [OngId])

    function handleDeleteIncident(id) {
        api.delete(`incident/${id}`, {
            headers: {
                Authorization: OngId
            }
        }).then(() => {
            setIncidents(incidents.filter(incident => incident.id !== id))
        }).catch(() => {
            alert(`Erro ao deletar`)
        })
    }

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vindo, {ongName}</span>
                <Link className="button" to="/incident/new">Novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.Titulo}</p>
                        <strong>Descrição:</strong>
                        <p>{incident.Descricao}</p>
                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.Valor)}</p>
                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li> 
                ))}
            </ul>
        </div>
    )
}