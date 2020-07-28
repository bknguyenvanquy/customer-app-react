import React, { Component } from 'react';
import axios from 'axios';
import { Customer } from '../../../models/Customer.model';

interface CustomerDetailState {
    customer: Customer
}

class CustomerDetail extends Component<any, CustomerDetailState> {
    constructor(props: any) {
        super(props);
        console.log(props)
        this.state = {
            customer: {} as Customer
        }
    }

    componentDidMount() {
        axios.get(`/api/customers/${this.props.match.params.id}`)
            .then(response => {
                console.log(response)
                this.setState({ customer: response.data });
            })
            .catch(err => console.log(err));
    }

    goToViewAllCustomers = () => {
        this.props.history.push('/customers', {customer: this.state.customer});
    }

    goToEditCustomer = () => {
        this.props.history.push(`/customers/${this.state.customer.id}/edit`);
    }
    render() {
        return (
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{this.state.customer.firstName} {this.state.customer.lastName}</h5>
                    <p className="card-text">{this.state.customer.address}</p>
                    <p className="card-text">{this.state.customer.city}</p>
                    <button type="button" className="btn btn-success" onClick={this.goToViewAllCustomers}>View all customers</button>
                    <button type="button" className="btn btn-primary" onClick={this.goToEditCustomer}>Edit Customer</button>
                </div>
            </div>
        );
    }
}

export default CustomerDetail;