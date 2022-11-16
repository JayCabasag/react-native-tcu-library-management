import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

// Tabs
import HomeTab from '../tabs/HomeTab'
import ProfileTab from '../tabs/ProfileTab'
import ExploreTab from '../tabs/ExploreTab'
import FavoritesTab from '../tabs/FavoritesTab'
import { COLORS } from '../utils/app_constants';
import ProfileBottomSheet from '../tabs/ProfileBottomSheet';
import ProfileScreen from './ProfileScreen';

const Tab = createMaterialBottomTabNavigator()

const HomeScreen = ({navigation}) => {
  return (
    <NavigationContainer independent={true}>
        <Tab.Navigator
            initialRouteName="Home"
            activeColor={COLORS.RED}
            inactiveColor={COLORS.RED}
            barStyle={{ paddingBottom: 0, backgroundColor: COLORS.WHITE, height: 65, paddingTop: 5}}
            screenOptions={{
            headerShown: false
            }}>
            <Tab.Screen 
                name='HomeTab' 
                component={HomeTab} 
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
             <Tab.Screen 
                name='ExploreTab' 
                component={ExploreTab}
                options={{
                    tabBarLabel: 'Explore',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="search" color={color} size={23} />
                    ),
                }}
            />
            <Tab.Screen 
                name='FavoritesTab' 
                component={FavoritesTab}
                options={{
                    tabBarLabel: 'Favorites',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="favorite" size={26} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name='ProfileTab' 
                component={ProfileTab}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="user-alt" size={20} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default HomeScreen