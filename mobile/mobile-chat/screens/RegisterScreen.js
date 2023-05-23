import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Strings from '../config/strings'
class RegisterScreen extends Component {
   constructor(props){
    super(props)
    let msg = props.navigation.getParam('msg')
    alert(msg)
   }
   
    render() {
       return (
           <View style={styles.container}>
               <Text>{Strings.CREATE_NEW_ACCOUNT}</Text>
           </View>
       );
   }
}

const styles = {
   container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
   },
};

export default RegisterScreen;
