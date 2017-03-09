package com.myapp.view;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.LinearGradient;
import android.graphics.Paint;
import android.graphics.RectF;
import android.graphics.Shader;
import android.graphics.SweepGradient;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.text.TextPaint;
import android.util.AttributeSet;
import android.view.View;
import com.myapp.R;

public class RoundProgressBar extends View {
    /**
     * 画笔对象的引用
     */
    private Paint paint,progressPaint;
    /**
     * 圆环的颜色
     */
    private int roundColor;

    /**
     * 圆环进度的颜色
     */
    private int roundProgressColor;

    /**
     * 中间进度百分比的字符串的颜色
     */
    private int textColor;

    /**
     * 中间进度百分比的字符串的字体
     */
    private float textSize;

    /**
     * 圆环的宽度
     */
    private float roundWidth;

    /**
     * 最大进度
     */
    private int max;

    /**
     * 当前进度
     */
    private int progress;
    /**
     * 是否显示中间的进度
     */
    private boolean textIsDisplayable;

    /**
     * 进度的风格，实心或者空心
     */
    private int style;

    public static final int STROKE = 0;
    public static final int FILL = 1;
    private float mTextWidth;
    private float mTextHeight;

    public RoundProgressBar(Context context) {
        super(context);
        init(null, 0);
    }

    public RoundProgressBar(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(attrs, 0);
    }

    public RoundProgressBar(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(attrs, defStyle);
    }

    private void init(AttributeSet attrs, int defStyle) {
        // Load attributes
        final TypedArray a = getContext().obtainStyledAttributes(
                attrs, R.styleable.RoundProgressBar, defStyle, 0);

        roundColor = a.getColor(R.styleable.RoundProgressBar_roundColor,Color.argb(120,192,192,192));
        roundProgressColor = a.getColor(R.styleable.RoundProgressBar_roundProgressColor,Color.GREEN);
        textColor = a.getColor(R.styleable.RoundProgressBar_textColor, Color.GREEN);
        textSize = a.getDimension(R.styleable.RoundProgressBar_textSize, 55);
        roundWidth = a.getDimension(R.styleable.RoundProgressBar_roundWidth, 8);
        max = a.getInteger(R.styleable.RoundProgressBar_max, 100);
        textIsDisplayable = a.getBoolean(R.styleable.RoundProgressBar_textIsDisplayable, true);
        style = a.getInt(R.styleable.RoundProgressBar_style, 0);
        a.recycle();
        // Set up a default TextPaint object
        paint = new Paint();
        progressPaint = new Paint();
          }



    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        /**
         * 画最外层的大圆环
         */
        int centerx = getWidth()/2;
        int centery = getHeight()/2;
        if(centerx >centery){
            centerx = centery;
        }else{
            centery= centerx;
        }
        int radius = (int)(centerx-roundWidth/2);
        paint.setColor(roundColor);
        paint.setStyle(Paint.Style.STROKE); //空心
        paint.setStrokeWidth(roundWidth); //设置圆环宽度
        paint.setAntiAlias(true);
        canvas.drawCircle(centerx,centery,radius,paint);

        /**
         * 画进度百分比
         */
        paint.setStrokeWidth(0);
        paint.setColor(textColor);
        paint.setTextSize(textSize);
        paint.setTypeface(Typeface.DEFAULT_BOLD); //设置字体
        int percent = (int)(((float)progress / (float)max) * 100);  //中间的进度百分比，先转换成float在进行除法运算，不然都为0
        float textWidth = paint.measureText(percent + "%");   //测量字体宽度，我们需要根据字体的宽度设置在圆环中间

        if(textIsDisplayable && percent != 0 && style == STROKE){
            canvas.drawText(percent + "%", centerx - textWidth / 2, centerx + textSize/2, paint); //画出进度百分比
        }

          /**
         * 画圆弧 ，画圆环的进度
         */

        //设置进度是实心还是空心
        progressPaint.setColor(roundProgressColor);  //设置进度的颜色
        progressPaint.setStrokeWidth(roundWidth); //设置圆环的宽度
        Shader mShader = new LinearGradient(centerx,0, centerx, 2*centerx,
                circleColors,null, Shader.TileMode.REPEAT);
        progressPaint.setShader(new SweepGradient(centerx, centerx, circleColors, null));
//        paint.setShader(mShader);
        RectF oval = new RectF(centerx - radius, centerx - radius, centerx
                + radius, centerx + radius);  //用于定义的圆弧的形状和大小的界限

        switch (style) {
            case STROKE:{
                progressPaint.setStyle(Paint.Style.STROKE);
                canvas.drawArc(oval, 0, 360 * progress / max, false, progressPaint);  //根据进度画圆弧
                break;
            }
            case FILL:{
                progressPaint.setStyle(Paint.Style.FILL_AND_STROKE);
                if(progress !=0)
                    canvas.drawArc(oval, 0, 360 * progress / max, true, progressPaint);  //根据进度画圆弧
                break;
            }
        }

    }

    //圆环颜色
    private int[] circleColors = new int[]{Color.GREEN, Color.YELLOW, Color.RED};
    public synchronized int getMax() {
        return max;
    }

    /**
     * 设置进度的最大值
     * @param max
     */
    public synchronized void setMax(int max) {
        if(max < 0){
            throw new IllegalArgumentException("max not less than 0");
        }
        this.max = max;
    }

    /**
     * 获取进度.需要同步
     * @return
     */
    public synchronized int getProgress() {
        return progress;
    }
    /**
     * 设置进度，此为线程安全控件，由于考虑多线的问题，需要同步
     * 刷新界面调用postInvalidate()能在非UI线程刷新
     * @param progress
     */
    public synchronized void setProgress(int progress) {
        if(progress < 0){
            throw new IllegalArgumentException("progress not less than 0");
        }
        if(progress > max){
            progress = max;
        }
        if(progress <= max){
            this.progress = progress;
            postInvalidate();
        }

    }


    public int getCricleColor() {
        return roundColor;
    }

    public void setCricleColor(int cricleColor) {
        this.roundColor = cricleColor;
    }

    public int getCricleProgressColor() {
        return roundProgressColor;
    }

    public void setCricleProgressColor(int cricleProgressColor) {
        this.roundProgressColor = cricleProgressColor;
    }

    public int getTextColor() {
        return textColor;
    }

    public void setTextColor(int textColor) {
        this.textColor = textColor;
    }

    public float getTextSize() {
        return textSize;
    }

    public void setTextSize(float textSize) {
        this.textSize = textSize;
    }

    public float getRoundWidth() {
        return roundWidth;
    }

    public void setRoundWidth(float roundWidth) {
        this.roundWidth = roundWidth;
    }

}
