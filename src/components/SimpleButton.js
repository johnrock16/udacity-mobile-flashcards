import React from 'react';
import { TouchableOpacity,Text } from "react-native";
import { globalStyles } from "./globalStyles";

const SimpleButton = (props)=>(
    <TouchableOpacity style={[globalStyles.button,props?.style]} {...props}>
        <Text style={globalStyles.buttonText}>{props?.title}</Text>
    </TouchableOpacity>
)

export default SimpleButton;