import { StyleSheet, Text, View ,StatusBar,LogBox} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import MyStack from './screens/mystack'
LogBox.ignoreAllLogs();
const App = () => {
  return (
    <View style={styles.container}>
     <StatusBar backgroundColor = "#1A759F" hidden = {false}/>
      <NavigationContainer>
      <MyStack/>
      </NavigationContainer>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:10,
    paddingHorizontal:16,
    backgroundColor:'white'
  }
})