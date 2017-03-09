import React, { Component } from 'react';
import {
    AppRegistry,  
      StyleSheet,  
    Text,  
    Image,  
    View,  
    TextInput  ,ToastAndroid,NativeModules,
} from 'react-native';
 
  
import SecondPageComponent from './SecondPageComponent';  
   import TouchableButton from './TouchableButton';  
   import ThreePageComponent from './ThreePageComponent'; 
   import NavigationBar from './NavigationBar.js'
    
       /* <NavigationBar  
            title='这个是标题'  
            leftImageSource={require('myapp/res/btn_back02@2x.png')}  
            rightItemTitle='按钮'  
            rightTextColor='#3393F2'  
            leftItemFunc={this._leftItemAction.bind(this)}  
    rightItemFunc={this._rightItemAction.bind(this)}/> 
    */
class FirstPageComponent extends React.Component {  
  
    constructor(props) {  
        super(props);  
        this.state = {};  
    }  

 
 _leftItemAction() {  
    console.log('左侧按钮点击了');  
  }  
  
  _rightItemAction() {  
    console.log('右侧按钮点击了');  
  }
   
    componentWillMount(){
            // this.getData();
    }

    componentDidMount2() { 
       
               let id = base.columnID; 
               ToastAndroid.show('Did:' + id, ToastAndroid.SHORT);  
                if (id == "3") {  
                    const { navigator } = this.props;  
                     ToastAndroid.show(':' + navigator, ToastAndroid.SHORT);
                    if (navigator) {  
                        navigator.push({  
                            name: 'secondPage',  
                            component: secondPage,  
                        })  
                    }  
                } 
                else if (id == "4") {  
                    const { navigator } = this.props;  
                     ToastAndroid.show('navigator:' + navigator, ToastAndroid.SHORT);
                    if (navigator) {  
                        navigator.push({  
                            name: 'otherPage',  
                            component: ThreePageComponent,  
                    
                        })  
                    }  
                }  
             
            }
    render() {  
        return (  
            <View style={{backgroundColor:'#f4f4f4',flex:1}}>  
                <Image  
                    style={styles.style_image}  
                    source={require('./pro_pic.jpg')}/>  
                <TextInput  
                    style={styles.style_user_input}  
                    placeholder='QQ号/手机号/邮箱'  
                    numberOfLines={1}  
                    autoFocus={true}  
                    underlineColorAndroid={'transparent'}  
                    onChangeText={(text) => this.setState({user: text})}  
                    textAlignVertical='center'  
                    textAlign='center'/>  
                <View style={{height:5,backgroundColor:'#f4f4f4'}}/>  
                <TextInput  
                    style={styles.style_pwd_input}  
                    placeholder='密码'  
                    numberOfLines={1}  
                    underlineColorAndroid={'transparent'}  
                    onChangeText={(text) => this.setState({pwd: text})}  
                    secureTextEntry={true}  
                    textAlignVertical='center'  
                    textAlign='center'  
                />  
         
  
                <View style={{marginTop:20}}>  
                    <TouchableButton  
                        underlayColor='#4169e1'  
                        style={styles.style_view_button}  
                        onPress={this._pressButton.bind(this)} 
                                               
                        size={17} 
                        text='登录'>  
                    </TouchableButton>  
                </View>  
  
                <View style={{flex:1,flexDirection:'row',alignItems: 'flex-end',bottom:10}}>  
                     <Text style={styles.style_view_unlogin}>  
                         无法登录?  
                    </Text>  
                    <Text style={styles.style_view_register}>  
                         新用户  
                    </Text>  
                </View>  
          </View>  
        );  
    } 
      
    _pressButton() {  
        const { navigator } = this.props;  
        //或者写成 const navigator = this.props.navigator;  
        //为什么这里可以取得 props.navigator?请看上文:  
        //<Component {...route.params} navigator={navigator} />  
        //这里传递了navigator作为props  
        if(navigator) {  
            navigator.push({  
                name: 'SecondPageComponent',  
                component: SecondPageComponent,  
                Props:{  
                    user:this.state.user,  
                    pwd:this.state.pwd  
                }  
            })  
        }  
    }   
}  

const styles = StyleSheet.create({  
  style_image:{  
    borderRadius:45,  
    height:70,  
    width:70,  
    marginTop:40,  
    alignSelf:'center',  
  },  
  style_user_input:{  
      backgroundColor:'#fff',  
      marginTop:30,  
      height:45,  
  },  
  style_pwd_input:{  
      backgroundColor:'#fff',  
      height:45,  
  },  
  style_view_commit:{  
      marginTop:15,  
      marginLeft:10,  
      marginRight:10,  
      backgroundColor:'#63B8FF',  
      borderColor:'#5bc0de',  
      height:45,  
      borderRadius:5,  
      justifyContent: 'center',  
      alignItems: 'center',  
  },  
  style_view_button:{  
      marginTop:15,  
      marginLeft:10,  
      marginRight:10,  
      backgroundColor:'#63B8FF',  
      borderColor:'#5bc0de',  
      height:45,  
      borderRadius:25,  
      justifyContent: 'center',  
      alignItems: 'center',  
  },  
  style_view_unlogin:{  
    fontSize:15,  

    color:'#63B8FF',  
    marginLeft:10,  
  },  
  style_view_register:{  
    fontSize:15,  
    color:'#63B8FF',  
    marginRight:10,  
    alignItems:'flex-end',  
    flex:1,  
    flexDirection:'row',  
    textAlign:'right',  
  }  
});  
  
export default FirstPageComponent  