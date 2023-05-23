import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Strings from '../config/strings'
class HomeScreen extends Component {
   render() {
       return (
           <View style={styles.container}>
               <Text>{Strings.TITLE_CONTACTS}</Text>
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

export default HomeScreen;
