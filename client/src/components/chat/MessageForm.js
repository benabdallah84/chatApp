import React, { Component } from 'react';
import {Input} from 'reactstrap';
import moment from 'moment';
class MessageForm extends Component {
    state={
        message : "",
        lastType:false
    }
    onKeyDown = e => {
        if(e.key === 'Enter' && !e.shiftKey){
            this.setState({lastType: false})
            this.onSend()
            console.log('end writing....')
            e.preventDefault()
        }else if(!this.state.lastType || moment() - this.state.lastType > 2000){
            console.log('writing....')
            this.setState({lastType: moment()})
            this.props.sendType()
        }
    }
    onChange = e =>this.setState({message:e.target.value})
    onSend = e => {
        if(!this.state.message) return;
        let message = {
            content: this.state.message,
            data: new Date().getTime()
        }
        this.props.sender(message)
        
        this.setState({message:''})
    }
    render() {
        return (
            <div id="send-message">
                <Input type="textarea" rows="1" onChange={this.onChange} onKeyDown={this.onKeyDown} value={this.state.message} placeholder="اكتب رسالتك هنا"/>
                <i className="fa fa-send text-muted px-3 send" onClick={this.onSend}/>
                
            </div>
        );
    }
}

export default MessageForm;