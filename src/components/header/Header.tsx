import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';


class Header extends Component<any, any> {

    logout = () => {
        axios.post('/api/auth/logout', {})
        .then(response => {
            localStorage.removeItem('user');
            this.props.history.push('/');
        })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink className="navbar-brand" to="/">Customer Manager</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink activeClassName="active" className="nav-link" to="/customers">Customers</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeClassName="active" className="nav-link" to="/settings">Settings</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeClassName="active" className="nav-link" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" onClick={this.logout}>Logout</span>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        );
    }
}

export default withRouter(Header);