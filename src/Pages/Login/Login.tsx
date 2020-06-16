import React from 'react';
import {LoginForm} from './Components';

import './Login.css'
import { useDispatch } from 'react-redux';
import { login } from '../../Store/Core';

const Login = () => {
    let email = '';
    let password = '';

    const dispatch = useDispatch();

    const handleFormSubmit = () => {
        dispatch(login(
            {
                email,
                password
            }
        ))
    }
    return (
        <div className="login__wrapper">
            <div className="display-flex height-80 width-100 justify-center align-center">
                <div className="width-50">
                    <LoginForm
                        passwordChange={(passwordReturn) => password = passwordReturn}
                        emailChange={emailReturn => email = emailReturn}
                        formSubmit={handleFormSubmit}/>
                </div>
            </div>
        </div>
    );
};

export default Login;