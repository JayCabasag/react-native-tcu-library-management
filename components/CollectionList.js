import React from 'react'
import { Card,Text } from 'react-native-paper'
import { IMAGES } from '../utils/app_constants'
import BookPreviewBottomSheet from '../screens/BookPreviewBottomSheet'

const CollectionList = ({data}) => {

  const [showBookPreview, setShowBookPreview] = React.useState(false)

  const handleToggleBookPreview = () => {
    setShowBookPreview(prevState => !prevState)
  }


  return (
    <Card style={{height: 'auto', marginRight: 18, borderRadius: 15}} width={180} onPress={handleToggleBookPreview}>
       {/* 
          Previewer
        */}
        <BookPreviewBottomSheet showBookPreview={showBookPreview} handleToggleBookPreview={handleToggleBookPreview} data={data}/>
         {/* 
          Previewer
        */}
        <Card.Cover 
            source={{ uri: data?.book_cover ?? IMAGES.NO_IMAGE_AVAILABLE }}
            style={{height: 170, borderTopRightRadius: 15, borderTopLeftRadius: 15}}
        />
        <Card.Title 
            title={data?.title ?? 'No title...'} 
            subtitle={data?.description ?? 'No description...'}
        />
    </Card>
  )
}

export default CollectionList