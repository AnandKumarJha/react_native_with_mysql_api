import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AllEmployees from './AllEmployees';
import AddEmployee from './AddEmployee';
import EmployeeDetails from './EmployeeDetails';
import UpdateEmployee from './UpdateEmployee';

const App = createStackNavigator({
    AllEmployees: { screen: AllEmployees },
    AddEmployee: { screen: AddEmployee },
    EmployeeDetails: { screen: EmployeeDetails },
    UpdateEmployee: { screen: UpdateEmployee }
},
    {
        initialRouteName: 'AllEmployees',
    }
);
export default createAppContainer(App);