import React from 'react'
import { View, StyleSheet, StatusBar, ScrollView, Image} from 'react-native'
import { Searchbar, Card, Text} from 'react-native-paper'
import { COLORS } from '../utils/app_constants'
import { Entypo } from '@expo/vector-icons'
import BookList from '../components/BookList'
import BookPreviewBottomSheet from '../screens/BookPreviewBottomSheet'

const FavoritesTab = () => {

  const [showBookPreview, setShowBookPreview] = React.useState(false)
  const handleToggleBookPreview = () => {
    setShowBookPreview((prevState) => !prevState)
  }

  return (
    <ScrollView 
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    style={styles.scrollView}
    >
      <BookPreviewBottomSheet showBookPreview={showBookPreview} handleToggleBookPreview={handleToggleBookPreview}/>
      <Text style={styles.headerText}>Favorites</Text>

      <View style={{width: '100%', height: 'auto', backgroundColor: COLORS.WHITE, height: 'auto', paddingVertical: 15, paddingHorizontal: 5, marginTop: 18}}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8].map((data, index) => {
            return (<BookList handleToggleBookPreview={handleToggleBookPreview} key={index} data={data}/>)
          })
        }
      </View>
    </ScrollView>
  )
}

export default FavoritesTab

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: COLORS.RED
  },
  newCollectionText: {
    color: COLORS.WHITE,
    fontSize: 22,
    padding: 22,
    fontWeight: 'bold'
  },
  headerText: {
    fontSize: 30,
    color: COLORS.WHITE,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bolder',
    marginTop: StatusBar.currentHeight
  }
})