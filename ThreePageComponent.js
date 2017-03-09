 import React, { Component ,PropTypes} from 'react';
 import {
     AppRegistry,StyleSheet, Text,Image,View,TextInput,DeviceEventEmitter,NativeModules,ToastAndroid,
     requireNativeComponent,processColor  
     }from 'react-native';
//如果当前的js和circle.js为同级目录的话，就如下调用，后面不用写成from 'circle.js'!!!
 import Circle from './mycircle';
 import SecondPageComponent from './SecondPageComponent';
 import TouchableButton from './TouchableButton';

 export default class ThreePageComponent extends Component {
     constructor(props) {
         super(props);
         this.state = {
             user: null,
             pwd: null
         };
     }
     componentWillMount() {
         DeviceEventEmitter.addListener('EventName', function(msg) {
             console.log(msg);
             ToastAndroid.show("DeviceEventEmitter收到消息:" + "\n" + msg.key2, ToastAndroid.SHORT)

         });
     }
     componentDidMount() {
         //这里获取从secondpagecomponent传递过来的参数: id  
         this.setState({
             user: this.props.user,
             pwd: this.props.pwd
         });
     }

  
     render() {
             return (
     <View style = {{ backgroundColor: '#f4f4f4', flex: 1 ,justifyContent:'space-between',}} >
       <View style = {styles.style_customview} >
<Circle                    
            style={{width: 100, height: 100}}
            roundwidth ={25}
            progress ={88}
                         
                    />
        </View>
         
         <View   >
                 <TouchableButton 
                        style = {styles.style_view_b}
                        underlayColor = '#4169e1'
                        onPress = { this._pressButton.bind(this) }
                        size={17} 
                        text = '返回上页' >
                 </TouchableButton>   
          </View> 
               
     </View>  
             );
         }

     _pressButton() {
         const { navigator } = this.props;
         if (navigator) {
             navigator.pop();
         }
     }
 
    }

 const styles = StyleSheet.create({
     style_customview: {
         borderRadius: 45,
         height: 100,
         width: 100,
         marginTop: 100,
         alignSelf: 'center',
     },
       style_image: {
         borderRadius: 45,
         height: 60,
         width: 60,
         marginTop: 40,
         alignSelf: 'center',
     },
     style_user_miaoshu: {
         fontWeight: 'bold',
         height: 45,
         width: 80,
         fontSize: 15,
         alignSelf: 'center',
         textAlign: 'center',
         textAlignVertical: 'center'
     },
     style_view: {
         backgroundColor: '#fff',
         marginRight: 10,
         marginLeft: 10,
         height: 45,
     },
     style_user_input: {
         backgroundColor: '#fff',
         height: 45,
         flex: 1,
         textAlign: 'center',
         textAlignVertical: 'center'

     },
          
      style_view_b: {
         marginTop: 15,
         marginLeft: 10,
         marginRight: 10,
         marginBottom:20,
         backgroundColor: '#63B8FF',
         borderColor: '#5bc0de',
         height: 45,
         borderRadius: 25,
         justifyContent: 'center',
         alignItems: 'center',
     },
    
 });
AppRegistry.registerComponent('ThreePageComponent', () => ThreePageComponent);
//  export default SecondPageComponent