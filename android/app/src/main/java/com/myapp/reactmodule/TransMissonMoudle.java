package com.myapp.reactmodule;/**
 * Created by luomin on 16/11/25.
 */

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.Nullable;

/**
 * longwu 2017-01-04
 */
public class TransMissonMoudle extends ReactContextBaseJavaModule {

    private static final String REACT_CLASS = "TransMissonMoudle";
    private ReactContext mReactContext;

    public TransMissonMoudle(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }


    //延迟0.1秒获取时间。
    @ReactMethod
    public void getTime() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                String time = getTimeMillis();

                WritableMap writableMap = new WritableNativeMap();
                writableMap.putString("key2", time);
                writableMap.putString("type", "1");
                sendTransMisson(mReactContext, "EventName", writableMap);

            }
        }).start();
    }

    private String getTimeMillis() {
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
        Date date = new Date(System.currentTimeMillis());
        String time = formatDate.format(date);
        return time;
    }


    /**
     * RCTDeviceEventEmitter方式
     *
     * @param reactContext
     * @param eventName    事件名
     * @param params       传惨
     */
    public void sendTransMisson(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);

    }

    /**
     * CallBack方式
     *
     * @param name
     * @param callback
     */
    @ReactMethod
    public void callBackTime(String name, Callback callback) {
        callback.invoke(getTimeMillis());
    }


    /**
     * Promise方式
     * @param name
     * @param promise
     */
    @ReactMethod
    public void sendPromiseTime(String name, Promise promise) {
        WritableMap writableMap=new WritableNativeMap();
        writableMap.putString("age","20");
        writableMap.putString("time",getTimeMillis());
        promise.resolve(writableMap);


    }


}
