package com.myapp.ui;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import com.myapp.R;

import static com.myapp.reactmodule.MyIntentModule.BROADCASE_ADDRESS;

/**
 * Created by Administrator on 2017/1/9 0009.
 */
public class User_Info_Activity extends AppCompatActivity implements View.OnClickListener {
    private TextView tvTitle;
    private TextView tvSetting;
    private TextView tvdes;
    private Button btnTrsp;
    private EditText etname;
    private EditText etpsw;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_info);

        String strs = getIntent().getStringExtra("params");
        String user=  strs.split("=")[0];
        String psw=  strs.split("=")[1];
        String title=  strs.split("=")[2];

        etname = (EditText) findViewById(R.id.etname);
        etpsw = (EditText) findViewById(R.id.etpsw);
        tvTitle = (TextView) findViewById(R.id.tv_title);
        tvSetting = (TextView) findViewById(R.id.tv_setting);
        tvdes = (TextView) findViewById(R.id.tvdes);
        btnTrsp = (Button) findViewById(R.id.btn_trsp);
        btnTrsp.setOnClickListener(this);

        etname.setSelection(etname.getText().length());
        etpsw.setSelection(etpsw.getText().length());

        etname.setHintTextColor(getResources().getColor(R.color.edithintcolor));
        etpsw.setHintTextColor(getResources().getColor(R.color.edithintcolor));
        tvTitle.setText(title);
        tvdes.setText(user+"\n"+ psw);
    }

    public void tv_back(){
        finish();
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.btn_trsp:

                String new_user = etname.getText().toString().trim();
                String new_psw = etpsw.getText().toString().trim();

//               Intent mIntent=new Intent(User_Info_Activity.this,MainActivity.class);
//               mIntent.putExtra("data","4="+new_user+"="+new_psw);
//               User_Info_Activity.this.startActivity(mIntent);



                Intent broadcastIntent = new Intent();  //Intent就是我们要发送的内容
                broadcastIntent.putExtra("data","4="+new_user+"="+new_psw);
                broadcastIntent.setAction(BROADCASE_ADDRESS);
                //设置你这个广播的action，只有和这个action一样的接受者才能接受者才能接收广播
                sendBroadcast(broadcastIntent);   //发送广播



                //调用本地接口NativeInterface里边定义好的方法向React Native侧发送消息
                // MainApplication.mNativeReactPackage.mNativeInterface.sendMessage("4="+new_user+"="+new_psw);
                //页面返回
                finish();
                break;

        }
    }
}
