import React from 'react';
import {StyleSheet} from 'react-native'
import {w,h} from '../../api/Dimention'
import Colors from '../../config/colors'

const Styles =  StyleSheet.create({
    logoContainer: {
        backgroundColor: Colors.GREY
    },
    logo:{
        alignSelf:'center',
        width:w(20),
        height:h(20),
        marginTop:h(10),
        marginBottom:h(10)
    },
    title:{
        color: Colors.GREY,
        fontSize:20,
        marginBottom:20
    },
    input:{
        heihjt:45,
        textAlign:'right'
    },
    form:{
        alignItem:'center',
        textAlign:'center',
        margin:20
    },
    inputItem:{
        marginBottom: 20,
        paddingLeft:20,
        paddingRight:20
    },
    button:{
        alignSelf:'center',
        marginBottom:20,
    }
})
export default Styles