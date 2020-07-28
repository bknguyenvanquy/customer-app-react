import React, { Component } from 'react'
import { Customer } from '../../models/Customer.model';
import axios from 'axios';
import CardViewCustomer from './customers-view/CardViewCustomer';
import ListViewCustomers from './customers-view/ListViewCustomers';

interface CustomersState {
    cardView: boolean;
    listCustomers: Customer[]
}

class Customers extends Component<any, CustomersState> {
    constructor(props: any) {
        super(props);
        this.state = {
            cardView: true,
            listCustomers: []
        }
    }
    componentDidMount() {
        axios.get('/api/customers')
            .then((response: { data: Customer[] }) => {
                // console.log(response.data);
                this.setState({
                    cardView: true,
                    listCustomers: response.data
                })
            })
    }

    selectCardView = () => {
        this.setState({ cardView: true });
    }

    selectListView = () => {
        this.setState({ cardView: false });
    }

    goToNewCustomer = () => {
        this.props.history.push('/customers/create');
    }
    render() {
        return (
            <>
                <button type="button" className="btn btn-success" onClick={this.goToNewCustomer}>New Customer</button>
                
                <ul className="nav nav-pills nav-fill mt-3">
                    <li className="nav-item" onClick={this.selectCardView}>
                        <span className={`nav-link ${this.state.cardView ? 'active' : ''}`}>Card View</span>
                    </li>
                    <li className="nav-item" onClick={this.selectListView}>
                        <span className={`nav-link ${!this.state.cardView ? 'active' : ''}`}>List View</span>
                    </li>
                </ul>
                <br />
                {
                    this.state.cardView ? <CardViewCustomer {...this.props} listCustomers={this.state.listCustomers}></CardViewCustomer> : <ListViewCustomers {...this.props} listCustomers={this.state.listCustomers}></ListViewCustomers>
                }
            </>
        )
    }
}

export default Customers;