import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

import EmployeeForm from "./EmployeeForm";
import { Table, Button } from 'semantic-ui-react'



export default function Employees() {


    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);


    const { id } = useParams()

    useEffect(() => {
        getEmployees()
    }, [])

    //API CALLS ///////////////
    const getEmployees = async () => {
        const data = await fetch(process.env.REACT_APP_API_TEAMS + id)
        const response = await data.json()
        setItems(response.data)
    }

    const postEmployee = async (employee) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        };
        const data = await fetch(process.env.REACT_APP_API_POST_EMPLOYEE, requestOptions)
        const response = await data.json()

        postEmployeeToTeam(response.data.insertId)
    }

    const postEmployeeToTeam = async (employeeId) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ TeamId: id, EmployeeId: employeeId })
        };
        const data = await fetch(process.env.REACT_APP_API_POST_PIVOT, requestOptions)
        const response = await data.json()
    }

    ///Open close the form to add new employees
    const openCloseForm = () => {
        setShowForm(!showForm)
    }

    //Add the employee to list using the form 

    const addEmployee = (employee) => {
        if (!employee.Name || !employee.Surname || !employee.DNI || !employee.Salary) {
            return;
        }
        //Post to API (above)
        postEmployee(employee)

        //Update front-end with new employee
        const newEmployeesArray = [employee, ...items];
        setItems(newEmployeesArray);
    };



    return (
        <div>
            <Table className="ui striped table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>DNI</th>
                        <th>Salary (€/year)</th>
                    </tr>
                </thead>
                <tbody>{
                    items.map(item => (
                        <tr key={item.EmployeeId} className="center aligned">
                            <td>{item.Name}</td>
                            <td>{item.Surname}</td>
                            <td>{item.DNI}</td>
                            <td>{item.Salary}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div >
                <Button className="ui button" tabIndex="0" onClick={openCloseForm}>
                    Add Employee
                </Button>
            </div>

            <div>
                { showForm && <EmployeeForm onSubmit={addEmployee} />
                }
            </div>

        </div>

    )
}
