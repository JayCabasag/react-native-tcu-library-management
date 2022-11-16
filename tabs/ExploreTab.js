import React, {useState} from 'react'
import { View, StyleSheet, StatusBar, ScrollView, Image} from 'react-native'
import { Searchbar, Card, Text, ActivityIndicator} from 'react-native-paper'
import { COLORS } from '../utils/app_constants'
import SearchBookList from '../components/SearchBookList'
import { useDebouncedCallback } from 'use-debounce';
import { collection, getDocs, setDoc, doc, limit, orderBy, query, where} from 'firebase/firestore/lite';
import { db } from '../firebase/firebaseConfig'
import { TOTAL_BOOK_LOAD_LIMIT } from '../utils/app_constants'

const ExploreTab = () => {
  const [searchQuery, setSearchQuery] = React.useState('')

  const debounceSearch = useDebouncedCallback((value) => {
    setSearchQuery(value)
  },1000)

  const onChangeSearch = (value) => {
    debounceSearch(value)
  }

  const [bookResultsList, setbookResultsList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [noResultsFound, setNoResultsFound] = useState(false)
  const [totalBookLoadLimit, setTotalBookLoadLimit] = useState(TOTAL_BOOK_LOAD_LIMIT)

  React.useEffect(() => {
    const getBooks = async (db) => {
      const hasEmptyValue = searchQuery === ''

      if(hasEmptyValue){
        setIsLoading(true)
        const booksCollectionRef = collection(db, 'books');
        const top100NewCollection = query(booksCollectionRef, limit(totalBookLoadLimit));
        const bookSnapshot = await getDocs(top100NewCollection);
        const bookList = bookSnapshot.docs.map(doc => {
         return { docId: doc.id,...doc.data()}
        });
        const noResults = bookList?.length <= 0
        if(noResults){
          setNoResultsFound(true)
        }
        if(!noResults){
          setNoResultsFound(false)
        }
        setIsLoading(false)
        return setbookResultsList([...bookList]);
      }

      if(!hasEmptyValue){
        setIsLoading(true)
        const booksCollectionRef = collection(db, 'books');
        const top100NewCollection = query(booksCollectionRef, where("title","==",searchQuery), limit(totalBookLoadLimit));
        const bookSnapshot = await getDocs(top100NewCollection);
        const bookList = bookSnapshot.docs.map(doc => {
         return { docId: doc.id,...doc.data()}
        });
        const noResults = bookList?.length <= 0
        if(noResults){
          setNoResultsFound(true)
        }
        if(!noResults){
          setNoResultsFound(false)
        }
        setIsLoading(false)
        return setbookResultsList([...bookList]);
      }
    }
    getBooks(db)
  }, [searchQuery, totalBookLoadLimit])

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };


  return (  
    <ScrollView 
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    style={styles.scrollView}
    onScroll={({nativeEvent}) => {
      if (isCloseToBottom(nativeEvent)) {
        setTotalBookLoadLimit(prevState => {
          return prevState + TOTAL_BOOK_LOAD_LIMIT
        })
      }
    }}
    >
      <Text style={styles.headerText}>Search</Text>
      <View style={{paddingHorizontal: 22, paddingVertical: 25}}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          inputStyle={{color:'#fff'}}
          defaultValue={searchQuery}
          cursorColor={COLORS.WHITE}
          iconColor={COLORS.WHITE}
          placeholderTextColor={COLORS.WHITE}
          selectionColor={COLORS.WHITE}
          style={{fontSize: 25, backgroundColor: '#bf0000', color: COLORS.WHITE, height: 65, borderRadius: 15, paddingHorizontal: 20}}
        />
      </View>
      <View style={{width: '100%', height: 'auto', minHeight: '100%', backgroundColor: COLORS.RED, height: 'auto', paddingVertical: 15, paddingHorizontal: 5}}>
        {
          !noResultsFound && bookResultsList?.map((data, index) => {
            return (<SearchBookList key={index} data={data}/>)
          })
        }
        {
          isLoading && (<ActivityIndicator animating={true} color={COLORS.WHITE} style={{height: 180}} />)
        }
        {
           !isLoading && noResultsFound && (<Text style={{color: COLORS.WHITE, flex: 1, textAlign: 'center'}}>No results found for "{searchQuery}"</Text>)
        }
      </View>
    </ScrollView>
  )
}

export default ExploreTab

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