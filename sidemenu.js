//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ImageBackground} from 'react-native';
import { Icon } from 'react-native-elements';

export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    //Setting up the Main Top Large Image of the Custom Sidebar
    this.proileImage =
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Faboutreact.com%2Fcustom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options%2F&psig=AOvVaw2bpA79ZIStPXzj-ADfT71B&ust=1603004188672000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOC83oyGu-wCFQAAAAAdAAAAABAD';
    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/
    this.items = [
      {
        navOptionThumb: 'person',
        navOptionName: 'Profile',
        screenToNavigate: 'NavScreen1',
      },
      {
        navOptionThumb: 'timeline',
        navOptionName: 'People Pulse',
        screenToNavigate: 'NavScreen2',
      },
      {
        navOptionThumb: 'games',
        navOptionName: 'Hidden Talent',
        screenToNavigate: 'NavScreen3',
      },
      {
        navOptionThumb: 'loyalty',
        navOptionName: 'Offers',
        screenToNavigate: 'NavScreen3',
      },
      {
        navOptionThumb: 'call',
        navOptionName: 'Support',
        screenToNavigate: 'NavScreen3',
      },
      {
        navOptionThumb: 'business',
        navOptionName: 'About Jyeshta',
        screenToNavigate: 'NavScreen3',
      },
      {
        navOptionThumb: 'translate',
        navOptionName: 'Languages',
        screenToNavigate: 'NavScreen3',
      },
    ];
  }
  render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}

        <Image style={styles.sideMenuProfileIcon} 
             source={require('./assets/user.jpg')} />
         <Text style={styles.titlemd}> Vamsi Krishna </Text>

        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#dedede',
            marginTop: 15,
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 25,
                paddingBottom: 10,
                backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#391f5c',
              }}
              key={key}>
              <View style={{ marginRight: 10, marginLeft: 30 }}>
                <Icon name={item.navOptionThumb} size={25} color="#dedede" />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: global.currentScreenIndex === key ? 'red' : '#fff',
                }}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionName}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#391f5c',
    alignItems: 'center',
    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    width: 100,
    height: 100,
    marginTop: 40,
    borderRadius: 150 / 2,
  },
  titlemd : {
    fontSize : 20,
    color : "#fff",
    marginTop:10,
    fontWeight: "700",
    marginBottom: 40,
  }
});