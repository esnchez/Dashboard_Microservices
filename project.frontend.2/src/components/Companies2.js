import React, { useEffect, useState } from "react";
import { Table } from 'semantic-ui-react'

import Teams from "./Teams"


export default function Companies2() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [headers, setHeaders] = useState([]);
  const [items, setItems] = useState([]);

  const [trigger, setTrigger] = useState(false);
  const [id, setId] = useState(null);




  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:3000/api/companies")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result.data)
          setHeaders(Object.keys(result.data[0]))

          setItems(result.data);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])


  const pulsar = (id) => {
    setId(id)
    console.log(trigger)
    setTrigger(true)
    console.log("after", trigger)

  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (

      <div>
        <Table class="ui striped table">
          <thead>
            <tr >
              <th>Company Name</th>
              <th>Sector</th>
              <th>City </th>
              <th>Teams</th>
            </tr>
          </thead>
          <tbody> {
            items.map(item => (
              <tr key={item.CompanyId} class="center aligned">
                <td>{item.Name}</td>
                <td>{item.Sector}</td>
                <td>{item.City}</td>
                <td>
                  <button onClick ={() => pulsar()}>
                  <i class="eye icon"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
    // <ul>
    //   {
    //     items.map(item => (
    //       <li key={item.CompanyId}>
    //         <button onClick={() =>
    //           pulsar(item.CompanyId)}>
    //           {item.Name}
    //         </button>

    //       </li>
    //     ))}

    {/* {trigger && <Teams id={this.props.id}/>} */ }
    // </ul>

  }
}
