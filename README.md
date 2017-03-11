# ReactNativeDemo(just for android)
ReactNativeDemo是android原生和js进行交互的demo,总结了几乎所有可能的交互方式,开发react-native和android混合项目利器

## 使用方式
1. clone下来或者down下来以后,先进入ReactNativeDemo根目录,执行 npm install
2. 本例主要是测试react-native中js和android原生的各种情况的交互,一切尽在此demo,从此混合开发so easy!!!

## 涵盖交互方式
1. 常用的3中RCTDeviceEventEmitter,CallBack回调方式,Promises方式.
2. 除了上边说的3种方法,还有一些其他场景.   
```
  1.  在js中使用android原生的组件或者自定义的view(例如:我们公司的开发过程中用到了,安全键盘),因为在js中无法实现或者难以实现的view控件,
      就可以使用原生组件封装,通过facebook提供的ViewGroupManager把原生的自定义view拼接到js界面.从而实现不同的交互场景.
  2.  js携带数据传参给原生.
  3.  原生发送统一广播给js ,js监听到广播处理相应的事件.
  ```
 
 
