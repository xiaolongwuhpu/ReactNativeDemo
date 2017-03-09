import React, { Component } from 'react';
import { 
  AppRegistry,  
    StyleSheet,  
  Text,  
  View,  
  TouchableHighlight,  
} from 'react-native';  
  
export default class TouchableButton extends Component {  
  render() {  
    return (  
        <TouchableHighlight  
        
          underlayColor={this.props.underlayColor}  
          activeOpacity={0.5}    
          style={this.props.style}  
          onPress={this.props.onPress}  
          >  
        <Text  style={{fontSize:this.props.size,color:this.props.color,fontWeight:this.props.fontweight,fontStyle:this.props.fontstyle}}>{this.props.text}</Text>  
        </TouchableHighlight>  
    );  
  }  
}  
  AppRegistry.registerComponent('TouchableButton', () => TouchableButton);

// module.exports = TouchableButton;  