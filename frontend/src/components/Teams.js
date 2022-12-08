import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

import { Table } from 'semantic-ui-react'


export default function Teams() {

    const [items, setItems] = useState([]);

    const { id } = useParams()

    useEffect(() => {
        getTeams()
    }, [])

    const getTeams = async () => {
        const data = await fetch(process.env.REACT_APP_API_COMPANIES + id)
        const response = await data.json()
        setItems(response.data)
    }

    return (
        <div>
            <Table className="ui striped table">
                <thead>
                    <tr className="center aligned">
                        <th>Name</th>
                        <th>Type</th>
                        <th>Employees</th>
                    </tr>
                </thead>
                <tbody>{
                    items.map(item => (
                        <tr key={item.TeamId} className="center aligned">
                            <td>{item.Name}</td>
                            <td>{item.Type}</td>
                            <td >
                                <Link to={`/companies/teams/${item.TeamId}`}>
                                    <i className="eye icon"></i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}