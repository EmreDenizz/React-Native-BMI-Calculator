/**
 * @file app.js -> React Native - Map App
 * @author Emre Deniz
 */

import React from 'react';
import {View, SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'

export default function App() {
    // State hooks
    const [height, setHeight] = React.useState('');
    const [heightPlaceholder, setHeightPlaceholder] = React.useState('Your Height in cm');
    const [weight, setWeight] = React.useState('');
    const [weightPlaceholder, setWeightPlaceholder] = React.useState('Your Weight in kg');
    const [bmi, setBmi] = React.useState('');
    const [bmiColor, setBmiColor] = React.useState('black');
    const [selectedUnit, setSelectedUnit] = React.useState("");
  
    // Calculate button function
    function onClickCalculateButton() {
        // Calculate bmi with related formulas
        var bmiCalculated = 0;
        if(selectedUnit == 'Imperial System'){
            bmiCalculated = (weight / (height * height) * 703).toFixed(1);
        }
        else{
            var heightM = height / 100;
            bmiCalculated = (weight / (heightM * heightM)).toFixed(1);
        }

        // Set bmi color
        if(bmiCalculated < 18.5){ setBmiColor('blue'); }
        else if(bmiCalculated < 25){ setBmiColor('green'); }
        else if(bmiCalculated < 30){ setBmiColor('orange'); }
        else if(bmiCalculated >= 30){ setBmiColor('red'); }

        setBmi(bmiCalculated);
    };

    // Clear button function
    function onClickClearButton() {
        setHeight('');
        setWeight('');
        setBmi('');
    };

    // Option selected function
    function togglePlaceholders() {
        // Reset height, weight and bmi values
        setHeight('');
        setWeight('');
        setBmi('');

        // Change height and weight placeholders
        if(selectedUnit == 'Imperial System'){
            setHeightPlaceholder('Your Height in inches');
            setWeightPlaceholder('Your Weight in lbs');
        }
        else{
            setHeightPlaceholder('Your Height in cm');
            setWeightPlaceholder('Your Weight in kg');
        }
    };

    // Options for select menu
    const data = [
        {key: 0, value: 'International System'},
        {key: 1, value: 'Imperial System'}
    ]

    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.wrapper}>
                {/* Header Title */}
                <Text style={styles.header}>BMI CALCULATOR</Text>

                {/* Unit System Options */}
                <SelectList 
                    data={data}
                    defaultValue={'international_system'}
                    defaultOption={{key: 0, value:'International System'}}
                    setSelected={(val) => setSelectedUnit(val)}
                    onSelect={togglePlaceholders}
                    save="value"
                    search={false}
                    maxHeight={100}
                />
                
                {/* Height and weight input fields */}
                <TextInput
                    style = {styles.inputStyle}
                    value = {height}
                    onChangeText = {text => setHeight(text)}
                    placeholder = {heightPlaceholder}
                    keyboardType="numeric"
                />
                <TextInput
                    style = {styles.inputStyle}
                    value = {weight}
                    onChangeText = {text => setWeight(text)}
                    placeholder = {weightPlaceholder}
                    keyboardType="numeric"
                />

                {/* Calculate button */}
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: 'green'}]}
                    onPress = {onClickCalculateButton}>
                    <Text style={[{color: 'white'}, {fontSize: 22}, {fontWeight: 'bold'}, , {textAlign: 'center'}]}>CALCULATE</Text>
                </TouchableOpacity>

                {/* Clear button */}
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: 'red'}]}
                    onPress = {onClickClearButton}>
                    <Text style={[{color: 'white'}, {fontSize: 22}, {fontWeight: 'bold'}, {textAlign: 'center'}]}>CLEAR</Text>
                </TouchableOpacity>
            </View>

            {/* BMI Result */}
            <Text style = {[styles.output, {color: bmiColor}]}>{bmi}</Text>

            {/* Explanations of Result */}
            <Text style={styles.explanations}>
                <Text style={{fontWeight: 'bold'}}>BODY MASS INDEX</Text>{'\n'}
                Below 18.5: <Text style={{color: 'blue', fontWeight: 'bold'}}>Underweight</Text>{'\n'}
                18.5 - 24.9: <Text style={{color: 'green', fontWeight: 'bold'}}>Healthy Weight</Text>{'\n'}
                25.0 - 29.9: <Text style={{color: 'orange', fontWeight: 'bold'}}>Overweight</Text>{'\n'}
                30.0 and above: <Text style={{color: 'red', fontWeight: 'bold'}}>Obesity</Text>
            </Text>
        </SafeAreaView>
    );
};

// Style definitions
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcf9f6'
    },
    wrapper: {
        borderWidth: 2,
        borderColor: 'black',
        padding: 10,
        borderRadius: 10
    },
    header: {
        fontSize: 26,
        marginBottom: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputStyle: {
        fontSize: 20,
        padding: 10,
        marginTop: 10,
        height: 50,
        width: 300,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10
    },
    button: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        borderRadius: 10,
        width: 300
    },
    output: {
        fontSize: 44,
        fontWeight: 'bold',
        marginTop: 10
    },
    explanations: {
        fontSize: 20,
        marginTop: 5
    }
});
