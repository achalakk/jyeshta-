import React, { Component } from 'react';
import { Text, View ,StyleSheet,SafeAreaView,Image,ImageBackground,item,image,imageStyle} from 'react-native';
import FlipPage, { FlipPagePage } from 'react-native-flip-page';
import { Ionicons } from '@expo/vector-icons'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import * as Font from 'expo-font';
import {COMMONPATH} from "../core/utils";

export default class Blog extends Component{
    constructor(props) {
        super(props);
       
    
        //setting default state
        this.state = { loading: true,blogsdata:[]};
      }
      
    getblogs(){
        fetch(COMMONPATH+'other/getblogs',{//http://localhost/jyeshta/api/v1/other/getbanner', {
          method: 'GET'
       })
       .then((responses) => responses.json())
       .then((responseJsons) => {
         
          this.setState({
            blogsdata: responseJsons.map(item => ({
              message: item.message,
              image:item.image
              //image: item.url,
             
          }))
        })
      })
       .catch((error) => {
          console.error(error);
       });
      }
      componentDidMount = () => {
        Font.loadAsync({
          'Poppins': require('../assets/fonts/Poppins-Medium.ttf'),
          'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
          
        })  
      
     this.getblogs();
     console.log(this.state.blogsdata);
         
   }
   
  
    render(){
     
     
    return (
        <View style={{flex: 1}}>
         
                <FlipPage loopForever>
                {
                this.state.blogsdata.map((item) => (
                  {
                          if(item) {
            
        <FlipPagePage>
        <View style={styles.page1}>
                       <View style={{ justifyContent:"center"}}> 
                       <Image source={require('../assets/user.jpg')} resizeMode="contain" style={styles.flipimage}></Image>
                       
                       
                       </View>	
                    <View style={styles.fliptext}> 

                             <Text style={{fontSize:16}}>{item.message} </Text>
                             <Text style={styles.icon}> 						
                        <Ionicons name='ios-copy' size={22} color='#222' />

                        </Text> 
                        </View>
                       
                    
                </View>
        </FlipPagePage>
            }
          }
        ))}
          
  
          
         
         
        </FlipPage>
       
      </View>

    );
  }
  }
  const styles = StyleSheet.create({
    container: {
    
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
           
          },
          page1: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          },
         
          flipimage:{
            width:wp ("100%"),   
            height: hp("40%"),
            backgroundColor : "#fff",
            justifyContent :"space-between",
            resizeMode :'cover'
            

          },
         
          fliptext:{
            width:wp ("100%"),   
            height: hp("60%"),
            backgroundColor : "#dedede",
            padding : 15,
            fontFamily : "Poppins-Regular",
            overflow: "scroll", 
          },
         icon: {

         
  justifyContent: 'flex-end',
  alignSelf :"flex-end",
  
  bottom: 10,
         },
         
          

  });
  
  //export default ProfileScreen;