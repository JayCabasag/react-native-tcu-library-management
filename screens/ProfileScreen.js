import React from 'react'
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View, Image} from 'react-native'
import { StyleSheet} from 'react-native';
import { COLORS, DEVELOPEMENT_STATE } from '../utils/app_constants';
import { FontAwesome } from '@expo/vector-icons';



const ProfileScreen = () => {
  return (
    <SafeAreaView style={{height: '100%'}}>
        <View style={styles.container}>
          
        </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
      paddingTop: StatusBar.currentHeight,
      backgroundColor: COLORS.RED,
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: '100%',
      width: '100%',
      display: 'flex'
    },
    onboardingMessageContainer: {
      width: '100%',
      height: '50%',
      paddingHorizontal: 20,
      display: 'flex',
      justifyContent: 'flex-end',
      paddingBottom: 45
    },
    onboardingMessageContainerText: {
        color: COLORS.WHITE,
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 1
    },
    mainMessageContainer: {
        marginBottom: 30
    },
    submessageContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nextButton: {
        backgroundColor: COLORS.WHITE,
        height: 55,
        width: 55,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 66,
        height: 58,
      },
  });
  