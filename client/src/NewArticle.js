import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './NewArticle.css';

class NewArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Error: ''
        }
    }

    submit = () => {
        if (this.title.value === '' || this.content.value === '')
            this.setState({ Error: 'null content' });
        else
            this.postArticle()
    }

    postArticle = async() => {
        try {
            const res = await fetch('http://localhost:8000/', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: this.title.value,
                    content: this.content.value
                })
            });
            console.log(res);
            this.props.history.push('/')
        }
        catch(err) {
            console.log('PostData Error!', err)
            this.setState({ Error: 'DB error' });
        }
    }

    render(){
        var error;
        if (this.state.Error === 'null content')
            error = "title or content can't be null";
        else if (this.state.Error === 'DB error')
            error = "Database Error";
        else 
            error = null;
        return(
            <div class="newText">
                <div>
                    <input 
                        class="newTextTitle" 
                        type="text" 
                        placeholder="title"
                        ref={(ref) => {this.title = ref}}
                    />
                    <textarea 
                        class="newTextContent" 
                        placeholder="content" 
                        ref={(ref) => {this.content = ref}}
                    />
                    <input 
                        class="newTextSubmit"  
                        type="submit" 
                        onClick={()=>this.submit()}
                    />
                    <br/>
                    {error}
                </div>
            </div>
        )
    }
}

export default withRouter(NewArticle);
