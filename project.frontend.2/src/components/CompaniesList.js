import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { Table } from 'semantic-ui-react'


export default function CompaniesList() {

  const [items, setItems] = useState([]);
  

  useEffect(() => {
    document.body.style.backgroundColor = "lightblue"
    getCompanies()
  }, [])


  //API CALLS 
  const getCompanies = async () => {
    const data = await fetch(process.env.REACT_APP_API_COMPANIES)
    const response = await data.json()
    setItems(response.data)
  }

  return (

    <div>
        <Table className="ui striped table">
          <thead>
            <tr >
              <th>Company Name</th>
              <th>Sector</th>
              <th>City </th>
              <th>Teams</th>
            </tr>
          </thead>
          <tbody>{
            items.map(item => (
              <tr key={item.CompanyId} className="center aligned">
                <td>{item.Name}</td>
                <td>{item.Sector}</td>
                <td>{item.City}</td>
                <td>
                  <Link to={`/companies/${item.CompanyId}`}>
                    <i className="eye icon"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </div>
  )
}

