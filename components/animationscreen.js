import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import Lottie from 'lottie-react-native';
import Title from './title';

import { useNavigation } from '@react-navigation/native';
const Animationscreen = ({screen,screentitle}) => {
  const navigation = useNavigation();
  const animationRef = useRef();
  const icon = screen==='loading' ? require('../assets/loadinganimation.json') : require('../assets/animation.json');
  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
    {screen==='loading' ?
      <Lottie 
      style={styles.animation}
      ref={animationRef}
      source={icon}
      loop={false}
      autoPlay={true}
      />:
      <Lottie 
      style={styles.animation}
      ref={animationRef}
      source={icon}
      loop={false}
      autoPlay={true}
      onAnimationFinish={()=>navigation.navigate('Home')}
      />  
      }
      <View style={styles.bottom}>
      <Title title={screentitle}/>
      </View>
      </View>
    </View>
  )
}

export default Animationscreen

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