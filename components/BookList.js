import React from 'react'
import { View, Text, Image } from 'react-native'
import { Card, Chip } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons'
import { COLORS, IMAGES } from '../utils/app_constants'
import BookPreviewBottomSheet from '../screens/BookPreviewBottomSheet'

const BookList = ({data}) => {
  
  const [showBookPreview, setShowBookPreview] = React.useState(false)

  const handleToggleBookPreview = () => {
    setShowBookPreview(prevState => !prevState)
  }

  return (
    <Card style={{padding: 25, marginTop: 10}} elevation={0} onPress={handleToggleBookPreview}>
        {/* 
          Previewer
        */}
        <BookPreviewBottomSheet showBookPreview={showBookPreview} handleToggleBookPreview={handleToggleBookPreview} data={data}/>
         {/* 
          Previewer
        */}

        <View style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center'}}>
        <Image source={{uri: data?.book_cover ?? IMAGES.NO_IMAGE_AVAILABLE}}
            style={{width: 150, height: 150, borderRadius: 15}} /> 
        
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
            <View style={{flex: 1, marginLeft: 22}}>
            <Text style={{fontSize: 18}}>Topic</Text>
            <Text style={{fontWeight: '900', fontSize: 18}}>{data?.title ?? 'No title'}</Text>
            <Text style={{fontSize: 18}}>By : {data?.author ?? 'Unknown author'}</Text>            
            </View>
            <View style={{marginLeft: 15}}>
            <Entypo name='chevron-right' size={25} color={COLORS.GRAY}/>
            </View>
        </View>
        </View>
    </Card>
  )
}

export default BookList