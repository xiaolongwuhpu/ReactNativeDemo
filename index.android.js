import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    Text,
    Image,
    TouchableHighlight,DeviceEventEmitter,
    View,Platform,ToastAndroid,NativeModules,TouchableOpacity
} from 'react-native';
// import { Navigation } from 'react-native-navigation';
import NavigationBar from './NavigationBar';
import FirstP from './firstpage';
import FirstPageComponent from './FirstPageComponent';
import SecondPageComponent from './SecondPageComponent';
import ThreePageComponent from './ThreePageComponent';
import NavigationBar2 from './common/NavBarCommon.js';
import backIcon from './res/btn_back@2x.png'
class First extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            user: 'wujing',
            pwd: '000000',
           isfirst:true,
           comname :1,
           customComponent:null
        }
    }

   getData() {  
       let mthis = this;
    //    const navigator = this.refs.navigator;
    //    ToastAndroid.show('navigator:' + navigator, ToastAndroid.SHORT);  
       NativeModules.IntentModuleAndroid.dataToJS((msg) => { 
              console.log(msg);  
              mthis.receiveNativeMsg(msg);
                  
          },  
          (result) => {  
              ToastAndroid.show('JS界面:错误信息为:' + result, ToastAndroid.SHORT);  
          })  
  }  
        componentDidMount() {
            // this.getData();
        }

    componentWillMount() {
        this.getData();
        // DeviceEventEmitter.addListener('NativeMessage', this.receiveNativeMsg.bind(this));
    }

      receiveNativeMsg(message) {
          if(message){
var strs = message.split("=");
        this.setState({user: strs[1], pwd: strs[2], comname: strs[0]})
        const navigator = this.refs.navigator;
        if (navigator) { 
             if(strs[0]=='4'){
                //   ToastAndroid.show('更改后用户信息是:  ' + strs[0]+"=="+strs[1]+"=="+strs[2], ToastAndroid.SHORT);   
                            navigator.push({  
                            name: 'otherPage',  
                            component: SecondPageComponent,
                            Props:{  
                            user:strs[1],  
                            pwd:strs[2]  
                          }    
                        })  
             }
               
            }
          }
        
    }
 

/**
   * 使用动态页面加载
    */
  renderScene(route, navigator) {
    return <route.component navigator={navigator}  {...route.Props} />;
  }

  /**
   * 配置场景动画
    */
  configureScene(route, routeStack) {
    if (route.type == 'Bottom') {
      return Navigator.SceneConfigs.FloatFromBottom; // 底部弹出
    }
    return Navigator.SceneConfigs.FloatFromRight; // 右侧弹出
  }
  render() {

    let   defaultName = 'firstpage';
    let   defaultComponent = FirstPageComponent;
    return (
      <Navigator
        style={{flex:1}}
        ref='navigator'
        initialRoute={{name: defaultName,component: defaultComponent}}
        configureScene={this.configureScene}
        renderScene={this.renderScene}

        
        navigationBar = { 
            /*<NavigationBar2 title={'图片详情'} leftImage={ backIcon } leftAction={ this._backToFront.bind(this) } rightTitle={'去看图文详情'} rightImage={ backIcon } rightAction={ this._toAnotherDetail.bind(this) } />*/
            
            < Navigator.NavigationBar style = {styles.style_navigatorbar}

             routeMapper = {{
                    LeftButton(route, navigator, index, navState) {
                            if (index > 0) {
                                    return (
                                        <View style={styles.style_image}>
                                    <TouchableHighlight  onPress={() => {
                                        if (index > 0) {
                                            navigator.pop();
                                        }
                                    } }>
                                       <Image style={{  marginBottom:15, alignItems: 'center' }}  source={require('myapp/res/btn_back02@2x.png')}/>
                                    </TouchableHighlight></View>
                                )
                            } else {
                                return null
                            }
                        },

                   Title: (route, navigator, index, navState) =>
                     { 
                         var mtitle = '登录界面';
                           if(index==1){
mtitle = '用户信息';
                    }else if(index ==2){
mtitle = '用户信息';
                    }else if(index == 3){
mtitle = '用户信息';
                    }
                  
                         
                         return ( 
                                     <TouchableOpacity style={{ flex: 1,flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ color: 'black', fontWeight:"300",textAlign:'center',alignItems: 'stretch', paddingTop:23,marginLeft:65, fontSize: 22,}}>
                  {mtitle}
        </Text>
            </TouchableOpacity>
                                    ); },

                    RightButton: (route, navigator, index, navState) =>
                    { return (   <TouchableOpacity style={{ flex: 1,flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={{ color: 'black', textAlignVertical:'center',marginBottom:15, alignItems: 'center',textAlign:'center', fontSize: 16 }}>
                   设置
        </Text>
            </TouchableOpacity>); },
                   
                }}

                />
            }
        />
    );
  }
  

    _backToFront() {  
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
AppRegistry.registerComponent('First', () => First);


const styles = StyleSheet.create({  
  style_image:{  
     flex: 1, justifyContent: 'space-around' 
    
  },  
    style_navigatorbar:{  
     backgroundColor: '#63B8FF',
     height:38,  
  },  
    style_titletext:{  
        justifyContent: 'center', 
    fontSize:20,
    color:'#ffffff',
    backgroundColor:'green',
  alignItems:'center'
  },  
  style_titlesetting:{  

        fontSize:16,
        backgroundColor:'yellow',
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
 
  style_view_unlogin:{  
    fontSize:15,  
    color:'#63B8FF',  
    marginLeft:10,  
  },  
 
});  