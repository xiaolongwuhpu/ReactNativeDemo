package com.myapp.view;

import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.annotations.ReactPropGroup;

/**
 * Created by Administrator on 2017/1/6 0006.
 */
public class CircleManager extends SimpleViewManager<RoundProgressBar> {
    @Override
    public String getName() {
        return "MCircle";
    }

    @Override
    protected RoundProgressBar createViewInstance(ThemedReactContext reactContext) {
        return new RoundProgressBar(reactContext);
    }
    @ReactProp(name= "roundwidth")
    public void setRoundwidth(RoundProgressBar view , Integer roundwidth){
        view.setRoundWidth(roundwidth);
    }

    @ReactProp(name ="progress" )
    public void setProgress(RoundProgressBar view ,Integer progress){
        view.setProgress(progress);
    }
    @ReactProp(name ="roundcolor" )
    public void setRoundcolor(RoundProgressBar view ,Integer roundcolor){
        view.setCricleColor(roundcolor);
    }
    @ReactProp(name ="progresscolor" )
    public void setProgresscolor(RoundProgressBar view ,Integer progresscolor){
        view.setCricleProgressColor(progresscolor);
    }
  /*  @ReactPropGroup(names ="Progress" )
    public void setRoundCircle(RoundProgressBar view ,Integer Progress ,Integer Circlecolor,Integer CricleProgressColor,Integer roundwidth  ){
        view.setProgress(Progress);
        view.setCricleColor(Circlecolor);
        view.setRoundWidth(roundwidth);
        view.setCricleProgressColor(CricleProgressColor);
        }*/














}
