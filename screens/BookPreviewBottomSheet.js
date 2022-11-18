import { BottomSheet } from 'react-native-btr';
import { View, StyleSheet, Text, ScrollView, Image, Linking } from 'react-native';
import {WebView} from 'react-native-webview'
import { Appbar, Button, List, TextInput} from 'react-native-paper';
import { COLORS, IMAGES } from '../utils/app_constants';
import { Feather, Octicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import PDFReader from 'rn-pdf-reader-js'
import React from 'react';

const BookPreviewBottomSheet = ({navigation, showBookPreview, handleToggleBookPreview, data}) => {
  
  const bookPdfFileUrl = data?.file ?? 'https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-20173.jpg?w=826&t=st=1668346268~exp=1668346868~hmac=5d21ce308f30b531b082dd8a99245f4f5f425066e966140b8ac11e696e5bd064'

  const source = {
    uri: data?.file ?? '',
    cache: true,
  };

  const [showPdfReader, setShowPdfReader] = React.useState(false)
  const handleOpenPdfReader = (fileUrl) => {
    setShowPdfReader(true)
  }
  const [isLoadingPdf, setIsLoadingPdf] = React.useState(true)
  const handleOnErrorLoadingPdf = (error) => {
    setIsLoadingPdf(false)
  }
  return (
    <BottomSheet
          visible={showBookPreview}
          onBackButtonPress={handleToggleBookPreview}
          onBackdropPress={handleToggleBookPreview}
        >
          <View style={styles.bottomNavigationView}>
              <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
              <Appbar.Header style={{backgroundColor: COLORS.RED, display: 'flex', alignItems: 'center', width: '100%'}} >
                <Appbar.BackAction onPress={handleToggleBookPreview} size={30}/>
                <Text style={{flex: 1, textAlign: 'center', fontSize: 25, color: COLORS.WHITE}}>Book preview</Text>
                <Button onPress={() => alert('Added to favorites')}>
                  <FontAwesome name="heart" size={23} color={COLORS.WHITE} />
                </Button>
              </Appbar.Header>
                
                <View style={{paddingTop: 20,paddingHorizontal: 25,flex: 1, flexDirection: 'column', height: 'auto', display: 'flex',alignItems:'center', justifyContent: 'center'}}>
                <Image 
                  source={{uri: data?.book_cover ?? IMAGES.NO_IMAGE_AVAILABLE}}
                  style={{width: 150, height: 250, borderRadius: 15, marginBottom: 5}} 
                /> 
                <Text style={{color: COLORS.GRAY}}>By: {data?.author ?? 'Unknown author'} </Text>
                <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>{data?.title ?? 'No title'}</Text>
                  <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                    <Octicons name='download' size={15} color={COLORS.GRAY}/>
                    <Text style={{color: COLORS.GRAY, marginLeft: 5}}>{data?.totalReads ?? 0} Total reads</Text>
                  </View>
                  <View style={{display: 'flex', flex: 1, flexDirection: 'row', marginTop: 10}}>
                    <Button 
                      icon={'eye'} 
                      style={{ flex: 1, backgroundColor: COLORS.RED, marginRight: 10}}
                      mode="contained"
                      onPress={() => handleOpenPdfReader(data?.file ?? '')}
                    >
                      Read
                    </Button>
                    <Button style={{ flex: 1}} mode="outlined" onPress={() => Linking.openURL(bookPdfFileUrl)}  >
                     <FontAwesome name='download' size={15} color={COLORS.RED}/>
                     <Text style={{color: COLORS.RED}}>
                        {' '} Download
                     </Text>
                    </Button>
                  </View>
                  <View style={{flex: 1, paddingTop: 16, marginBottom: 10}}>
                    <Text style={{letterSpacing: .5, color: COLORS.BLACK}}>
                      {data?.description ?? 'No description...'}
                    </Text>
                  </View>
                  <View style={{flex: 1, height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {
                      isLoadingPdf && showPdfReader && (<Text>Please wait while we are loading the file...</Text>)
                    }
                  </View>
                  
                  <View style={{flex: 1, height: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <PDFReader
                        source={{
                        uri: data?.file ?? 'Error opening pdf'}}
                        onLoadEnd={() => setIsLoadingPdf(false)}
                        onError={error => handleOnErrorLoadingPdf(error)}
                      />
                  </View>
                </View>
              </ScrollView>
          </View>
        </BottomSheet>
  )
}

export default BookPreviewBottomSheet

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#E0F7FA',
    },
    bottomNavigationView: {
      backgroundColor: COLORS.WHITE,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  