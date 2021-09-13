import React, { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import { Table, Button } from 'semantic-ui-react'



function Employees(props) {

    const [error, setError] = useState(null);

    // const [employees, setEmployees] = useState([]);
    const [items, setItems] = useState([]);
    const [teamId, setTeamId] = useState(null);


    const [showEmployees, setShowEmployees] = useState(false);
    const [showForm, setShowForm] = useState(false);


    //const teamId = this.props.teamId

    useEffect(() => {
        setTeamId(props.teamId)
        if(items.length == 0){
            setItems(props.employees)
        }
        if (!props.employees.length == 0) {
            setShowEmployees(true)
        }


    })

    const postEmployee = (employee) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        };
        console.log(requestOptions.body)
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
        console.log("emplos " ,props.employees)
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
                    <Table class="ui striped table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last Name</th>
                                <th>DNI</th>
                                <th>Salary (€/year)</th>
                            </tr>
                        </thead>
                        <tbody> {
                            items.map(item => (
                                <tr key={item.EmployeeId} class="center aligned">
                                    <td>{item.Name}</td>
                                    <td>{item.Surname}</td>
                                    <td>{item.DNI}</td>
                                    <td>{item.Salary}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div >
                        <Button class="ui button" tabindex="0" onClick={pulsar}>
                            Add Employee
                        </Button>
                    </div>

                </div>
            }
            <p>
                <div>
                    {showForm && <EmployeeForm onSubmit={addEmployee} />
                    }
                </div>
            </p>


        </div>


    )
}

export default Employees