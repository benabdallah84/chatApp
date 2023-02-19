import React, { Component } from 'react';
import {Row, Spinner} from 'reactstrap'
import Auth from '../Auth'
import {ContactHeader,Contacts, ChatHeader, Messages, MessageForm,UserProfile} from '../components'

import socketIO from 'socket.io-client'
class Chat extends Component {

    state = {
        // user:{id:"1",nam:'ابراهيم'},
        // messages:[
        //     {sender:"1", receiver:"2",content:"مرحبا كيف حالك"},
        //     {sender:"1", receiver:"2",content:"مرحبا كيف حالك"},
        //     {sender:"3", receiver:"1",content:"مرحبا كيف حالك"},
        //     {sender:"1", receiver:"3",content:"مرحبا كيف حالك"},
        //     {sender:"1", receiver:"2",content:"مرحبا كيف حالك"},
        //     {sender:"3", receiver:"2",content:"مرحبا كيف حالك"},
        //     {sender:"2", receiver:"1",content:"مرحبا كيف حالك"},
        // ],
        // contacts:[
        //     {id:"2",name:"محمد"},
        //     {id:"3",name:"أحمد"}
        // ],
        // contact:{id:"2",name:"محمد"},
        // connected: false
        contacts:[],
        contact:{},
        userProfile: false

    }
    userProfileToggle=()=>this.setState({userProfile: !this.state.userProfile})
    //call the socket function after hte loading of the component
    componentDidMount(){
        this.initSocketConnection()
    }
    //socket connection to the sever
    initSocketConnection = () => {
        let socket = socketIO(process.env.REACT_APP_SOCKET,{
            query: 'token='+ Auth.getToken()
        })
        socket.on('connect', () => this.setState({connected: true}))
        socket.on('disconnect', () => this.setState({connected: false}))
        socket.on('error', (err) => {
            
            if(err === 'auth_error'){
                Auth.logout()
                window.location.replace('/login')

          }  
        })


        socket.on('data', (user,contacts,messages,users) => {
            let contact = contacts[0] || {}
            this.setState({user,messages,contacts,contact},()=>{
                this.updateUserState(users)
            })
        })
        socket.on('new_user', this.onNewUser)
        socket.on('message', this.onNewMessage)
        socket.on('user_status', this.updateUserState)
        socket.on('typing', this.onTypingMessage)
        this.setState({socket})
    }

    onTypingMessage = sender => {
        if(this.state.contact.id !== sender) return;
        this.setState({typing: sender})
        clearTimeout(this.state.timeout)
        const timeout = setTimeout(this.typingTimeout,3000)
        this.setState({timeout})
    }

    typingTimeout = () => this.setState({typing:false});

    
    updateUserState = users =>{
        let contacts = this.state.contacts
        contacts.forEach((element,index)=>{
            if(users[element.id]) contacts[index].status = users[element.id]
        })
        this.setState({contacts})
        let contact = this.state.contact
        if(users[contact.id]) contact.status = users[contact.id]
        this.setState({contact})
    }
    //provocked from the messages component(child with binding up contact parm)
    onChatNavigate = (contact) => {
        this.setState({contact});
        this.state.socket.emit('seen', contact.id)
        let messages = this.state.messages
        messages.forEach((element,index)=>{
            if(element.sender === contact.id) messages[index].seen = true
        })
        this.setState({messages})
    }

    renderChat= () => {
        const {contact,user}  = this.state
        if(!contact){
            return

        }
        let messages = this.state.messages.filter(e => e.sender === contact.id || e.receiver === contact.id)
        return <Messages user={user} messages={messages}/>
    }
    //add new user to the state to be able to informm others that new user has joined the chat
    onNewUser = (user)=>{
        let contacts = this.state.contacts.concat(user)
        this.setState({contacts})

    }
    //send a message to the contact which is the receiver
    sendMessge = (message) => {
        if(!this.state.contact.id) return;
        console.log('contact: '+ this.state.contact.id)
        message.receiver = this.state.contact.id        
        let messages = this.state.messages.concat(message)
        this.setState({messages})
        this.state.socket.emit('message',message)
    }
    //add message to the state to be able to inform others
    onNewMessage = (message)=>{
        if(message.sender === this.state.contact.id){
            this.setState({typing: false})
            this.state.socket.emit('seen', this.state.contact.id)
            message.seen = true
        }
        let messages = this.state.messages.concat(message)
        this.setState({messages})

    } 

    sendType = () => this.state.socket.emit('typing', this.state.contact.id)
    render() {
        if(!this.state.connected || !this.state.contacts || !this.state.messages){
            return <Spinner id="loader" color="success" />
        }
        
    

        return (
            <Row className='h-100'>
                <div id="contacts-section" className='col-6 col-md-4'>
                    <ContactHeader/>
                    
                    <Contacts 
                        contacts={this.state.contacts} 
                        messages={this.state.messages} 
                        onChatNavigate={this.onChatNavigate}
                        />
                    <UserProfile contact={this.state.contact} toggle={this.userProfileToggle} open={this.state.userProfile}/>
                    
                </div>
                <div id="messages-section" className='col-6 col-md-8'>
                    <ChatHeader 
                        contact={this.state.contact} 
                        typing={this.state.typing}
                        toggle={this.userProfileToggle}
                    
                    />
                    {this.renderChat()}

                    <MessageForm sender={this.sendMessge} sendType={this.sendType}/>
                </div>
                

            </Row>
        );

    }
}

export default Chat;