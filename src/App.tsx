import React from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import {JSProfile} from './suites/JSProfile';

type Route = '' | '/profile-js';

const App = () => {
  const [route, setRoute] = React.useState<Route>('');

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Router route={route} setRoute={setRoute} />
      </SafeAreaView>
    </View>
  );
};

type RouterProps = {
  route: Route;
  setRoute: React.Dispatch<React.SetStateAction<Route>>;
};
const Router = ({route, setRoute}: RouterProps) => {
  if (!route) {
    return (
      <>
        <Button
          title="Profile JavaScript"
          onPress={() => setRoute('/profile-js')}
        />
      </>
    );
  }
  if (route === '/profile-js') {
    return <JSProfile />;
  }
  return null;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
});

export default App;
