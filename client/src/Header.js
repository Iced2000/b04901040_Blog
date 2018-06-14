import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './Header.css';

class Header extends Component {
    login = () => {
        this.props.history.push('/login');
    }

    home = () => {
        this.props.home()
        this.props.history.push('/');
    }

    render() {
        var name;
        var button;
        if (this.props.isLogin) {
            name = "Welcome user1~";
            button = (<button onClick={()=>this.props.logout()}> Logout </button>);
        }
        else {
            name = "Please Login!";
            button = (<button onClick={()=>this.login()}> Login </button>);
        }
        return (
            <div class="Header">
                <h1 onClick={()=>this.home()}> Somebody's Blog </h1>
                {name}
                {button}
            </div>
        );
    }
}

export default withRouter(Header);
