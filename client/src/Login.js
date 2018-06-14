import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            validity: true
        };
    }

    updateAccount = e => {
        this.setState({ account: e.target.value });
    }

    updatePassword = e => {
        this.setState({ password: e.target.value });
    }

    checkLoginValid = () => {
        if (this.state.account === 'user1' && 
            this.state.password === 'user1')
        {
            this.props.loginAs('user1');
            this.props.history.push('/');
        }
        else
            this.setState({ validity: false });
    }

    onKeyPressed = e => {
        if (e.keyCode === 229)  return;
        // if pressed Enter
        if (e.keyCode === 13) {
            if (this.state.account === '' && this.state.password === '') return;   
            else this.checkLoginValid();
        }
    }

    render() {
        var errorMessage;
        if (this.state.validity)
            errorMessage = '';
        else
            errorMessage = 'Not valid account or password';
        return(
            <div className="Login" >
                <h1 className="align-center"> Login </h1>
                <h2 className="align-center"> only one account is available now </h2>
                {" account : "}
                <input 
                    type="text"
                    placeholder = "`user1`"
                    className="loginInput"
                    onChange={(e)=>this.updateAccount(e)}
                    onKeyDown={(e)=>this.onKeyPressed(e)}
                />
                <br/>
                {"password : "}
                <input 
                    type="text"
                    placeholder = "`user1`"
                    className="loginInput"
                    onChange={(e)=>this.updatePassword(e)}
                    onKeyDown={(e)=>this.onKeyPressed(e)}
                />
                <br/>
                <button onClick={()=>this.checkLoginValid()}> Login </button>
                <br/>
                {errorMessage}
            </div>
        );
    }
}

export default withRouter(Login);