import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'

function EmployeeForm(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDNI] = useState('');
    const [salary, setSalary] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        props.onSubmit({
            Name: firstName,
            Surname: lastName,
            DNI: dni,
            Salary: salary,
        });


        //Reset the fields from the Form' inputs 

        setFirstName("");
        setLastName("");
        setDNI("");
        setSalary("");
    };


    return (

        <Form className="form" onSubmit={handleSubmit}>
            <Form.Field>
                <label>First Name</label>
                <input placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
            </Form.Field>
            <Form.Field>
                <label>Last Name</label>
                <input placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} value={lastName} />
            </Form.Field>
            <Form.Field>
                <label>DNI</label>
                <input placeholder='DNI' onChange={(e) => setDNI(e.target.value)} value={dni} />
            </Form.Field>  <Form.Field>
                <label>Salary</label>
                <input placeholder='Salary' onChange={(e) => setSalary(e.target.value)} value={salary} />
            </Form.Field>

            <Button type='submit' onClick={handleSubmit} >Submit</Button>
        </Form>
    )
}

export default EmployeeForm;