import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import Animationscreen from '../components/animationscreen'

const Quiz = ({route}) => {
  const {url} = route.params;
  const navigation= useNavigation();
  const [questions,setquestions] = useState();
  const [quesno,setquesno] = useState(0);
  const [options,setoptions] = useState([]);
  const [score,setscore] = useState(0);
  const [correctoption,setcorrectoption] = useState(null);
  const [incorrectoption,setincorrectoption] = useState(null);
  const [loading,setloading] = useState(false);
  useEffect(()=>{
    getQuiz();
  },[])
  const getQuiz = async()=> {
    setloading(true);
    const url_receive = url;
    const response = await fetch(url_receive);
    const data = await response.json();
    setquestions(data.results);
    setoptions(generateandShuffleoptions(data.results[0]));
    setloading(false);

  }
  const handleNextquestion = () => {
    setquesno(quesno+1);
    setoptions(generateandShuffleoptions(questions[quesno+1]));
  }
  const shuffleArray =(array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }
  const generateandShuffleoptions = (_question) => {
    const opt = [..._question.incorrect_answers];
    opt.push(_question.correct_answer)
    shuffleArray(opt);
    return opt;
  }
  const handleshowresult = ()=> {
    navigation.navigate('Result',{score:score});
  }
  const findcorrectoptionindex = ()=> {
    var i= null;
    for(i=0;i<options.length;i++){
      if(questions[quesno].correct_answer==options[i])
      {
        break;
      }
    }
    return i;

  }
  const skipfunction = ()=> {
      setincorrectoption(null);
      setcorrectoption(null);
      handleNextquestion();
  }
  const Buttonmodule = ({index})=> {
    return (
      <TouchableOpacity style={styles.optionbutton}  onPress={()=>handleselectedoption(options[index],index)}>
      <View style={styles.optionbuttoninnercontainer}>
      <Text style={styles.optiontext}>{decodeURIComponent(options[index])}</Text>
      {correctoption===index ? (<MaterialCommunityIcons name='check' size={18} color='green'/>)
      :  incorrectoption===index ? (<MaterialCommunityIcons name='close' size={18} color='red'/>) :null
      }
      </View>
      </TouchableOpacity>
    )
  }
  const handleselectedoption = (opt,index) => { 

    if(opt===questions[quesno].correct_answer){
      setcorrectoption(index);
     // console.log('correct',opt,'index',index);
      setscore(score+10);
    }
    else{
    //  console.log('incorrect',opt,'index',index);
      setcorrectoption(findcorrectoptionindex());
      setincorrectoption(index);     
    }
    if(quesno!==9){
  
      setTimeout(() => {
        setincorrectoption(null);
        setcorrectoption(null);
        handleNextquestion();
        }, 2000);
      
    }
    if(quesno===9){
      handleshowresult();
    }
 

  }
  return (
    <View style={styles.container}>
      {loading? <Animationscreen screen={'loading'} screentitle={'Loading...'}/> : questions && (
      <View style={styles.parent}>
      <View style={styles.top}>
      <Text style={styles.question}>Q{quesno+1}. {decodeURIComponent(questions[quesno].question)}</Text>
      </View>
      <View style={styles.options}>
        <Buttonmodule index={0}/>
        <Buttonmodule index={1}/>
        <Buttonmodule index={2}/>
        <Buttonmodule index={3}/>
      </View>
      <View style={styles.bottom}>
        {quesno!==9 ? 
        <TouchableOpacity style={styles.button} onPress={skipfunction}>
          <Text style={styles.buttontxt}>Skip</Text>
        </TouchableOpacity>
          :  <TouchableOpacity style={styles.button} onPress={handleshowresult}>
          <Text style={styles.buttontxt}>Show Result</Text>
        </TouchableOpacity>  }
      </View>
      </View>
      )}


    </View>
  )
}

export default Quiz

const styles = StyleSheet.create({
  container:{
    padding:12,
    height:'100%',
    backgroundColor:'white'
  },
  top:{
    marginVertical:16,
  },
  options:{
    marginVertical:16,
    flex:1,
  },
  bottom:{
    marginBottom:12,
    paddingVertical:16,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  button:{
    backgroundColor:'#1A759F',
    padding:16,
    paddingHorizontal:26,
    borderRadius:16,
    alignItems:'center',
    width:'100%',
  },
  buttontxt:{
    fontSize:24,
    color:'white',
    fontWeight:'600',
  
  },
  question:{
    fontSize:26,
    fontWeight:'600',
    color:'black',
  
  },
  optiontext:{
    fontSize:16,
    color:'white',
    fontWeight:"500",
  
  },
  optionbutton:{
    width:'100%',
    paddingVertical:12,
    paddingHorizontal:12,
    marginVertical:6,
    borderRadius:12,
    backgroundColor:"#34A0A4"
  },
  optionbuttoninnercontainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  optionbuttonred:{
  borderColor:'red',
  borderWidth:5,
  },
  optionbuttongreen:{
    borderColor:'green',
    borderWidth:5,
  },
  parent:{
    height:'100%'
  },
  validoption:{
    backgroundColor:"green",
  },
  invalidoption:{
    backgroundColor:"#34A0A4",
  },
  loadingcontainer:{
    display:"flex",
    justifyContent:'center',
    alignItems:'center',
    height:'100%'
  },
  loadingtext:{
    color:'black',
    fontSize:36,
    fontWeight:'600', 
   
  }

})