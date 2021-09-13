import React, { useEffect, useState } from "react";

import { Table } from 'semantic-ui-react'



export default function Teams(props) {
    const [error, setError] = useState(null);
    //const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const TeamId = props
    console.log("sending ", TeamId)

    useEffect(() => {
        fetch("http://localhost:3000/api/companies/" + 2)
            .then(res => res.json())
            .then(
                (result) => {
                    //setIsLoaded(true);
                    setItems(result.data);
                },
                // Nota: es importante manejar errores aquí y no en 
                // un bloque catch() para que no interceptemos errores
                // de errores reales en los componentes.
                (error) => {
                    //setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    const pulsar = () => {

    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    //else if (!isLoaded) {
    //return <div>Loading...</div>;}
    else {
        return (
            <div>
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
                                    <button onClick={() => pulsar()}>
                                        <i class="eye icon"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}