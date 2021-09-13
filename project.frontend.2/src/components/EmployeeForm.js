import React ,{  useState, useEffect } from 'react'
import { Button, Form } from 'semantic-ui-react'

function EmployeeForm(props){

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDNI] = useState('');
    const [salary, setSalary] = useState('');

    // const postData = () => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ Name: firstName, Surname: lastName, DNI: dni, Salary: salary})
    //     };
    //     console.log(requestOptions.body)
    //     fetch('http://localhost:3000/api/employees/create', requestOptions)
    //         .then(response => response.json())
        
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        props.onSubmit({
          Name: firstName,
          Surname: lastName,
          DNI: dni,
          Salary: salary,
        });

        setFirstName("");
        setLastName("");
        setDNI("");
        setSalary("");
      };
    
    //useEffect(() => {
        // POST request using fetch inside useEffect React hook
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ Name: firstName, Surname: lastName, Dni: dni, Salary: salary,  })
        // };
        // fetch('hhttp://localhost:3000/api/employees/create', requestOptions)
        //     .then(response => response.json())
            //.then(data => setPostId(data.id));
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    //}, []);

    //const teamId = this.props.teamId

    // useEffect(() => {
    //     fetch("http://localhost:3000/api/teams/create")
    //       .then(res => res.json())
    //       .then(
    //         (result) => {
    //         //   setIsLoaded(true);
    //           setEmployees(result.data);
    //         },
    //         // Nota: es importante manejar errores aquí y no en 
    //         // un bloque catch() para que no interceptemos errores
    //         // de errores reales en los componentes.
    //         (error) => {
    //         //   setIsLoaded(true);
    //           setError(error);
    //         }
    //       )
    //   }, [])

    return(
        
    <Form onSubmit={handleSubmit}>
    <Form.Field>
        <label>First Name</label>
        <input placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
    </Form.Field>
    <Form.Field>
        <label>Last Name</label>
        <input placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
    </Form.Field>
    <Form.Field>
        <label>DNI</label>
        <input placeholder='DNI' onChange={(e) => setDNI(e.target.value)} />
    </Form.Field>  <Form.Field>
        <label>Salary</label>
        <input placeholder='Salary' onChange={(e) => setSalary(e.target.value)} />
    </Form.Field>
    
    <Button type='submit' onClick={handleSubmit} >Submit</Button>
</Form>
    )
}

export default EmployeeForm;