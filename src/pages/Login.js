import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';

import { loginUser, useAuthState, useAuthDispatch } from '../context' 

export const Login = (props) => {
    const [showMessage, setShowMessage] = useState(true);
    const [formData, setFormData] = useState({});
    const dispatch = useAuthDispatch();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate: (data) => {
            let errors = {};

            if (!data.username) {
                errors.username = 'Username is required.';
            }

            if (!data.password) {
                errors.password = 'Password is required.';
            }

            return errors;
        },
        onSubmit: async (data) => {
            setFormData(data);
            setShowMessage(true);
            console.log(data)
            
            try {
                let response = await loginUser(dispatch, data) //loginUser action makes the request and handles all the neccessary state changes
                console.log(response)
                if (!response.user) return
                props.history.push('/dashboard') //navigate to dashboard on success
            } catch (error) {
                console.log(error)
            }

            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <div className="form-demo">
            <div className="p-d-flex p-jc-center">
                <div className="card">
                    <h5 className="p-text-center">Login</h5>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText  id="username" name="username" value={formik.values.username} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('username') })} />
                                <label htmlFor="username" className={classNames({ 'p-error': isFormFieldValid('username') })}>Username*</label>
                            </span>
                            {getFormErrorMessage('username')}
                        </div>

                        <div className="p-field">
                            <span className="p-float-label">
                                <Password feedback={false} id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>

                        <Button type="submit" label="Submit" className="p-mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}
