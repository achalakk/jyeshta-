// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, { Component } from 'react';
import { ScrollView,TouchableOpacity, StyleSheet,Button, View,style, Text, SafeAreaView,KeyboardAvoidingView,TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

//const Uploadblog = ({ route, navigation }) => {
  export default class Uploadblog extends Component{
  
    constructor(props) {
      super(props);
     
  
      //setting default state
      this.state = {image:'',message:'',LocalImage:[], multipleUrl:[]};
    }
    
    showProgressBar= () => {
      this.setState({loading: true})
    };
    hideProgressBar= () => {
      this.setState({loading: false})
    };
    componentDidMount() {
      this.getPermissionAsync()
   }
   getPermissionAsync = async () => {
    if (Constants.platform.ios) {const { status } = await  Permissions.askAsync(Permissions.CAMERA_ROLL)
if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this  work!')
     }
}
}
_pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    base64:true,
    aspect: [4, 3]
    //quality: 1
  });
  let imageUri = result ?   `data:image/jpg;base64,${result.base64}` : null
  //imageUri && {uri: imageUri}
  this.state.multipleUrl.push(imageUri)
   this.setState({
LocalImage: this.state.LocalImage.concat([result.uri]),type:result.type,show:true,visible:false
})

console.log(this.state.LocalImage);
}
_pickImage = async () => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    base64: true,
    allowsEditing: true, 
    aspect: [4, 3],
  })
let imageUri = pickerResult ?   `data:image/jpg;base64,${pickerResult.base64}` : null
   imageUri && {uri: imageUri}
   this.state.multipleUrl.push(imageUri)
    this.setState({
LocalImage: this.state.LocalImage.concat([pickerResult.uri]),
})
}
_takePhoto = async () => {
const {
status: cameraPerm
} = await Permissions.askAsync(Permissions.CAMERA)
const {
status: cameraRollPerm
} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
// only if user allows permission to camera AND camera roll
if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
let pickerResult = await ImagePicker.launchCameraAsync({
     base64: true,
     allowsEditing: true,
     aspect: [4, 3],
})
if (!pickerResult.cancelled) {
   let imageUri = pickerResult ?     `data:image/jpg;base64,${pickerResult.base64}` : null
this.state.multipleUrl.push(imageUri)
this.setState({
LocalImage: this.state.LocalImage.concat([pickerResult.uri]),
    })
}
 }
}
_renderImages() {
  let images = []
  this.state.LocalImage.map((item, index) => {
     images.push(
       <Image  key={index} source={{ uri: item }}  style={{ width:   100, height: 100 }} />
       )
     })
  return images
}


    render(){
   
      const { navigate } = this.props.navigation;
     
return (
  <SafeAreaView style={{ flex: 1 }}>
  <View style={{ flex: 1, padding: 16 }}>
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          marginBottom: 16
        }}>
        Upload Your Blog
      </Text>
      <TextInput
               multiline={true}
              numberOfLines={10}
               underlineColorAndroid = "transparent"
               placeholder = "Message"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
              />
           <View >
                 <Button title="Pick an image from camera roll"  onPress={this._pickImage}/>
           </View>
           <View>
                 <Button onPress={this._takePhoto} title="Take a photo" />
           </View>
           
            <View>
              {this._renderImages()}
             </View>


      {/*<TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text>Go to Home Tab</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Details')}>
        <Text>Open Detail Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}>
        <Text>Open Profile Screen</Text>
      </TouchableOpacity>*/}
    </View>
     </View>
</SafeAreaView>
 );
};
  }
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  input: {
    margin: 15,
    height: 200,
    borderColor: '#7a42f4',
    width:300,
    borderWidth: 1,
    textAlignVertical:top
 },
});
//export default Uploadblog;