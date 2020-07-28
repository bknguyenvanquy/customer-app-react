import React, { Component } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';

interface FormState {
    "firstName": string;
    "lastName": string;
    "address": string;
    "city": string;
    "state": string;
}

interface FormError {
    "firstName": string;
    "lastName": string;
    "address": string;
    "city": string;
    "state": string;
}

class CreateUpdateCustomer extends Component<any> {
    constructor(props: any) {
        super(props);
        console.log(props);
    }

    formikSubmit = (values: any) => {
        // if (this.props.isUpdate) {
        //     this.props.updateRecipe(values)
        // } else {
        // this.props.addRecipe(values);
        // }
        // this.goBackRecipes();
        console.log(values)
    };
    formikValidate = (values: FormState) => {
        let error: FormError = {} as FormError;
        if (values.firstName.length === 0) {
            error.firstName = 'firstName is required';
        }
        if (values.lastName.length === 0) {
            error.lastName = 'lastName Url is required';
        }
        if (values.address.length === 0) {
            error.address = 'address is required';
        }
        if (values.city.length === 0) {
            error.city = 'city is required';
        }
        if (values.state.length === 0) {
            error.state = 'state is required';
        }
        return error;
    }

    goToViewAllCustomers = () => {
        this.props.history.push('/customers');
    }

    render() {
        let customer = {
            "firstName": '',
            "lastName": '',
            "address": '',
            "city": '',
            "state": '',
        } as FormState
        if (this.props.isEdit) {
            
        }
        return (
            <div className="container">
                <div className="row">
                    <Formik initialValues={customer}
                        onSubmit={this.formikSubmit}
                        validate={this.formikValidate}
                        enableReinitialize>
                        {
                            (values) => <Form>
                                <div className="form-group">
                                    <label htmlFor="firstName">firstName</label>
                                    <Field id="firstName" className="form-control" type="text" name="firstName" />
                                    <ErrorMessage component='div' name="firstName" className="text-danger" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">lastName</label>
                                    <Field id="lastName" className="form-control" type="text" name="lastName" />
                                    <ErrorMessage component='div' name="lastName" className="text-danger" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">address</label>
                                    <Field id="address" className="form-control" type="text" name="address" />
                                    <ErrorMessage component='div' name="address" className="text-danger" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">city</label>
                                    <Field id="city" className="form-control" type="text" name="city" />
                                    <ErrorMessage component='div' name="city" className="text-danger" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state">state</label>
                                    <Field id="state" className="form-control" type="text" name="state" />
                                    <ErrorMessage component='div' name="state" className="text-danger" />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-success" >Insert</button>
                                <button type="button" className="btn btn-danger" onClick={this.goToViewAllCustomers}>Cancel</button>
                            </Form>
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

export default CreateUpdateCustomer;