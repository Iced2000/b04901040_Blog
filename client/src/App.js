import React, { Component } from 'react';
import Header from './Header'
import Body from './Body'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false,
            userName: '',
            articles: [],
            waiting: true,
            DBerror: false,
        }
    }
    
    getArticles = async() => {
        try {
            const res = await fetch('http://localhost:8000/', {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                body: null
            });
            const json = await res.json();
            var articles = [];
            for (let i=0; i<json.length; i++)
                articles.push(json[i]);
            this.setState({ articles: articles, 
                            waiting: false,
                            DBerror: false });
        }
        catch(e) {
            console.log('get articles from DB failed', e)
            this.setState({ DBerror: true })
        }
    }
    
    setUserName = name => {
        this.setState({ isLogin: true, userName: name })
    }

    logout = () => {
        this.setState({ isLogin: false, userName: '' })
    }

    render() {
        return (
            <div>
                <Header 
                    isLogin={this.state.isLogin} 
                    userName={this.state.userName}
                    home={this.getArticles}
                    logout={this.logout}
                />
                <Body   
                    isLogin={this.state.isLogin}
                    loginAs={this.setUserName}
                    getArticles={this.getArticles}
                    articles={this.state.articles}
                    waiting={this.state.waiting}
                    DBerror={this.state.DBerror}
                />
            </div>
        );
    }
}

export default App;
