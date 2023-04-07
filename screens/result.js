import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import Lottie from 'lottie-react-native';
import Title from '../components/title';

const Result = ({navigation,route}) => {
  const {score} = route.params;
  const animationRef = useRef();
  const titlestr = 'Score: '+ score.toString()+'/100';
  const icon = score>=50 ? require('../assets/happyanimation.json') : require('../assets/sadanimation.json');
  return (
    <View style={styles.Container}>
      <Title title={titlestr}/>
      <View style={styles.imgContainer}>
      <Lottie 
      style={styles.img}
      ref={animationRef}
      source={icon}
      loop={true}
      autoPlay={true}
      />
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.button}>
        <Text style={styles.buttontxt}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Result

const styles = StyleSheet.create({
  Container:{
    backgroundColor:'white',
    flex:1,
  }
  ,
  imgContainer:{
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
  img:{
    width:300,
    height:300,
  },
  button:{
    width:'100%',
    backgroundColor:'#1A759F',
    padding:16,
    borderRadius:16,
    alignItems:'center',
    marginBottom:30,
  },
  buttontxt:{
    fontSize:24,
    color:'white',
    fontWeight:'600',

  },
})