import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { globalStyles } from './globalStyles';

const FlashCardComponent=(props)=>{
    const {title,text,...otherProps} = props;
    return(
        <TouchableOpacity style={styles.container} {...otherProps}>
            <Text style={[globalStyles.title,{padding:10,color:'white'}]}>{title}</Text>
            <Text style={[globalStyles.title,{padding:10,color:'white', fontWeight:'normal'}]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default FlashCardComponent;

const styles = StyleSheet.create({
    container:{minWidth: 200,minHeight:150,backgroundColor:'#59DBEB',marginTop:5,}
})