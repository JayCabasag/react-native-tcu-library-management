import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { View } from 'react-native-web'

const PdfReaderScreen = () => {

  const handleOnErrorLoadingPdf = (error) => {
    console.log(error)
  }
  
  return (
    <SafeAreaView>
      <ScrollView>
        <Appbar.Header style={{backgroundColor: COLORS.RED, display: 'flex', alignItems: 'center', width: '100%'}} >
            <Appbar.BackAction onPress={handleToggleBookPreview} size={30}/>
              <Text style={{flex: 1, textAlign: 'center', fontSize: 25, color: COLORS.WHITE}}>Pdf Reader</Text>
              <Button onPress={() => alert('Added to favorites')}>
                <AntDesign name="sharealt" size={30} color={COLORS.WHITE} />
            </Button>
         </Appbar.Header>
         <View></View>
         <PDFReader
            source={{
            uri: data?.file ?? 'Error opening pdf'}}
            onError={error => handleOnErrorLoadingPdf(error)}
          />
      </ScrollView>
    </SafeAreaView>
  )
}

export default PdfReaderScreen