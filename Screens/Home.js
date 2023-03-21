import { View, Text,TextInput, FlatList, Keyboard, TouchableOpacity,StyleSheet,Pressable } from 'react-native'
import React, {useState,useEffect} from 'react'
import {firebase} from '../config'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Home = () => {

    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        todoRef
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            querySnapshot =>{
                const todos =[]
                querySnapshot.forEach((doc) =>{
                    const {heading} = doc.data()
                    todos.push({
                        id:doc.id,
                        heading,
                    })
                })
                setTodos(todos)
            }
        )
    }, [])
    //delete a todo
    const deleteTodo = (todos) => {
        todoRef
        .doc(todos.id)
        .delete()
        .then(()=>{
            //show a successful alert
            alert("Deleted Successfully")
        })
        .catch(error =>{
            alert(error);
        })
    }
    //add a todo
    const addTodo = () =>{
        //check ifwe have a todo
        if(addData && addData.length > 0){
            //get the timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading : addData,
            createdAt: timestamp            
        };
        todoRef
        .add(data)
        .then(() => {
            setAddData('');
            //release keyboard
            Keyboard.dismiss();
        })
        .catch((error) =>{
            alert(error);
        })
    }
}

    return (
        <View style={styles.main}>
            <View style={styles.formContainer}>
                <TextInput
                style={styles.input}
                placeholder='Kya krna h bhai aaj??'
                placeholderTextColor='#aaaaaa'
                onChangeText={(heading) => setAddData(heading)}
                value={addData}
                underlineColorAndroid='transparent'
                />

                <TouchableOpacity 
                style={styles.button} onPress={addTodo} >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList
             data={todos}
             numColumns={1}
             renderItem={({item}) =>(
                <View>
                    <Pressable 
                    style={styles.container}
                    onPress={() => navigation.navigate('Detail', {item})} >
                        <FontAwesome 
                        name = 'trash-o'
                        color='red'
                        onPress={()=>deleteTodo(item)}
                        style = {styles.todoIcon} />
                        <View style={styles.innerContainer}>
                            <Text style={styles.itemHeading}>
                                {item.heading[0].toUpperCase()+item.heading.slice(1)}
                            </Text>
                        </View>

                    </Pressable>

                </View>
             )} 
             /><View>
                <Text style={styles.footer}>Powered By : NXT-INN All Rights Reserved</Text>
             </View>
        </View>
    )
}
const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:'#343434'
    },
    container:{
        backgroundColor:'#e5e5e5',
        padding:15,
        borderRadius:20,
        margin:5,
        marginHorizontal:10,
        flexDirection:'row',
        alignItems:'center'
    },
    innerContainer:{
        alignItems:'center',
        flexDirection:'column',
        marginLeft:45,
    },
    itemHeading:{
        fontWeight:'bold',
        fontSize:18,
        marginRight:22,
    },
    formContainer:{
        flexDirection:'row',
        height:80,
        marginLeft:10,
        marginRight:10,
        marginTop:80,
    },
    input:{
        height:48,
        borderRadius:24,
        overflow:'hidden',
        backgroundColor:'white',
        paddingLeft:16,
        flex:1,
        marginRight:5,
    },
    button:{
        height:48,
        borderRadius:60,
        backgroundColor:'#FFD132',
        width:60,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText:{
        color:'black',
        fontSize:20,
    },
    todoIcon:{
        marginTop:5,
        fontSize:20,
        marginLeft:14,

    },
    footer:{
        backgroundColor:'#FFD132',
        textAlign:'center',
        fontWeight:600
    }

})
export default Home