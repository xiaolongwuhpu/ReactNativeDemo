package com.myapp.reactpackage;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.myapp.reactmodule.NativeInterface;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Administrator on 2017/1/13 0013.
 */

public class NativeReactPackage  implements ReactPackage {

    public NativeInterface mNativeInterface;

    /**
     * 必须要实现的方法，方法接收我们自己编写的原生模块接口
     * @param reactContext 上下文
     * @return 本地模块
     */
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        //创建集合，添加我们编写的原生模块的接口,并返回
        List<NativeModule> modules = new ArrayList<>();
        mNativeInterface = new NativeInterface(reactContext);
        modules.add(mNativeInterface);
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        //这里并没有实现，所以返回了空
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        //这里并没有实现，所以返回了空
        return Collections.emptyList();
    }
}
