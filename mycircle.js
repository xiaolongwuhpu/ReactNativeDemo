import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,  
  View,
  requireNativeComponent,
  processColor  // 字符Color转换为数字
} from 'react-native';

//requireNativeComponent函数中的第一个参数就是刚刚CircleManager.getName返回的值。
const MyCircle = requireNativeComponent('MCircle', {
  propTypes: {
    roundwidth: PropTypes.number,
    progress: PropTypes.number,
    roundcolor: PropTypes.number,
    progresscolor: PropTypes.number,
    ...View.propTypes // 包含默认的View的属性
  },
});
export default class Circle extends Component{
    static propTypes = {
    roundwidth: PropTypes.number,
    progress: PropTypes.number,
    roundcolor: PropTypes.number,
    progresscolor: PropTypes.number,
        ...View.propTypes // 包含默认的View的属性
    }
    render(){
        const {style,roundwidth,progress,roundcolor,progresscolor} = this.props;
        return (
            <MyCircle 
            style = {style}
            roundwidth ={roundwidth}
            progress ={progress}
            roundcolor ={processColor(roundcolor)}
            progresscolor ={processColor(progresscolor)}

/>
        );
    }
}
AppRegistry.registerComponent('Circle', () => Circle);
// module.exports=MyCircle;