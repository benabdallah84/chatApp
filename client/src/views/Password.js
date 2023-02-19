import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Card, Form, Input, Button} from 'reactstrap'
import {Error} from 'components'
import axios from 'axios'
import Logo from 'assets/images/logo.png'

class Password extends Component{
    state = {password: '', newPassword:''}
    onChange = e =>this.setState({[e.target.name]:e.target.value,error:null})
    onSubmit = e =>{
        e.preventDefault()
        let data = {
            password: this.state.password,
            newPassword: this.state.newPassword
        }
        
        axios.post(`${process.env.REACT_APP_SERVER}/api/account/password`, data).then(
            res=> {
                
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
                    <h5 className='mb-4'>تغيير كلمة المرور</h5>
                    <Error error={this.state.error}/>
                    
                    <Input type="password" value={this.state.password} name='password'onChange={this.onChange} placeholder="كلمة السر القديمة" required/>
                    <Input type="password" value={this.state.newPassword} name='newPassword'onChange={this.onChange} placeholder="كلمة السر الجديدة" required/>
                    <Button block className="mb-3">تغيير</Button>
                    <small><Link to='/login'>عودة</Link></small>
                    <p className="m-3 text-muted">&copy; 2018 - 2019</p>                   

                </Form>

            </Card>
        );
    }

}
export default Password