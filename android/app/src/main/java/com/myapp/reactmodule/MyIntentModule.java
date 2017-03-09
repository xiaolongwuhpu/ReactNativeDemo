package com.myapp.reactmodule;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.myapp.MainActivity;


/**
 * create by cc on $ 2016-12-9
 * reactnative跳转原生页面module
 */
public class MyIntentModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext mContext;
    String mEventName = "";//发送事件名称

    public static String BROADCASE_ADDRESS="react_native_event_addr";
    public MyIntentModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "IntentModuleAndroid";
    }

    /**
     * 从JS页面跳转到原生activity 同时也可以从JS传递相关数据到原生
     *
     * @param activityName   需要打开的Activity的class
     * @param params
     *    NativeModules.IntentModuleAndroid.startActivityFromJS("com.myapp.ui.User_Info_Activity","js中用户名 : "+this.state.user +'='+"js中密码 : "+this.state.pwd+"="+"我是从js传过来的标题");

     */
     @ReactMethod
    public void startActivityFromJS(String activityName, String params,String eventname) {
        try {
            Activity currentActivity = getCurrentActivity();
            if (null != currentActivity) {

                mEventName = eventname;
                // 注册拿到加载状态广播接收器
                IntentFilter intentFilter = new IntentFilter(BROADCASE_ADDRESS);
//                intentFilter.addAction(Intent.ACTION_CLOSE_SYSTEM_DIALOGS); //监听HOME键的监听事件,
                // 用户判断应用是否被推至后台---myth
                currentActivity.registerReceiver(broadcastReceiver, intentFilter);

                Class toActivity = Class.forName(activityName);
                Intent intent = new Intent(currentActivity, toActivity);
                intent.putExtra("params", params);
                currentActivity.startActivity(intent);
            }
        }
        catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "Could not open the activity " + e.getMessage());
        }
    }

    /**
     * 原生跳转到reactnative页面并传递数据
     * @param successBack
     * @param erroBack
     */
    @ReactMethod
    public void getDataFromIntent(Callback successBack, Callback erroBack ){
        try{
            Activity currentActivity = getCurrentActivity();
            String result = currentActivity.getIntent().getStringExtra("result");//会有对应数据放入
            if (TextUtils.isEmpty(result)){
                result = "no data";
            }
            successBack.invoke(result);
        }catch (Exception e){
            erroBack.invoke(e.getMessage());
        }
    }

    /**
     * Activtiy跳转到JS页面，传输数据
     * @param successBack
     * @param errorBack
     */
    @ReactMethod
    public void dataToJS(Callback successBack, Callback errorBack){
        try{
            Activity currentActivity = getCurrentActivity();
            String result = currentActivity.getIntent().getStringExtra("data");
            if (TextUtils.isEmpty(result)){
                result = "";
            }
            successBack.invoke(result);
        }catch (Exception e){
            errorBack.invoke(e.getMessage());
        }
    }

     /**
        * 原生模块向React Native侧发送消息
        * @param message 消息
        */
        public void sendMessage(String message) {
            mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("NativeMessage", message);
        }
    /**
     * 从JS页面跳转到Activity界面，并且等待从Activity返回的数据给JS
     * @param className
     * @param successBack
     * @param errorBack
     */
    @ReactMethod
    public void startActivityFromJSGetResult(String className,int requestCode,Callback successBack, Callback errorBack){
        try {
            Activity currentActivity=getCurrentActivity();
            if(currentActivity!=null) {

                Class toActivity = Class.forName(className);
                Intent intent = new Intent(currentActivity,toActivity);
                currentActivity.startActivityForResult(intent,requestCode);
                //进行回调数据
                successBack.invoke(MainActivity.mQueue.take());
            }
        } catch (Exception e) {
            errorBack.invoke(e.getMessage());
            e.printStackTrace();
        }

    }


    //注册广播 ,用于接收耗时任务的处理进度
    private BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {

        @Override
        public void onReceive(Context context, Intent intent) {
            try {
                if (intent.getAction().equals(BROADCASE_ADDRESS)) {
                    Bundle bundle = intent.getExtras();
                    String data = bundle.getString("data");

                    WritableMap writableMap = new WritableNativeMap();
                    writableMap.putString("EventEmitter", data);
                    writableMap.putString("type", "2");
                    Log.e("111","broadcastReceiver"+ "收到广播了" + data + "|" + mEventName);
                    mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit(mEventName, writableMap);
                    mEventName = "";
//                    MainApplication.getInstance().setReactNativeReqBean(null);//清空reactNative传递的参数
                    context.unregisterReceiver(broadcastReceiver);
//                    finishAllActivity();
                }
            }
            catch (Exception e) {
                Toast.makeText(mContext,"失败了",Toast.LENGTH_LONG).show();
            }
        }
    };
//    @ReactMethod
//    public void startActivityForResult(String activityName,int requestCode,Callback
// successCallback,Callback erroCallback){
//
//        try{
//
//            Activity currentActivity=getCurrentActivity();
//
//            if(null!=currentActivity){
//
//                Class aimActivity= Class.forName(activityName);
//
//                Intent intent=new Intent(currentActivity,aimActivity);
//
//                currentActivity.startActivityForResult(intent,requestCode);
//
//                String result=MyConstants.myBlockingQueue.take();
//
//                successCallback.invoke(result);
//
//            }
//
//        }catch(Exception e){
//
//            erroCallback.invoke(e.getMessage());
//
//            throw new JSApplicationIllegalArgumentException(
//
//                    "Could not open the activity : "+e.getMessage());
//
//        }
//
//    }

    /**
     * Reactnarive finish页面后返回android
     *
     * @param resultCode
     * @param result
     */
    @ReactMethod
    public void finishActivity(int resultCode, String result) {

        Activity currentActivity = getCurrentActivity();

        Intent intent = new Intent();

        intent.putExtra("result", result);

        currentActivity.setResult(resultCode, intent);

        currentActivity.finish();

    }

}
