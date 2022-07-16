package com.msheriff.kingdom;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;
import android.view.Window;

public class MainActivity extends Activity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    requestWindowFeature(Window.FEATURE_NO_TITLE);
    super.onCreate(savedInstanceState);
    // setContentView(R.layout.activity_main);

    TextView textView = new TextView(this);
    // String text = getResources().getString("Stuff");

    textView.setText("Sheriff: Welcome to my kingdom");
    setContentView(textView);
  }
}
/*
 * import android.app.Activity;
 * import android.content.res.Resources;
 * import android.os.Bundle;
 * import android.widget.TextView;
 *
 * public class HelloAndroid extends Activity {
 *
 * @Override
 * public void onCreate(Bundle savedInstanceState) {
 * super.onCreate(savedInstanceState);
 *
 * TextView textView = new TextView(this);
 *
 * String text = getResources().getString(R.string.helloText);
 * textView.setText(text);
 *
 * setContentView(textView);
 * }
 * }
 */
