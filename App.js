import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import PdfReaderScreen from './screens/PdfReaderScreen';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
      <NavigationContainer>
          <StatusBar style='auto'/>
            <Stack.Navigator 
              initialRouteName="OnBoardingScreen" 
              screenOptions={{
              headerShown: false
              }}>
                <Stack.Screen name="OnBoardingScreen" component={OnboardingScreen}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                <Stack.Screen name="PdfReaderScreen" component={PdfReaderScreen}/>
            </Stack.Navigator>
      </NavigationContainer>
  );
}
