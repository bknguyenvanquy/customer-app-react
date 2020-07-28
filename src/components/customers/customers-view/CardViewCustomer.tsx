import React, { Component } from 'react'
import { RouterChildContext, withRouter, RouteComponentProps } from 'react-router-dom';
import { Customer } from '../../../models/Customer.model';
import axios from 'axios';

interface CardViewCustomerProps {
    listCustomers: Customer[]
}

interface CardViewCustomerState {
    listCustomers: Customer[]
}

class CardViewCustomer extends Component<any, CardViewCustomerState> {
    constructor(props: any) {
        super(props);
        this.state = {
            listCustomers: this.props.listCustomers
        }
    }

    static getDerivedStateFromProps(nextProps: CardViewCustomerProps, prevState: CardViewCustomerState) {
        return {
            listCustomers: nextProps.listCustomers
        }
    }

    viewDetail = (customerId: string) => {
        this.props.history.push(`/customers/${customerId}/details`);
    }
    render() {
        return (
            <>
                <div className="d-flex flex-wrap">
                    {
                        this.state.listCustomers?.map((customer: Customer) => {
                            return (
                                <div className="card" key={customer.id} onClick={() => this.viewDetail(customer.id)}>
                                    <div className="card-body">
                                        <h5 className="card-title">{customer.firstName} {customer.lastName}</h5>
                                        <p className="card-text">{customer.address}</p>
                                        <p className="card-text">{customer.city}</p>
                                        <p className="card-text">{customer.state.name}</p>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">View Order</small>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div></>
        );
    }
}

export default CardViewCustomer;