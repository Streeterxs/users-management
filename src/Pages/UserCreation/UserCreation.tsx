import React from 'react';
import { UserForm } from './Components';

import './userCreation.css'
import { Endereco } from '../../Store/Users/Address';
import { Usuario } from '../../Store/Users/User';
import { useDispatch } from 'react-redux';
import { createUser } from '../../Store/Users/Actions/userActions';

const UserCreation = () => {
    const dispatch = useDispatch();

    const handleFormSubmit = (userForm: UserForm) => {
        const endereco: Endereco = {
            cep: userForm.cep,
            rua: userForm.rua,
            numero: userForm.numero,
            bairro: userForm.bairro,
            cidade: userForm.cidade
        };

        const usuario: Usuario = {
            nome: userForm.nome,
            cpf: userForm.cpf,
            email: userForm.email,
            endereco
        };

        (async () => {
            await dispatch(await createUser(usuario))
        })();
    };

    return (
        <div className="creation__wrapper">
            <div className="display-flex height-70 width-100 justify-center align-center">
                <UserForm
                    formSubmit={handleFormSubmit}
                />
            </div>
        </div>
    )
};

export default UserCreation;