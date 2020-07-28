import React, { Component } from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { Formik } from 'formik';
import axios from 'axios';
import { User } from '../../models/User.model';

interface FormState {
    email: string;
    password: string;
}

interface FormError {
    email?: string;
    password?: string;
}

class Login extends Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log(props);
        this.state = { seePassword: false };
    }

    formikSubmit = (values: FormState) => {
        console.log(values);
        axios.post('/api/auth/login', {
            email: values.email,
            password: values.password
        }).then((response: {data: User}) => {
            localStorage.setItem('user', JSON.stringify(response.data));
            // localStorage.setItem('isLogged', JSON.stringify(true));
            axios.defaults.headers.common['authorization'] = `Bearer ${response.data.token}`;
            this.props.history.push('/')
        })
        .catch(err => console.log(err))
    };

    formikValidate = (values: FormState) => {
        let error: FormError = {};
        if (values.email.length === 0) {
            error.email = 'Email is required';
        }
        if (values.password.length === 0) {
            error.password = 'Password is required';
        }
        return error;
    }

    seePassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        this.setState({ seePassword: !this.state.seePassword });
    }

    render() {
        return (
            <div className="container">
                <Formik initialValues={{ email: '', password: '' }} onSubmit={this.formikSubmit} validate={this.formikValidate}>
                    {
                        () => <Form>
                            <div className="form-group">
                                <label htmlFor="email">Name</label>
                                <Field id="email" className="form-control" type="text" name="email" />
                                <ErrorMessage component='div' name="email" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field className="form-control" type={this.state.seePassword ? 'text' : 'password'} name="password" />
                                <ErrorMessage component='div' name="password" className="text-danger" />
                            </div>
                            <button className="btn btn-primary btn-block" type="submit">Submit</button>
                            <button className="btn btn-primary btn-block" type="button" onClick={this.seePassword}>{this.state.seePassword ? 'Hide Password' : 'See Password'}</button>
                        </Form>
                    }
                </Formik>
            </div>
        );
    }
}

export default Login;