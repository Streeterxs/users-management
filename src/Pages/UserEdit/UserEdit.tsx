import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { RootState } from '../../Store/Store';
import { UserForm } from '../UserCreation';
import { Endereco, Usuario, findUser, fetchUsers, updateUserAction, optimisticUpdateUserAction } from '../../Store/Users';

type EditPageParams = {
    identifier?: string;
}
const UserEdit = () => {
    const {userEdit, userList} = useSelector((state: RootState) => state.usersReducer);

    const dispatch = useDispatch();

    const history = useHistory()

    const params = useParams<EditPageParams>();

    useEffect(() => {
        if (params.identifier) {
            if (!userList) {
                (async () => await dispatch(await fetchUsers()))()
                return;
            }
            dispatch(findUser(+params.identifier));
        } else {
            history.push('/');
        }
    }, [userEdit, userList]);

    const handleFormSubmit = (userForm: UserForm) => {
        const endereco: Endereco = {
            cep: userForm.cep,
            rua: userForm.rua,
            numero: userForm.numero,
            bairro: userForm.bairro,
            cidade: userForm.cidade
        };

        const usuario: Usuario = {
            id: userForm.id,
            nome: userForm.nome,
            cpf: userForm.cpf,
            email: userForm.email,
            endereco
        };

        (async () => {
            dispatch(optimisticUpdateUserAction(usuario));
            history.push('/');
            await dispatch(await updateUserAction(usuario));
        })();
    };

    return (
        <div className="creation__wrapper">
            <div className="display-flex height-70 width-100 justify-center align-center">
                <UserForm
                    userToEdit={userEdit ? userEdit : undefined}
                    formSubmit={handleFormSubmit}
                />
            </div>
        </div>
    );
};

export default UserEdit;