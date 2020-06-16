import React from 'react';
import { UserForm } from './Components';

import './userCreation.css'

export interface Endereco {
    cep: string;
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
};

const UserCreation = () => {
    const handleFormSubmit = (userForm: UserForm) => {
        alert('usuário criado!');
    };

    return (
        <div className="creation__wrapper">
            <div className="display-flex height-70 width-100 justify-center align-center">
                <UserForm
                    emailChange={console.log}
                    nomeChange={console.log}
                    cpfChange={console.log}
                    cepChange={console.log}
                    ruaChange={console.log}
                    numeroChange={console.log}
                    bairroChange={console.log}
                    cidadeChange={console.log}
                    formSubmit={handleFormSubmit}
                />
            </div>
        </div>
    )
};

export default UserCreation;