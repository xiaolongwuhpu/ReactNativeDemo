 import React, { Component } from 'react';
 import {
     AppRegistry,StyleSheet,Text,Image,Alert,View,   
    TextInput,DeviceEventEmitter, NativeModules, ToastAndroid,Platform
 } from 'react-native';

 import ThreePageComponent from './ThreePageComponent';
 import TouchableButton from './TouchableButton';
 // var TouchableButton = require('./module/TouchableButton');  
 function randomString(len) {　　
     len = len || 32;　　
     var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; 　
     var maxPos = $chars.length;　　
     var pwd = '';　　
     for (i = 0; i < len; i++) {　　
          pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　 }　　
          return pwd;
 }
 class SecondPageComponent extends React.Component {
     
     constructor(props) {
         super(props);
         this.state = {
             user: '111',
             pwd: '222'
         };
     }
     componentWillMount() {
         DeviceEventEmitter.addListener('EventName', (msg)=> {
             console.log(msg);
             if(msg.type == "2"){
  if(msg.EventEmitter){
        var musername = msg.EventEmitter.split("=")[1];
        var muserpsw = msg.EventEmitter.split("=")[2];

        this.setState({
            user:musername,
            pwd:muserpsw
        });
        // ToastAndroid.show("DeviceEventEmitter收到广播消息:" + "\n" + msg.EventEmitter, ToastAndroid.SHORT)
             }
             }else{
 ToastAndroid.show("收到消息:" + "\n" + msg.key2, ToastAndroid.SHORT)
             }
                        
         });
        
     }
     componentDidMount() {
         //这里获取从FirstPageComponent传递过来的参数: id  
         this.setState({
             user: this.props.user,
             pwd: this.props.pwd
         });
     }

     render() {
             return (
     <View style = {{ backgroundColor: '#f4f4f4', flex: 1 }} >
         <Image 
               style = { styles.style_image }
               source = {
                     { uri: 'http://img06.tooopen.com/images/20161214/tooopen_sy_190570171299.jpg' }
                 }
           />  
          <Text style = { styles.style_view_userinfo } > 用户详情信息 </Text> 
          <View flexDirection = 'row'  style = { styles.style_view } >
                <Text style = { styles.style_user_miaoshu } >用户名:</Text> 
                <Text style = { styles.style_user_input } > { this.state.user } </Text> 
                <View style = {{ height: 2, backgroundColor: '#f4f4f4' }}/>  
          </View>

          <View flexDirection = 'row' style = { styles.style_view } >
                <Text 
                      style = { styles.style_user_miaoshu }
                      flex = { 1 }
                      textAlignVertical = 'center'
                      textAlign = 'center' >
                      密码:
                 </Text>    
                 <Text style = { styles.style_user_input } > { this.state.pwd } </Text>  
          </View> 
          <View >
                 <TouchableButton 
                        underlayColor = '#4169e1'
                        style = { styles.style_view_button }
                        onPress = { this._pressButton.bind(this) }
                        color={'#ffffff'}
                        fontweight={'bold'}
                        size={17}
                        text = '返回登录页面' >
                 </TouchableButton>   
          </View> 
          <View 
               style = {{ height: 5, marginTop: 30, backgroundColor: '#f4f4f4' }}/>  
          <View >
                 <Text 
                        style = { styles.style_pwd_input }
                        onPress = { this.getDeviceEventEmitterTime.bind(this) } >
                        RCTDeviceEventEmitter获取时间 </Text>
                  <Text 
                        style = { styles.style_pwd_input }
                        onPress = { this.getCallBackTime.bind(this) } >
                        CallBack获取时间 </Text> 
                  <Text 
                        style = { styles.style_pwd_input }
                        onPress = { this.getPromiseTime.bind(this) } >
                        Promise获取时间 </Text> 
          </View> 
          <View 
                        style = {{ flex: 1, flexDirection: 'row', justifyContent:'space-between',alignItems: 'flex-end', bottom: 10 }} >
                 <TouchableButton 
                        style = { styles.style_view_update }
                        onPress = { this._pressupdate.bind(this) }
                        color = '#63B8FF'
                       fontweight={'bold'}
                        text = '修改用户信息' >
                 </TouchableButton>  
                     <TouchableButton 
                        style = { styles.style_view_update }
                        onPress = { this._presstoactivity.bind(this) }
                        color = '#63B8FF'
                        fontweight={'bold'}
                        text = '原生activity' >
                 </TouchableButton>  
                    <TouchableButton 
                        style = { styles.style_view_lookinfo }
                        onPress = { this._presslookinfo.bind(this) }
                        color = '#63B8FF'
                        fontweight={'bold'}
                        text = '信息完整度' >
                 </TouchableButton>  
          </View> 
     </View>  
             );
         }
         //    测试
     getDeviceEventEmitterTime() {
         NativeModules.TransMissonMoudle.getTime();
     }

     getCallBackTime() {
         NativeModules.TransMissonMoudle.callBackTime("Allure",
             (msg) => {
                 console.log(msg);
                 ToastAndroid.show("CallBack收到消息:" + "\n" + msg, ToastAndroid.SHORT)

             }
         );
     }

     getPromiseTime() {
         NativeModules.TransMissonMoudle.sendPromiseTime("Allure").then(msg => {
             console.log("年龄:" + msg.age + "/n" + "时间:" + msg.time);
             ToastAndroid.show("Promise收到消息:" + "\n" + "年龄:" + msg.age + "时间:" + msg.time, ToastAndroid.SHORT)

             this.setState({
                 age: msg.age,
                 time: msg.time,
             })
         }).catch(error => {
             console.log(error);
         });
     }



     _pressButton() {
         const { navigator } = this.props;
         if (navigator) {
             navigator.pop();
         }
     }
     _pressupdate() {
         var u = randomString(6);
         var p = randomString(9);
         this.setState({
             user: u,
             pwd: p
         });
     }
     _presstoactivity(){
           if (Platform.OS === 'android') {
             NativeModules.IntentModuleAndroid.startActivityFromJS("com.myapp.ui.User_Info_Activity","js中用户名 : "+this.state.user +'='+"js中密码 : "+this.state.pwd+"="+"我是从js传过来的标题","EventName");
        
            //  NativeModules.IntentModuleAndroid.startActivityFromJS("com.myapp.ui.User_Info_Activity","js中用户名 : "+this.state.user +'='+"js中密码 : "+this.state.pwd+"="+"我是从js传过来的标题");
     
      /*      NativeModules.IntentModuleAndroid.getDataFromIntent(function(msg){
                Alert.alert(msg);
            },function(err){  });
            */
     }/*else{
            
            var MessageViewManager = NativeModules.MessageViewManager;
            MessageViewManager.addEvent(2);
        }*/
     }
     _presslookinfo(){
  const { navigator } = this.props;  
        //或者写成 const navigator = this.props.navigator;  
        //为什么这里可以取得 props.navigator?请看上文:  
        //<Component {...route.params} navigator={navigator} />  
        //这里传递了navigator作为props  
        if(navigator) {  
            navigator.push({  
                name: 'ThreePageComponent',  
                component: ThreePageComponent,  
                params:{  
                    user:this.state.user,  
                    pwd:this.state.pwd  
                }  
            })  
        } 
     }
 }

 const styles = StyleSheet.create({
     style_image: {
         borderRadius: 45,
         height: 70,
         width: 70,
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
     style_pwd_input: {
         backgroundColor: '#fff',
         height: 45,
         textAlign: 'center',
         textAlignVertical: 'center'
     },
  
     style_view_button: {
         marginTop: 15,
         marginLeft: 10,
         marginRight: 10,
         backgroundColor: '#63B8FF',
         borderColor: '#5bc0de',
         height: 45,
         borderRadius: 25,
         justifyContent: 'center',
         alignItems: 'center',
     },
     style_view_update: {
         marginTop: 15,
         marginLeft: 10,
         marginRight: 10,
         borderColor: '#63B8FF',
         height: 30,
         borderRadius: 16,
        
         justifyContent: 'center',
         alignItems: 'center',
     },
        style_view_lookinfo: {
         marginTop: 15,
         marginRight: 10,
         borderColor: '#63B8FF',
         height: 30,
         borderRadius: 15,
      
         justifyContent: 'center',
         alignItems: 'center'
     },
     style_view_userinfo: {
         fontSize: 16,
         color: '#63B8FF',
         fontWeight: 'bold',
         marginTop: 15,
         marginLeft: 10,
         marginBottom: 20
     },

 });

 export default SecondPageComponent