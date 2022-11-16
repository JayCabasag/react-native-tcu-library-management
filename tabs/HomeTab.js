import React, {useState} from 'react'
import { View, StyleSheet, StatusBar, ScrollView, Image} from 'react-native'
import { Searchbar, Card, Text} from 'react-native-paper'
import { COLORS } from '../utils/app_constants'
import BookPreviewBottomSheet from '../screens/BookPreviewBottomSheet'
import BookList from '../components/BookList'
import CollectionList from '../components/CollectionList'
import TagList from '../components/TagList' 
import { collection, getDocs, setDoc, doc, limit, orderBy, query} from 'firebase/firestore/lite';
import { db } from '../firebase/firebaseConfig'
import { ActivityIndicator} from 'react-native-paper';
import { TOTAL_BOOK_LOAD_LIMIT } from '../utils/app_constants'

const HomeTab = ({navigation, parentNavigationProps}) => {

  const [searchQuery, setSearchQuery] = React.useState('')
  const onChangeSearch = (event) => {
    setSearchQuery(event)
  }
  const gotoSearchTab = () => {
    navigation.navigate('ExploreTab')
  }
  const [showBookPreview, setShowBookPreview] = React.useState(false)
  const handleToggleBookPreview = () => {
    setShowBookPreview((prevState) => !prevState)
  }

  const [newCollectionList, setNewCollectionList] = React.useState([])
  const [isLoadingCollections, setIsLoadingCollections] = useState(false)
  const [allBookTags, setAllBookTags] = useState(['All'])
  const [isAllBookTagsLoading, setIsAllBookTagsLoading] = useState(false)
  const [allBooks, setAllBooks] = useState([])
  const [isLoadingAllBooks, setIsLoadingAllBooks] = useState(false)
  const [limitBookToLoad, setLimitBookToLoad] = useState(TOTAL_BOOK_LOAD_LIMIT)

  const getAllBookTags = (allTagsList) => {
    let booktags = []
    allTagsList.map((book) => {
      const arrayOfBookTags = book?.tags
      arrayOfBookTags?.forEach((tag) => {
        booktags.push(tag)
      })
      return booktags
    })
    const uniqueBookTags = [...new Set(booktags)]
    setAllBookTags(['All', ...uniqueBookTags])
  }

  React.useEffect(() => {
    const getBooks = async (db) => {
      const booksCollectionRef = collection(db, 'books');
      const top100NewCollection = query(booksCollectionRef, limit(TOTAL_BOOK_LOAD_LIMIT), orderBy('createdAt'));
      const bookSnapshot = await getDocs(top100NewCollection);
      const cityList = bookSnapshot.docs.map(doc => {
       return { docId: doc.id,...doc.data()}
      });
      return setNewCollectionList([...cityList]);
    }
    getBooks(db)
  }, [])

  React.useEffect(() => {
    const getAllBooks = async (db) => {
      setIsLoadingAllBooks(true)
      const booksCollectionRef = collection(db, 'books');
      const top100NewCollection = query(booksCollectionRef, limit(limitBookToLoad), orderBy('title'));
      const bookSnapshot = await getDocs(top100NewCollection);
      const bookList = bookSnapshot.docs.map(doc => {
       return { docId: doc.id,...doc.data()}
      });
      setIsLoadingAllBooks(false)
      getAllBookTags([...bookList])
      return setAllBooks([...bookList]);
    }
    getAllBooks(db)
  }, [limitBookToLoad])
  

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
        setLimitBookToLoad(prevState => {
          return prevState + TOTAL_BOOK_LOAD_LIMIT
        })
      }
    }}
    >
      <Text style={styles.headerText}>Home</Text>
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
          onFocus={gotoSearchTab}
          style={{fontSize: 25, backgroundColor: '#bf0000', color: COLORS.WHITE, height: 65, borderRadius: 15, paddingHorizontal: 20}}
        />
      </View>
      <View>
        <Text  style={styles.newCollectionText}>New Collection </Text>
      </View>
      <ScrollView style={{paddingLeft: 22, height: 'auto', marginBottom: 30}} horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{display: 'flex', flexDirection:'row', width: '100%', justifyContent: 'space-between', paddingRight: 22}}>
        {
          isLoadingCollections && (<ActivityIndicator animating={true} color={COLORS.WHITE} style={{height: 180}} />)
        }
        {
          !isLoadingCollections && newCollectionList?.map((data, index) => {
            return <CollectionList key={index} data={data} handleToggleBookPreview={handleToggleBookPreview} parentNavigationProps={parentNavigationProps}/>
          })
        }
        </View>
      </ScrollView>

      <ScrollView style={{paddingLeft: 22, height: 'auto', marginBottom: 30}} horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{display: 'flex', flexDirection:'row', width: '100%', justifyContent: 'space-between', paddingRight: 22}}>
          {
            isAllBookTagsLoading && (<ActivityIndicator animating={true} color={COLORS.WHITE}/>)
          }
          {
            !isAllBookTagsLoading && allBookTags?.map((data, index) => {
              return (<TagList data={data} key={index}/>)
            })
          }
        </View>
      </ScrollView>

      <View style={{width: '100%', height: 'auto', backgroundColor: COLORS.WHITE, height: 'auto', paddingVertical: 15, borderTopRightRadius: 18,  borderTopLeftRadius: 18, paddingHorizontal: 5}}>
        {allBooks?.map((data, index) => {
            return (<BookList key={index} data={data}/>)
          })
        }
        {isLoadingAllBooks && (<ActivityIndicator animating={true}  color={COLORS.RED} style={{height: 250}}/>)}
      </View>
      
    </ScrollView>
  )
}

export default HomeTab

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