import React, { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import { Table, Button } from 'semantic-ui-react'



function Employees(props) {


    const [items, setItems] = useState([]);
    const [teamId, setTeamId] = useState(null);


    const [showEmployees, setShowEmployees] = useState(false);
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        setTeamId(props.teamId)
        if (items.length == 0) {
            setItems(props.employees)
        }
        if (!props.employees.length == 0) {
            setShowEmployees(true)
        }
    },[props.teamId,items.length,props.employees,props.employees.length])

    const postEmployee = (employee) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        };
        fetch('http://localhost:3000/api/employees/create', requestOptions)
            .then(response => response.json())
            .then(response => postEmployeeToTeam(response.data.insertId))
    }

    const postEmployeeToTeam = (employeeId) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ TeamId: teamId, EmployeeId: employeeId })
        };
        fetch('http://localhost:3000/api/employees/create/pivot', requestOptions)
            .then(response => response.json())
    }

    const pulsar = () => {
        setShowForm(!showForm)
    }

    const addEmployee = (employee) => {
        if (!employee.Name || !employee.Surname || !employee.DNI || !employee.Salary) {
            return;
        }

        //send to insert api
        postEmployee(employee)
        const newEmployeesArray = [employee, ...items];

        setItems(newEmployeesArray);
    };



    return (
        <div>
            {showEmployees &&

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
                        <Button className="ui button" tabIndex="0" onClick={pulsar}>
                            Add Employee
                        </Button>
                    </div>

                </div>
            }

            <div>
                {showForm && <EmployeeForm onSubmit={addEmployee} />
                }
            </div>

        </div>

    )
}

export default Employees