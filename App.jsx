import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('user info', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error);
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };

  const handleGoogleLogout = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.log('Google Sign-Out Error: ', error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={googleLogin}>
        <Text style={styles.text}>Google Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGoogleLogout}>
        <Text style={styles.text}>Google Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 48,
    paddingHorizontal: 8,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    padding: 10,
  },
});
