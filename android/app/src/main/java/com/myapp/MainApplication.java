package com.myapp;

import android.app.Application;

import com.myapp.reactpackage.MyDeviceInfoReactPackage;
import com.myapp.reactpackage.MyIntentReactPackage;
import com.myapp.reactpackage.MyRoundCircleReactPackage;
import com.myapp.reactpackage.MyToastReactPackage;
import com.myapp.reactpackage.NativeReactPackage;
import com.myapp.reactpackage.TransMissonPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import cn.jpush.reactnativejpush.JPushPackage;

public class MainApplication extends Application implements ReactApplication {
  private boolean SHUTDOWN_TOAST = false;
  private boolean SHUTDOWN_LOG = false;
  public static NativeReactPackage mNativeReactPackage = new NativeReactPackage();
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {

      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new TransMissonPackage(),
              new MyDeviceInfoReactPackage(),
                  new MyToastReactPackage(),
              new MyRoundCircleReactPackage(),
              new MyIntentReactPackage(),
              new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
              mNativeReactPackage
          
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
