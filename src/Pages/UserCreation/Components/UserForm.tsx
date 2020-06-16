import React, { SyntheticEvent, useState } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { Endereco } from '../UserCreation';


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
    emailChange: (email: string) => void,
    nomeChange: (nome: string) => void,
    cpfChange: (cpf: string) => void,
    cepChange: (cep: string) => void,
    ruaChange: (rua: string) => void,
    numeroChange: (numero: number) => void,
    bairroChange: (bairro: string) => void,
    cidadeChange: (cidade: string) => void,
    formSubmit: (form: UserForm) => void
};
const UserForm = (userFormProps: UserFormProps) => {
    const formObj: UserForm = {
        nome: '',
        email: '',
        cpf: '',
        cep: '',
        rua: '',
        numero: 0,
        bairro: '',
        cidade: ''
    }

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
        const keyOfUserFormProps = `${key}Change` as keyof UserFormProps;
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

        (userFormProps[keyOfUserFormProps] as any)(value);

        if (!formValidation[keyOfForValidation]) {
            setFormValidation({...formValidation, [keyOfForValidation]: true});
        }

        const formobjkey = `${key}` as keyof UserForm
        (formObj[formobjkey] as any) = value;
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formIsValid = Object.keys(formValidation).filter(key => key !== 'showErrors').reduce((acc, curr) => {
            const formValKey = curr as keyof UserFormValidation;

            return acc && (formValidation[formValKey] as any);
        }, true);

        console.log('formIsValid: ', formIsValid);

        if (!formIsValid) {
            setFormValidation({...formValidation, showErrors: true});
            return;
        }

        userFormProps.formSubmit(formObj);
    }

    return (
        <Form onSubmit={(event) => handleFormSubmit(event)}>
            <Form.Field
                onChange={(event: SyntheticEvent<HTMLInputElement>, {value}: any) => handleFormInput<string>(value, UserFormKeys.nome)} 
                label="nome"
                control={Input}
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
                control={Input}
                placeholder="Ex.: joe.dohan@gmail.com"
                error={!formValidation.emailIsValid && formValidation.showErrors ? {
                    content: 'E-mail inválido',
                    pointing: 'below',
                }: null}
                required
            />
            <Form.Field
                label="cpf"
                onChange={(event: SyntheticEvent<HTMLInputElement>, {value}: any) => handleFormInput<string>(value, UserFormKeys.cpf)}
                control={Input}
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
                    label='CEP'
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
                    label='rua'
                    error={!formValidation.ruaIsValid && formValidation.showErrors ? {
                        content: 'Rua inválida',
                        pointing: 'below',
                    }: null}
                    required
                />
                <Form.Field
                    id='form-input-control-last-name'
                    control={Input}
                    onChange={(event: SyntheticEvent<HTMLInputElement>, {value}: any) => handleFormInput<number>(value, UserFormKeys.numero)}
                    label='número'
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
                    error={!formValidation.bairroIsValid && formValidation.showErrors ? {
                        content: 'Bairro inválido',
                        pointing: 'below',
                    }: null}
                    label='bairro'
                    required
                />
                <Form.Field
                    id='form-input-control-last-name'
                    onChange={(event: SyntheticEvent<HTMLInputElement>, {value}: any) => handleFormInput<string>(value, UserFormKeys.cidade)}
                    control={Input}
                    error={!formValidation.cidadeIsValid && formValidation.showErrors ? {
                        content: 'Cidade inválido',
                        pointing: 'below',
                    }: null}
                    label='cidade'
                    required
                />
            </Form.Group>
            <Button type='submit'>Submit</Button>
        </Form>
    )
};

export default UserForm;