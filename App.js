import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameScreen from './screens/GameScreen';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const handlePress = () => {
    navigation.navigate('Game');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fight For Glory</Text>

      <Text style={styles.subtitle}>
        Get ready for an exciting adventure!
      </Text>

      <Image
        source={require('./assets/defence.jpg')}
        style={styles.image}
      />

      <TouchableOpacity
        onPress={handlePress}
        style={styles.button}
      >
        <FontAwesome name="home" size={24} color="black" />

        <Text style={styles.buttonText}>
          Start Battle
        </Text>
      </TouchableOpacity>

      <StatusBar style="light" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{ title: 'Fight For Glory' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
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