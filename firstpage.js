import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity
} from 'react-native';
import secondp from './secondpage';

export default class FirstPage extends Component {

constructor(props){
super(props);
this.state = {
      myname:'me-wj',
  age:27,
  QQ:null
}
}
/**接收传递过来的参数 */
  componentDidMount(){
      this.setState({
          QQ : this.props.QQ
      })
  }
render() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        第一页，我要把我的姓名、年龄传递给第二个页面，再从第二个页面把我的QQ号传回来
      </Text>
      <Text style={styles.instructions}>
        我的姓名：{this.state.myname}
      </Text>
      <Text style={styles.instructions}>
        我的年龄：{this.state.age}
      </Text>
      <Text style={styles.instructions}>
        我的QQ：{this.state.QQ}
      </Text>


      <Text
        style={{
        color: 'red',
        fontSize: 30
      }}
        onPress={this.gotoSecondPage}>
        点击我查询我的QQ
      </Text>
        </View>
  );
}

gotoSecondPage = () => {
  const {navigator} = this.props;
  if (navigator) {
    navigator.push({
      name: 'second',
      component: secondp,
      params: {
        myname: this.state.myname,
        age: this.state.age,
        getQQ: (qq) => {
          this.setState({QQ: qq})
        }
      }
    });
  }
}
}

AppRegistry
.registerComponent('FirstPage', () => FirstPage);

const styles = StyleSheet
.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF'
},
welcome: {
  fontSize: 15,
  textAlign: 'center',
  margin: 10,
  color:'orange',
  backgroundColor:'gray'
},
instructions: {
  textAlign: 'center',
  color: '#333333',
  marginBottom: 5
}
});


