import React from 'react'
import { View, Text } from 'react-native'
import { COLORS } from '../utils/app_constants'

const TagList = ({data}) => {
  return <View 
            style={{
                height: 'auto',
                width: 'auto',
                marginRight: 15, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
            }}>
                <Text style={{fontSize: 16,fontWeight: '100', color: COLORS.WHITE, paddingHorizontal: 15}}>{data}</Text>
        </View>
}

export default TagList