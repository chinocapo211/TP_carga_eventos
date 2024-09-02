import React from 'react';
import { View, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex:1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;