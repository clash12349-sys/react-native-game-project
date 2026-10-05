import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function WelcomeScreen({ navigation }) {

  const handlePress = () => {
    navigation.navigate('Game');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Fight For Glory
      </Text>

      <Text style={styles.subtitle}>
        Get ready for an exciting adventure!
      </Text>

      <Image
        source={require('../assets/defence.jpg')}
        style={styles.image}
      />

      <TouchableOpacity
        onPress={handlePress}
        style={styles.button}
      >
        <FontAwesome
          name="home"
          size={24}
          color="black"
        />

        <Text style={styles.buttonText}>
          Start Battle
        </Text>
      </TouchableOpacity>

      <StatusBar style="light" />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },

  image: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    gap: 10,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

});