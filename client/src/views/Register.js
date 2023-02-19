import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form,Input, Button } from 'reactstrap'
import Error from 'components/Error'
import Logo from 'assets/images/logo.png'
import Auth from '../Auth'
import axios from 'axios'


class Register extends Component {
    
    state={name:'', username:'', password:'',error:''}
    onChange = e => this.setState({[e.target.name]:e.target.value, error:null})
    onSubmit = e =>{
        e.preventDefault()
        let data = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password
        }
        
        axios.post(`${process.env.REACT_APP_SERVER}/api/auth/register`, data).then(
            res=> {
                //console.log(`${process.env.BACKEND_SERVER}`)
                Auth.login(res.data)
                //this.props.history.push('/')
                window.location.replace("/")
            }
        ).catch(
            err => this.setState({error:err.response.data.message})
        )
    }
     
    render() {
        return (
            <Card className='auth col-lg-3 col-sm-6 '>
                <Form onSubmit={this.onSubmit}>
                    <img src={Logo} alt="" width="200"/>
                    <h5 className='mb-4'> انشاء حساب جديد</h5>
                    <Error error={this.state.error}/>
                    <Input value={this.state.name} name='name'onChange={this.onChange} placeholder="الاسم" required autoFocus/>
                    <Input value={this.state.username} name='username'onChange={this.onChange} placeholder="اسم المستخدم" required/>
                    <Input type="password" value={this.state.password} name='password'onChange={this.onChange} placeholder="كلمة السر" required/>
                    <Button color="primary" block className="mb-3">انشاء</Button>
                    <small><Link to='/login'>تسجيل الدخول</Link></small>
                    <p className="m-3 text-muted">&copy; 2018 - 2019</p>                   

                </Form>

            </Card>
        );
    }
}

export default Register;