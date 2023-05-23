import React, { Component } from 'react'

import Strings from '../config/strings'
import {KeyboardAvoidingView, Image, Toast,Container, View,Text,Input,Button,Icon,Box} from 'native-base'
import Styles from './styles/auth'
import companyLogo from '../assets/images/logo.png'
import Axios from '../config/axios'

export default class LoginScreen extends Component{
    //توابع التحكم

    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:""
        }
    }
    onUsernameChange = username => this.setState({username});
    onPasswordChange = password => this.setState({password});

    validate(){
        keyboard.dismiss();
        if(!this.state.username) {
            Toast.show({text:Strings.USERNAME_REQUIRED,type:"danger"});
            return false
        }
        if(!this.state.password) {
            Toast.show({text:Strings.PASSWORD_REQUIRED,type:"danger"});
            return false;
        }
        return true;
    }

    //send requist to server
    login = async() => {
        if(!this.validate()) return;
        let data = {username:this.state.username,password:this.state.password};
        try{
            let response = await Axios.post(Urls.AUTH_URL, data)
            alert(JSON.stringify(response.data));
        }
        catch(e){
            Toast.show({text: e.response.message,type:"danger"});
        }
    }

    navToRegister = () => this.props.navigation.navigate('Register',{msg:"hello"});
    render() {
        return(
          
            
              <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
              
                <View style={Styles.logoContainer}>
                  <Image
                  style={Styles.logo}
                  source={companyLogo}
                  resizeMode="contain"
                  alt=""
                  />
                </View>
                <View>
                  <Text style={Styles.title}>{Strings.LOGIN}</Text>
                  <Box  style={Styles.inputItem}>
                    <Input
                        style={Styles.input}
                        placeholder={Strings.USERNAME_PLACEHOLDER}
                        onChangeText={this.onUsernameChange}/>
                    <Icon name="person" style={Styles.icon}/>
                 </Box>
                  <Box  style={Styles.inputItem}>
                    <Input
                        style={Styles.input}
                        placeholder={Strings.PASSWORD_PLACEHOLDER}
                        secureTextEntry={true}
                        onChangeText={this.onPasswordChange}/>
                    <Icon name="lock" style={Styles.icon}/>
                  </Box>
                  <Button  info block style={Styles.button} onPress={this.login}>
                     <Text>{Strings.LOGIN}</Text>
                  </Button>

                  <Button  dark block style={Styles.button} onPress={this.navToRegister}>
                     <Text>{Strings.CREATE_NEW_ACCOUNT}</Text>
                  </Button>
                </View>
             
              </KeyboardAvoidingView>
            
            
        )
    }
}
