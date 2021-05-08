import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import {SearchBar, Header} from 'react-native-elements';
import db from '../config'
export default class ReadStoryScreen extends React.Component{
    constructor(){
        super();
        this.state={
            allStories:[],
            dataSource:[],
            search:''
        }
    }
    retrieveStories=()=>{
        try{
var allStories=[]
var stories = db.collection("stories").get().then((querySnapshot)=>{
    querySnapshot.forEach((doc)=>{
        allStories.push(doc.data())
        console.log('these are the stories', allStories)
    })
    this.setState({allStories})
})

        }
        catch(error){
            console.log(error)
        }
    }
    componentDidMount(){
        this.retrieveStories()
    }
    updateSearch=search=>{
        this.setState({search})
    }
    searchFilterFunction(text){
        const newData=this.state.allStories.filter((item)=>{
            const itemData=item.title ? item.title.toUpperCase() : ''.toUpperCase()
            const textData=text.toUpperCase();
            return itemData.indexOf(textData)>-1;
            
        });
        this.setState({
            dataSource:newData,
            search:text
        })
        
    }
    render(){
        return(
            <View>
                <Header background={'pink'}centerComponent={{
                    text:'Bed Time Stories',
                    style : { color: 'white', fontSize: 20}
                }}
            />
          <View styles ={{height:20,width:'100%'}}>
              <SearchBar
              placeholder="Type Here..."
              onChangeText={text => this.SearchFilterFunction(text)}
              onClear={text => this.SearchFilterFunction('')}
              value={this.state.search}
            />
          </View>
               
                <FlatList
                data={this.state.allStories}
                renderItem={({item})=>(
                    <View style={styles.itemContainer}>
<Text>Title:{item.title}</Text>
<Text> {item.author}</Text>
                    </View>

                )}
                keyExtractor={(item,index)=>index.toString()}>
                

            </FlatList>
            </View>
        )
    }
}