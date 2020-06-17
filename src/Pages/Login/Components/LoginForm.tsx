import React, { useState, SyntheticEvent } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';

export type LoginFormProps = {
    emailChange: (email: string) => void,
    passwordChange: (password: string) =>  void,
    formSubmit: () => void
};
const LoginForm = ({emailChange, passwordChange, formSubmit}: LoginFormProps) => {
    const [formValidation, setFormValidation] = useState({emailIsValid: false, passwordIsValid: false, showErrors: false});
    
    const handleEmailChange = (email: string) => {
        
        if (!email?.includes('@')) {
            if (formValidation.emailIsValid) {
                setFormValidation({...formValidation, emailIsValid: false});
            }
            return;
        }

        emailChange(email);

        if (!formValidation.emailIsValid) {
            setFormValidation({...formValidation, emailIsValid: true});
        }
    };

    const handlePasswordChange = (password: string) => {
        if (!(password.length >= 4)) {
            if (formValidation.passwordIsValid) {
                setFormValidation({...formValidation, passwordIsValid: false});
            };

            return;
        }

        passwordChange(password);

        if (!formValidation.passwordIsValid) {
            setFormValidation({...formValidation, passwordIsValid: true});
        };
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (! (formValidation.emailIsValid && formValidation.passwordIsValid)) {
            setFormValidation({...formValidation, showErrors: true});
            return;
        }

        formSubmit();
    }
    return (
        <Form onSubmit={(event) => handleFormSubmit(event)}>
            <Form.Field
                onChange={(event: SyntheticEvent<HTMLInputElement>, {value}: any) => handleEmailChange(value)} 
                label="E-mail"
                control={Input}
                placeholder="Ex: joe.dohan@gmail.com"
                error={!formValidation.emailIsValid && formValidation.showErrors ? {
                    content: 'Please enter a valid email address',
                    pointing: 'below',
                }: null}
            />
            <Form.Field
                label="Password"
                onChange={(event: SyntheticEvent<HTMLInputElement>, {value}: any) => handlePasswordChange(value)}
                control={Input}
                error={!formValidation.passwordIsValid && formValidation.showErrors ? {
                    content: 'Please enter a valid email address',
                    pointing: 'below',
                }: null}
                type="password"
                placeholder="Tamanho mínimo 4 caracteres"
            />
            <Button type='submit'>Submit</Button>
        </Form>
    );
};

export default LoginForm;
