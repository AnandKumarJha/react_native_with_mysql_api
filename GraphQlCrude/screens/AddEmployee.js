import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TextEdit, TextInput, TouchableOpacity, ScrollView, Picker } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

//https://www.npmjs.com/package/react-native-picker-select
//https://github.com/react-native-community/datetimepicker

const AddUser = (props) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [strDate, setStrDate] = useState("Select Date");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
    const [specialisation, setSpecialisation] = useState("");
    const [address, setAddress] = useState("");

    const [dataSetOnce, setDataSetOnce] = useState(false);

    let emailTextInput, phoneTextInput, specialisationTextInput, addressTextInput;
    const navType = props.navigation.state.params.navType;
    const singleEmployee = props.navigation.state.params.employee;

    console.log("asdf");

    const setData = () => {
        if(navType=='Edit_Employee' && !dataSetOnce){
            if(name==''){
                setName(singleEmployee.name);
            }
            if(email==''){
                setEmail(singleEmployee.email);
            }
            if(gender==''){
                setGender(singleEmployee.gender);
            }
            if(dob==''){
                setDob(singleEmployee.dob);
            }
            if(phone==''){
                setPhone(singleEmployee.phone);
            }
            if(specialisation==''){
                setSpecialisation(singleEmployee.specialisation);
            }
            if(address==''){
                setAddress(singleEmployee.address);
            }
            if(!dataSetOnce){
                setDataSetOnce(true);
            }
        }
    }

    setTimeout(()=>{
        setData();
    }, 200);
    

    const showDatepicker = () => {
        showMode('date');
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July",
        "Aug", "Sep", "Oct", "Nov", "Dec"];

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date; currentDate
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setStrDate(months[currentDate.getMonth()] + " " + currentDate.getDate() + ", " + currentDate.getFullYear())
    };

    const imageUri = { uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' };

    const onSubmit = () => {
        if (name == "") {
            alert("Please enter the name");
            return;
        }

        if (email == "") {
            alert("Please enter the email");
            return;
        }

        if (gender == "" || gender == "Select Gender..." || gender == null) {
            alert("Please enter the gender");
            return;
        }

        if (strDate == "") {
            alert("Please enter the dob");
            return;
        }

        if (phone == "") {
            alert("Please enter the phone");
            return;
        }

        if (specialisation == "") {
            alert("Please enter the specialisation");
            return;
        }

        if (address == "") {
            alert("Please enter the address");
            return;
        }

        var url = navType=='Add_Employee'?
        'http://10.0.2.2/my_api/employee_insert.php':
        'http://10.0.2.2/my_api/employee_update.php';

        var body1 = navType=='Add_Employee'?JSON.stringify({
            name : name,
            gender : gender,
            dob : strDate,
            specialisation : specialisation,
            email : email,
            phone : phone,
            address : address,
            profile_pic : '',
          }):JSON.stringify({
            id:singleEmployee.id,
            name : name,
            gender : gender,
            dob : strDate,
            specialisation : specialisation,
            email : email,
            phone : phone,
            address : address,
            profile_pic : '',
          });

        fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: body1,
    })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            props.navigation.goBack(null);
        })
        .catch((error) => {
            console.error(error);
            props.navigation.goBack(null);
        });
    }

    const [valueChanged, setValueChanged] = useState(false);

    setTimeout(() => {
        setValueChanged(true);
    }, 300);

    return (
        <View>
            <ScrollView>
                {/* <Text style={styles.header}>Add Employee</Text> 
                 <View style={{ alignItems: 'center' }}>
                    <Image style={styles.imageStyle} source={imageUri}></Image>
                </View>
                */}

                <Text
                    style={styles.textStyle}>
                    Employee name
                </Text>

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Name"
                    onChangeText={(text) => setName(text)}
                    returnKeyType={"next"}
                    onSubmitEditing={() => { emailTextInput.focus(); }}
                    blurOnSubmit={false}
                    defaultValue={singleEmployee.name}
                    keyboardType="default">
                </TextInput>

                <Text
                    style={styles.textStyle}>
                    Email
                </Text>

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Employee Email"
                    onChangeText={(text) => setEmail(text)}
                    returnKeyType={"next"}
                    ref={(input) => { emailTextInput = input; }}
                    onSubmitEditing={() => { phoneTextInput.focus(); }}
                    blurOnSubmit={false}
                    defaultValue={singleEmployee.email}
                    keyboardType="email-address">
                </TextInput>

                <Text
                    style={styles.textStyle}>
                    Gender
                </Text>

                <View style={styles.selectorStyle}>
                    <RNPickerSelect
                        placeholder={genderPlaceHolder}
                        style={pickerSelectStyles}
                        value={gender}
                        onValueChange={(value) => {
                            setGender(value);
                        }}
                        items={[
                            { label: 'Male', value: 'M' },
                            { label: 'Female', value: 'F' },
                            { label: 'Others', value: 'O' },
                        ]}
                    />
                </View>
                
                <Text
                    style={styles.textStyle}>
                    Date of Birth
                </Text>

                <TouchableOpacity onPress={() => { showDatepicker() }}>
                    <Text
                        style={styles.textInputStyleForDob}
                        placeholder="Enter DOB"
                        value={dob}>
                        {strDate}
                    </Text>
                </TouchableOpacity>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}

                <Text
                    style={styles.textStyle}>
                    Phone Number
                </Text>

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Phone Number"
                    onChangeText={(text) => setPhone(text)}
                    returnKeyType={"next"}
                    ref={(input) => { phoneTextInput = input; }}
                    onSubmitEditing={() => { specialisationTextInput.focus(); }}
                    blurOnSubmit={false}
                    defaultValue={singleEmployee.phone}
                    keyboardType="number-pad">
                </TextInput>

                <Text
                    style={styles.textStyle}>
                    Specialisation
                </Text>

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter Employee Specialisation"
                    onChangeText={(text) => setSpecialisation(text)}
                    returnKeyType={"next"}
                    ref={(input) => { specialisationTextInput = input; }}
                    onSubmitEditing={() => { addressTextInput.focus(); }}
                    blurOnSubmit={false}
                    defaultValue={singleEmployee.specialisation}
                    keyboardType="default">
                </TextInput>

                <Text
                    style={styles.textStyle}>
                    Address
                </Text>

                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter address"
                    onChangeText={(text) => setAddress(text)}
                    ref={(input) => { addressTextInput = input; }}
                    defaultValue={singleEmployee.address}
                    keyboardType="default">
                </TextInput>

                <TouchableOpacity style={styles.buttonStyle} onPress={() => onSubmit()}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>
                        {navType==
                        'Add_Employee'?'Add New Employee':'Update Employee'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    header: {
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    textStyle: {
        fontSize: 16,
        color: 'black',
        marginVertical: 5,
        marginHorizontal: 10,
    },
    textInputStyle: {
        borderColor: '#CCCCCC',
        borderWidth: 1.5,
        borderRadius: 5,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 14,
    },
    textInputStyleForDob: {
        borderColor: '#CCCCCC',
        borderWidth: 1.5,
        borderRadius: 5,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
    },
    buttonStyle: {
        backgroundColor: 'rgb(3, 132, 252)',
        textAlign: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    imageStyle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 10,
        textAlign: "center",
    },
    selectorStyle: {
        borderColor: '#CCCCCC',
        borderWidth: 1.5,
        borderRadius: 5,
        marginHorizontal: 10,
        paddingVertical: -3,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        borderColor: '#CCCCCC',
        borderWidth: 1.5,
        borderRadius: 5,
        marginHorizontal: 10,
        paddingTop: 5,
        paddingRight: 30, // to ensure the text is never behind the icon
        paddingBottom: 5,
        paddingLeft: 5,
        fontSize: 18,
    },
    inputAndroid: {
        color: 'black',
        borderColor: '#CCCCCC',
        borderWidth: 1.5,
        borderRadius: 5,
        marginHorizontal: 5,
        marginVertical: -5,
        paddingRight: 30, // to ensure the text is never behind the icon
        paddingBottom: 5,
        paddingLeft: 5,
        fontSize: 18,
    },
});

const genderPlaceHolder = {
    label: 'Select Gender...',
    value: null,
};


export default AddUser;