import { StyleSheet, Text, TouchableOpacity, View,KeyboardAvoidingView } from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import Lottie from 'lottie-react-native';
import {data} from '../Apidata/dropdowndata'
import {SelectList} from 'react-native-dropdown-select-list'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Title from '../components/title';

const Home = ({navigation}) => {
  const animationRef = useRef();
  const [selected, setSelected] = useState([]);
  const icon = require('../assets/askanimation.json');
  return (
    <View style={styles.Container}>
      <Title title={'Quizzler'}/>
      <View style={styles.imgContainer}>
        <Lottie 
          style={styles.img}
          ref={animationRef}
          source={icon}
          loop={true}
          autoPlay={true}
        />
      </View>
      <View style={{marginTop:20,marginBottom:10,height:'25%'}}>
      <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save='key'
        maxHeight={100}
        search={false}
        arrowicon={<FontAwesome name="chevron-down" size={12} color={'white'} />}
        boxStyles={{flexDirection:'row',justifyContent:'space-around',width:'100%',backgroundColor:'#1A759F',padding:16,borderRadius:16,
        alignItems:'center'}}
        inputStyles={{ fontFamily: 'Cochin',fontSize:22,color:'white',fontWeight:'600'}}
        defaultOption={ {index:'8', value:'Any Category', key:'https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986'}}
        /> 
      <TouchableOpacity 
      style={styles.button}
      onPress={()=> navigation.navigate('Quiz',{url:selected})}>
        <Text style={styles.buttontxt}>Start</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  Container:{
    backgroundColor:'white',
    height:'100%'
  }
  ,
  imgContainer:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    flex:1,
  },
  img:{
    width:300,
    height:300
  },
  button:{
    width:'100%',
    backgroundColor:'#1A759F',
    padding:16,
    borderRadius:16,
    alignItems:'center',
    marginBottom:30,
    marginTop:20,
  },
  buttontxt:{
    fontSize:24,
    color:'white',
    fontWeight:'600',
  
  },

})