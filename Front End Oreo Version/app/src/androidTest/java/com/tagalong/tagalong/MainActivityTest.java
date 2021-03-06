package com.tagalong.tagalong;

import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.filters.LargeTest;
import androidx.test.rule.ActivityTestRule;

import com.tagalong.tagalong.activity.MainActivity;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.concurrent.TimeUnit;

import static androidx.test.espresso.Espresso.closeSoftKeyboard;
import static androidx.test.espresso.Espresso.onView;
import static androidx.test.espresso.action.ViewActions.click;
import static androidx.test.espresso.action.ViewActions.scrollTo;
import static androidx.test.espresso.action.ViewActions.swipeLeft;
import static androidx.test.espresso.action.ViewActions.swipeRight;
import static androidx.test.espresso.action.ViewActions.typeText;
import static androidx.test.espresso.matcher.ViewMatchers.withHint;
import static androidx.test.espresso.matcher.ViewMatchers.withId;
import static androidx.test.espresso.matcher.ViewMatchers.withText;
import static org.hamcrest.Matchers.not;


@RunWith(AndroidJUnit4.class)
@LargeTest
public class MainActivityTest {

    @Rule
    public ActivityTestRule<MainActivity> mainActivityActivityTestRule = new ActivityTestRule<>(MainActivity.class);



    @Test
    public void testASignUp() {
        onView(withId(R.id.signup_button)).perform(click());

        onView(withId(R.id.username)).perform(typeText("yash2"));
        onView(withId(R.id.password)).perform(typeText("xd"));
        onView(withId(R.id.password2)).perform(typeText("xd"));
        closeSoftKeyboard();
        onView(withId(R.id.Email)).perform(typeText("yash2@ashok.com"));
        closeSoftKeyboard();
        onView(withId(R.id.nextbutton)).perform(click());
        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        onView(withId(R.id.firstName)).perform(typeText("Yash"));
        onView(withId(R.id.lastName)).perform(typeText("Sardhara"));
        onView(withId(R.id.gender)).perform(typeText("Female"));
        onView(withId(R.id.age)).perform(typeText("100"));
        onView(withId(R.id.isDriver)).perform(click());
        //onView(withId(R.id.carCapacity)).perform(typeText("3"));
        closeSoftKeyboard();
        onView(withId(R.id.seekMusic)).perform(swipeRight());
        onView(withId(R.id.seekSpeed)).perform(swipeRight());
        onView(withId(R.id.seekSmoking)).perform(scrollTo()).perform(swipeLeft());
        onView(withId(R.id.seekFragrance)).perform(scrollTo()).perform(swipeRight());
        onView(withId(R.id.seekChatting)).perform(scrollTo()).perform(swipeLeft());
        onView(withId(R.id.submit)).perform(scrollTo()).perform(click());
        onView(withId(R.id.logout)).perform(click());
    }


    @Test
    public void testBLoginLogout() {
        onView(withId(R.id.userNameLogin)).perform(typeText("bwong"));
        onView(withId(R.id.passwordLogin)).perform(typeText("xd"));
        closeSoftKeyboard();
        onView(withId(R.id.login_button)).perform(click());
        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        onView(withId(R.id.logout)).perform(click());

    }

    @Test
    public void testMaps() {
        onView(withId(R.id.userNameLogin)).perform(typeText("bwong"));
        onView(withId(R.id.passwordLogin)).perform(typeText("xd"));
        closeSoftKeyboard();
        onView(withId(R.id.login_button)).perform(click());
        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        onView(withId(R.id.nav_maps)).perform(click());
        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        onView(withId(R.id.map)).perform(click());
/*
        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

 */
        //pressImeActionButton();
        try {
            TimeUnit.SECONDS.sleep(2);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        closeSoftKeyboard();
        onView(withId(R.id.arrivalDate)).perform(click());
        onView(withText("21")).perform(click());

        /*
        try {
            TimeUnit.SECONDS.sleep(2);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //onView(withId(R.id.arrivalTime)).perform(typeText("11:00"));
        //closeSoftKeyboard();
        //onView(withId(R.id.To)).perform(click());
        pressBack();
        onView(withId(R.id.logout)).perform(click());

         */
    }
}