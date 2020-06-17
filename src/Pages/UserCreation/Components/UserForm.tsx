import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { Usuario } from '../../../Store/Users';

enum UserFormKeys {
    nome="nome",
    email="email",
    cpf="cpf",
    cep="cep",
    rua="rua",
    numero="numero",
    bairro="bairro",
    cidade="cidade"
    
}

type UserForm = {
    id?: number | undefined;
    nome: string;
    cpf: string;
    email: string;
    cep: string;
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
};

type UserFormValidation = {
    emailIsValid: boolean;
    cpfIsValid: boolean;
    nomeIsValid: boolean;
    cepIsValid: boolean;
    ruaIsValid: boolean;
    numeroIsValid: boolean;
    bairroIsValid: boolean;
    cidadeIsValid: boolean;
    showErrors: boolean;    
};

type UserFormProps = {
    formSubmit: (form: UserForm) => void,
    userToEdit?: Usuario
};


const formObj: UserForm = {
    id: undefined,
    nome: '',
    email: '',
    cpf: '',
    cep: '',
    rua: '',
    numero: 0,
    bairro: '',
    cidade: ''
};

const UserForm = (userFormProps: UserFormProps) => {

    const [formValidation, setFormValidation] = useState<UserFormValidation>({
        emailIsValid: false,
        cpfIsValid: false,
        nomeIsValid: false,
        cepIsValid: false,
        ruaIsValid: false,
        numeroIsValid: false,
        bairroIsValid: false,
        cidadeIsValid: false,
        showErrors: false
    });

    const handleFormInput = <T,>(value: T, key: UserFormKeys, aditionalLogics?: boolean[]) => {
        const keyOfForValidation = `${key}IsValid` as keyof UserFormValidation;
        const adicionalLogicsReduced = aditionalLogics ?
            aditionalLogics.reduce((acc, curr) => {
                return acc && curr;
            }, true) :
            true;

        if (!value || !adicionalLogicsReduced) {
            if (formValidation[keyOfForValidation]) {
                setFormValidation({
                    ...formValidation,
                    [keyOfForValidation]: false
                });
            }
            return;
        }

        if (!formValidation[keyOfForValidation]) {
            setFormValidation({...formValidation, [keyOfForValidation]: true});
        }

        const formobjkey = `${key}` as keyof UserForm;
        (formObj[formobjkey] as any) = value;
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formIsValid = Object.keys(formValidation).filter(key => key !== 'showErrors').reduce((acc, curr) => {
            const formValKey = curr as keyof UserFormValidation;

            return acc && (formValidation[formValKey] as any);
        }, true);

        if (!formIsValid) {
            setFormValidation({...formValidation, showErrors: true});
            return;
        }

        userFormProps.formSubmit(formObj);
    }

    useEffect(() => {
        if (userFormProps.userToEdit) {
            formObj.id = userFormProps.userToEdit.id;
            formObj.nome = userFormProps.userToEdit.nome;
            formObj.email = userFormProps.userToEdit.email;
            formObj.cpf = userFormProps.userToEdit.cpf;
            formObj.cep = userFormProps.userToEdit.endereco.cep;
            formObj.rua = userFormProps.userToEdit.endereco.rua;
            formObj.numero = userFormProps.userToEdit.endereco.numero;
            formObj.bairro = userFormProps.userToEdit.endereco.bairro;
            formObj.cidade = userFormProps.userToEdit.endereco.cidade;

            setFormValidation({
                emailIsValid: true,
                cpfIsValid: true,
                nomeIsValid: true,
                cepIsValid: true,
                ruaIsValid: true,
                numeroIsValid: true,
                bairroIsValid: true,
                cidadeIsValid: true,
                showErrors: false
            })
        }
    }, [userFormProps.userToEdit]);

    return (
        <Form onSubmit={(event) => handleFormSubmit(event)}>
            <Form.Field
                onChange={function (event: SyntheticEvent<HTMLInputElement>, {value}: any) {
                    event.preventDefault();
                    handleFormInput<string>(value, UserFormKeys.nome)
                }} 
                label="nome"
                name="nome"
                control={Input}
                defaultValue={userFormProps?.userToEdit?.nome}
                placeholder="Ex.: Joe Dohan"
                error={!formValidation.nomeIsValid && formValidation.showErrors ? {
                    content: 'Nome inválido',
                    pointing: 'below',
                }: null}
                required
            />
            <Form.Field
                onChange={(event: SyntheticEvent<HTMLInputElement>, {value}: any) => handleFormInput<string>(value, UserFormKeys.email, [(value as string).includes('@')])} 
                label="email"
                name="email"
                control={Input}
                defaultValue={userFormProps?.userToEdit?.email}
                placeholder="Ex.: joe.dohan@gmail.com"
                error={!formValidation.emailIsValid && formValidation.showErrors ? {
                    content: 'E-mail inválido',
                    pointing: 'below',
                }: null}
                required
            />
            <Form.Field
                label="cpf"
                name="cpf"
                onChange={(event: SyntheticEvent<HTMLInputElement>, {value}: any) => handleFormInput<string>(value, UserFormKeys.cpf)}
                control={Input}
                defaultValue={userFormProps?.userToEdit?.cpf}
                error={!formValidation.cpfIsValid && formValidation.showErrors ? {
                    content: 'CPF inválido',
                    pointing: 'below',
                }: null}
                placeholder="Tamanho mínimo 4 caracteres"
                required
            />
            <Form.Group widths='equal'>
                <h4>Endereço</h4>
                <Form.Field
                    id='form-input-control-first-name'
                    onChange={(event: SyntheticEvent<HTMLInputElement>, {value}: any) => handleFormInput<string>(value, UserFormKeys.cep)}
                    control={Input}
                    defaultValue={userFormProps?.userToEdit?.endereco.cep}
                    label='CEP'
                    name="CEP"
                    error={!formValidation.cepIsValid && formValidation.showErrors ? {
                        content: 'CEP inválido',
                        pointing: 'below',
                    }: null}
                    required
                />
                <Form.Field
                    id='form-input-control-last-name'
                    onChange={(event: SyntheticEvent<HTMLInputElement>, {value}: any) => handleFormInput<string>(value, UserFormKeys.rua)}
                    control={Input}
                    defaultValue={userFormProps?.userToEdit?.endereco.rua}
                    label='rua'
                    name="rua"
                    error={!formValidation.ruaIsValid && formValidation.showErrors ? {
                        content: 'Rua inválida',
                        pointing: 'below',
                    }: null}
                    required
                />
                <Form.Field
                    id='form-input-control-last-name'
                    control={Input}
                    defaultValue={userFormProps?.userToEdit?.endereco.numero}
                    onChange={(event: SyntheticEvent<HTMLInputElement>, {value}: any) => handleFormInput<number>(value, UserFormKeys.numero)}
                    label='número'
                    name="numero"
                    error={!formValidation.numeroIsValid && formValidation.showErrors ? {
                        content: 'Número inválido',
                        pointing: 'below',
                    }: null}
                    type="number"
                    required
                />
                <Form.Field
                    id='form-input-control-last-name'
                    onChange={(event: SyntheticEvent<HTMLInputElement>, {value}: any) => handleFormInput<string>(value, UserFormKeys.bairro)}
                    control={Input}
                    defaultValue={userFormProps?.userToEdit?.endereco.bairro}
                    error={!formValidation.bairroIsValid && formValidation.showErrors ? {
                        content: 'Bairro inválido',
                        pointing: 'below',
                    }: null}
                    label='bairro'
                    name="bairro"
                    required
                />
                <Form.Field
                    id='form-input-control-last-name'
                    onChange={(event: SyntheticEvent<HTMLInputElement>, {value}: any) => handleFormInput<string>(value, UserFormKeys.cidade)}
                    control={Input}
                    defaultValue={userFormProps?.userToEdit?.endereco.cidade}
                    error={!formValidation.cidadeIsValid && formValidation.showErrors ? {
                        content: 'Cidade inválido',
                        pointing: 'below',
                    }: null}
                    label='cidade'
                    name="cidade"
                    required
                />
            </Form.Group>
            <Button type='submit'>Submit</Button>
        </Form>
    )
};

export default UserForm;