import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './Article.css';

class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articleID: 0
        }
    }
    componentDidMount = () => {
        this.props.getArticles()
    }

    newArticle = () => {
        this.props.history.push('/new');
    }

    chooseArticle = id => {
        this.setState({ articleID: id });
    }

    render() {
        var newArticle;
        if (this.props.isLogin && !this.props.DBerror)
            newArticle = (<button class="newArticle" onClick={()=>this.newArticle()}> New Article</button>);
        else
            newArticle = null;
        var artList;
        var artBody;
        if (this.props.waiting) {
            artList = (
                <div class="error">
                    <h2>Loading...</h2>
                </div>
            );
            artBody = null;
        }
        else if (this.props.DBerror) {
            artList = (
                <div class="error">
                    <h2>Database Error!</h2>
                </div>
            );
            artBody = null;
        }
        else {
            artList = (
                <ArticleList
                    articles={this.props.articles} 
                    chooseArticle={this.chooseArticle}
                />
                
            );
            artBody = (
                <ArticleBody
                    articles={this.props.articles}
                    articleID={this.state.articleID}
                />
            );
        }
        return (
            <div class="article">
                {artList}
                {artBody}
                {newArticle}
            </div>
        );
    }
}

class ArticleList extends Component {
    chooseArticle = id => {
        this.props.chooseArticle(id)
    }
    render() {
        var articleBlocks = []
        //for (let i=0; i<this.props.articles.length; i++) {
        for (let i=this.props.articles.length-1; i>=0; i--) {
            articleBlocks.push(
                <div class="artBlock" key={i} onClick={()=>this.chooseArticle(i)}>
                    <h3>{this.props.articles[i].title}</h3>
                </div>
            );
        }
        return (
            <div>
                <h2 class="artListTitle">Articles:</h2>
                <div class="artList">
                    {articleBlocks}
                </div>
            </div>
        )
    }
}

class ArticleBody extends Component {
    render() {
        var title;
        var content;
        if (this.props.articles.length <= this.props.articleID) {
            title = "Error";
            content = "Error";
        }
        else {
            title = this.props.articles[this.props.articleID].title;
            content = this.props.articles[this.props.articleID].content;
        }
        return (
            <div class="artBody">
                <h2 class="artBodyTitle">{title}</h2>
                <pre class="artBodyContent">
                    {content}
                </pre>
            </div>
        )
    }
}

export default withRouter(Article);
