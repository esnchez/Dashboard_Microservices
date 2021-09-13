import React, { useEffect, useState } from "react";

import { Table } from 'semantic-ui-react'
import Employees from "./Employees";


export default function Teams(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [items, setItems] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [teamId, setTeamId] = useState(null);



    const [showTeams, setShowTeams] = useState(false);
    const [showEmployees, setShowEmployees] = useState(false);


    useEffect(() => {
        setItems(props.teams)

        console.log("emp ",employees)
        if (!props.teams.length == 0) {
            setShowTeams(true)
        }
        if (!employees.length == 0){
            setShowTeams(false)
        }

    })

    const fetchEmployees = (id) => {
        return fetch(`http://localhost:3000/api/teams/${id}`)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            // setIsLoaded(true);
                            setEmployees(result.data);
                            // setShowTeams(true)
                        },
                        (error) => {
                            //setIsLoaded(true);
                            setError(error);
                        })
      }
  



    const pulsar = (id) => {
        setShowTeams(!showTeams)
        fetchEmployees(id)
        setTeamId(id)
    
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    // else if (!isLoaded) {
    // return <div>Loading...</div>;}
    else {
        return (
            <div> {showTeams &&
                <Table class="ui striped table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Employees</th>
                        </tr>
                    </thead>
                    <tbody> {
                        items.map(item => (
                            <tr key={item.TeamId} class="center aligned">
                                <td>{item.Name}</td>
                                <td>{item.Type}</td>
                                <td >
                                    <button onClick={() => pulsar(item.TeamId)}>
                                        <i class="eye icon"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>}

                <div>
                    {<Employees employees={employees} teamId = {teamId}/>}
                </div>


            </div>




        );
    }
}