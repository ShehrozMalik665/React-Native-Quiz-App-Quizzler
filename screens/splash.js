import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animationscreen from '../components/animationscreen'
const Splash = () => {
  return (
    <View style={styles.container}>
      <Animationscreen screen={'splash'} screentitle={'Welcome to Quizzler'}/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        height:'100%',
    },
    animationContainer:{
      justifyContent:'center',
      alignItems:'center',
      flex:1,
    },
    animation:{
        width:300,
        height:380,
    },
    bottom:{
      marginVertical:20,
    }
})