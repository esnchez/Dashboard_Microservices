async function getCompanies() {
    const response = await fetch(process.env.REACT_APP_SERVER_URL_CREATE_USER, requestOptions);
      const data = await response.json();
      return data;
}
//     async function createUser(obj) {
//       const requestOptions = {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(obj)
//       };
//       const response = await fetch(process.env.REACT_APP_SERVER_URL_CREATE_USER, requestOptions);
//       const data = await response.json();
//       return data;
//     }
//     if (user !== undefined) {
//       const obj = {
//         email: user.email
//       }
//       createUser(obj);
//     }
//   }


function Companies(){

    

    return (
        <div> 
            <p>
                This is my companies list
            </p>
        </div>

    )    
}

export default Companies