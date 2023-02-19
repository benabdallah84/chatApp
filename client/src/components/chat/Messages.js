import React, { Component } from 'react';
import Message from './Message';
class Messages extends Component {
    render() {
        return (
            <div id="messages">
                {this.props.messages.map(this.renderMessage)}
                
            </div>
        );
    }
    renderMessage=(message,index) => {
        message.outgoing= message.receiver !== this.props.user.id
        return <Message message={message} key={index}/>
    }
}

export default Messages;