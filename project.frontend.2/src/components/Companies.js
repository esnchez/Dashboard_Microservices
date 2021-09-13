// import React, { useEffect, useState } from "react";

// import { Table } from 'semantic-ui-react'


// export default function Companies(props) {
//     // const response = await fetch(process.env.REACT_APP_SERVER_URL_CREATE_USER, requestOptions);  

//     const [items, setItems] = useState([]);
//     // const items = props.items

//     useEffect(() => {
//         setItems(props.items)
//     })

//     const pulsar = () => {

//     }

//     return (
//         <div> 
//             <Table class="ui striped table">
//           <thead>
//             <tr >
//               <th>Company Name</th>
//               <th>Sector</th>
//               <th>City </th>
//               <th>Teams</th>
//             </tr>
//           </thead>
//           <tbody> {
//             items.map(item => (
//               <tr key={item.CompanyId} class="center aligned">
//                 <td>{item.Name}</td>
//                 <td>{item.Sector}</td>
//                 <td>{item.City}</td>
//                 <td>
//                   <button onClick ={() => pulsar(item.CompanyId)}>
//                   <i class="eye icon"></i>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table> 
//         </div>

//     )    
// }
