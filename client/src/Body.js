import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './Login'
import NewArticle from './NewArticle'
import Article from './Article'

class Body extends Component {
    render() {
        var newArticle;
        var login;
        if (this.props.isLogin) {
            newArticle = (<Route exact path='/new' render={(props)=><NewArticle />} />);
            login = (<Redirect from='/login' to='/'/>);
        }
        else {
            newArticle = (<Redirect from='/new' to='/'/>);
            login = (<Route exact path='/login'
                        render = { (props) =>
                            <Login loginAs={this.props.loginAs}/>
                        } 
                    />);
        }
        return (
            <Switch>
                <Route exact path='/'
                    render = { (props) =>
                        <Article
                            isLogin={this.props.isLogin}
                            getArticles={this.props.getArticles} 
                            articles={this.props.articles}
                            waiting={this.props.waiting}
                            DBerror={this.props.DBerror}
                        />
                    } 
                />
                {login}
                {newArticle}
            </Switch>
        )
    }
}

export default Body;
