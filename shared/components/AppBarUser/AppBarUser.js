'use strict';
import React from 'react';
import Button      from 'react-mdl/lib/Button';


export default class AppBarUser extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const user = this.props.user;

        return (
            <div className="AppBarUser">
                {!user &&
                <Button raised ripple accent onClick={this.props.handleLogin} className='AppBarUser__login'>
                    Sign in
                </Button>
                }
                {user && <ul className="AppBarAppBarUser__menu-info">
                    <li className="AppBarUser__menu-item">
                        {user.picture && <img className="AppBarUser__avatar" src={this.props.user.picture}/>
                        }
                    </li>
                    <li className="AppBarUser__menu-item">
                        <a href="/logout" className="AppBarUser__logout">
                            <i className="mdi mdi-logout mdi-xl"></i>
                        </a>
                    </li>
                </ul>}
            </div>
        )
    }

}