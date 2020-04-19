import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const AllUser = (props) => {

    const [employees, setEmployees] = useState([]);
    const [modalDisplay, setModalDisplay] = useState(false);
    const [modalYesNoDisplay, setModalYesNoDisplay] = useState(false);
    const [employee, setEmployee ] = useState();

    const loadData = () => {
        fetch('http://10.0.2.2/my_api/employee_list.php', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setEmployees(responseJson.employees);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    loadData();

    const navigateToAddEmployee = () => {
        props.navigation.navigate('AddEmployee', {navType:'Add_Employee'});
    }

    const navigateToEditEmployee = () => {
        hideModal();
        props.navigation.navigate('AddEmployee', {navType:'Edit_Employee', employee:employee})
    }

    const navigateToEmpDetailEmployee = () => {
        hideModal();
        props.navigation.navigate('EmployeeDetails');
    }

    const showModal = (emp) => {
        setModalDisplay(true);
        setEmployee(emp);
    }

    const hideModal = () => {
        setModalDisplay(false);
    }

    const deleteAnEmployee = () => {
        setModalYesNoDisplay(false);
        fetch('http://10.0.2.2/my_api/empoyee_delete.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: employee.id
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const imageUri = { uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' };
    return (
        <View style={{ flex: 1 }}>
            <Modal isVisible={modalDisplay}>
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                    <Text style={styles.modal_header}>
                        Choose an option
                    </Text>
                    <View style={styles.devider} />
                    <Text style={styles.modal_text}
                        onPress={() => navigateToEditEmployee()}>
                        Edit Employee
                    </Text>
                    <View style={styles.devider} />
                    <Text style={styles.modal_text}
                        onPress={() => {
                            hideModal();
                            setModalYesNoDisplay(true);
                        }}>
                        Delete Employee
                    </Text>
                    <View style={styles.devider} />
                    <Text style={styles.modal_cancel}
                        onPress={() => hideModal()}>
                        Cancel
                    </Text>
                </View>
            </Modal>

            <Modal isVisible={modalYesNoDisplay}>
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                    <Text style={styles.modal_text_delete}>
                        Are you sure want to delete this employee?
                    </Text>
                    <View style={styles.devider} />
                    <View style={{ flexDirection: 'row-reverse', backgroundColor: 'white' }}>
                        <Text style={styles.delete_modal_cancel}
                            onPress={() => setModalYesNoDisplay(false)}>
                            Cancel
                        </Text>
                        <Text style={styles.delete_modal_cancel}
                            onPress={() => deleteAnEmployee()}>
                            Delete
                        </Text>
                    </View>
                </View>
            </Modal>

            <FlatList data={employees}
                renderItem={({ item }) => <TouchableOpacity
                    onPress={() => showModal(item)}
                    onLongPress={() => showModal()}
                    style={{ flexDirection: 'column' }}>

                    <View style={{ flexDirection: "row" }}>
                        <View >
                            <Image style={styles.imageStyle} source={imageUri}></Image>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 10, justifyContent: 'center' }}>
                            <Text style={styles.row_header}>{item.name}</Text>
                            <Text style={styles.row_specialisation}>{item.specialisation}</Text>
                            <Text style={styles.row_email}>{item.email}</Text>
                        </View>
                        <View style={{ justifyContent: "center", }}>
                            <View style={styles.gender_text_container}>
                                <Text style={styles.gender_text}>{item.gender}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.devider} />
                </TouchableOpacity>}>
            </FlatList>

            <TouchableOpacity style={styles.plus_container}
                onPress={() => navigateToAddEmployee()}>
                <Text style={styles.plus_style}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    imageStyle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        margin: 10,
    },
    devider: {
        width: '100%',
        height: .8,
        backgroundColor: '#999999'
    },
    gender_text_container: {
        justifyContent: "center",
        marginRight: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#CCCCCC',
    },
    gender_text: {
        fontSize: 22,
        fontWeight: "bold",
        margin: 10
    },
    row_header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 2
    },
    row_specialisation: {
        fontSize: 14,
        fontWeight: "normal",
        color: '#000000'
    },
    row_email: {
        fontSize: 14,
        fontWeight: "normal",
        color: '#999999'
    },
    plus_style: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    plus_container: {
        width: 80,
        height: 80,
        backgroundColor: 'yellow',
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1
    },
    modal_text: {
        textAlign: 'center',
        backgroundColor: 'white',
        paddingVertical: 15,
        fontSize: 20
    },
    modal_header: {
        textAlign: 'center',
        backgroundColor: 'white',
        paddingVertical: 15,
        fontSize: 20,
        color: 'rgb(3, 132, 252)',
    },
    modal_cancel: {
        textAlign: 'center',
        backgroundColor: 'white',
        paddingVertical: 15,
        fontSize: 20,
        color: 'rgb(3, 132, 252)',
    },
    modal_text_delete: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 25,
        fontSize: 20
    },
    delete_modal_cancel: {
        textAlign: 'center',
        backgroundColor: 'white',
        paddingVertical: 12,
        fontSize: 20,
        color: 'rgb(3, 132, 252)',
        marginHorizontal: 20,
    }
})

export default AllUser;