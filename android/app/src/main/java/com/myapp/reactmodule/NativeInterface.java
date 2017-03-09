package com.myapp.reactmodule;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by Administrator on 2017/1/13 0013.
 */

public class NativeInterface extends ReactContextBaseJavaModule {

    private final ReactApplicationContext mContext;
    private static final String TAG = "NativeInterface";

    /**
     * 构造方法
     * @param reactContext 上下文
     */
    public NativeInterface(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    /**
     * 定义React Native侧调用原生模块的名称,React Native侧通过这个名称进行调用
     * @return 原声代码块的名称
     */
    @Override
    public String getName() {
        return "NativeInterface";
    }

    /**
     * 原生模块向React Native侧发送消息
     * @param message 消息
     */
    public void sendMessage(String message) {
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("NativeMessage", message);
    }

}
