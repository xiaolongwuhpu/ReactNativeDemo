import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

export default class secondpage extends Component {
    constructor(props){
        super(props);
        this.state = {
            myname:this.props.myname,
            age:this.props.age,
            QQ:1179917630
        }
    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          第二页，把他的QQ号告诉他
        </Text>
        <Text style={styles.instructions}>
          我的姓名：{this.props.myname}
        </Text>
        <Text style={styles.instructions}>
          我的年龄：{this.props.age}
        </Text>
        <Text style={styles.instructions}>
          我的QQ：{this.state.QQ}
        </Text>
         <Text style={{color:'red',fontSize:30}} onPress={this.gotoFirstPage}>
          回到上一页
        </Text>
      </View>
    );
  }
  
  gotoFirstPage=()=>{
    const {navigator} = this.props;
    let QQ = this.state.QQ;
    this.props.getQQ(QQ);
    if(navigator){
        navigator.pop();
    }
}
}


AppRegistry.registerComponent('secondpage', () => secondpage);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

