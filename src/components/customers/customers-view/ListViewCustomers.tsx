import React, { Component } from 'react';
import { Customer } from '../../../models/Customer.model';
import { RouterChildContext } from 'react-router-dom';

interface ListViewCustomersProps {
    listCustomers: Customer[]
}

interface ListViewCustomersState {
    listCustomers: Customer[]
}

class ListViewCustomers extends Component<any, ListViewCustomersState> {
    constructor(props: any) {
        super(props);
        this.state = {
            listCustomers: this.props.listCustomers
        }
    }

    static getDerivedStateFromProps(nextProps: ListViewCustomersProps, prevState: ListViewCustomersState) {
        return {
            listCustomers: nextProps.listCustomers
        }
    }

    viewDetail = (customerId: string) => {
        this.props.history.push(`/customers/${customerId}/details`);
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">City</th>
                        <th scope="col">State</th>
                        <th scope="col">Order Total</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.listCustomers.map((customer: Customer) => {
                            return (
                                <tr key={customer.id} onClick={() => this.viewDetail(customer.id)}>
                                    <th scope="col">{customer.firstName}</th>
                                    <th scope="col">{customer.lastName}</th>
                                    <th scope="col">{customer.address}</th>
                                    <th scope="col">{customer.city}</th>
                                    <th scope="col">{customer.state.name}</th>
                                    <th scope="col">{customer.orders?.reduce((acc: any, order: any) => {return acc += order.itemCost}, 0)}</th>
                                    <th scope="col"><button type="button" className="btn btn-primary">View Order</button></th>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    }
}

export default ListViewCustomers;