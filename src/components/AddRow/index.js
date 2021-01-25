import React, {useState} from 'react'
import {baseUrl} from '../../table/Table'

export const AddRow = (props) => {
    const {
        setResponseData,
        responseData
    } = props
    const [name, setName] = useState('')
    const [age,setAge] = useState('')
    const [email, setEmail] = useState('')

    /* handlers */

    /* fields handlers */
    const setAgeHandler = ({target}) => {
        setAge(target.value)
    }
    const setNameHandler = ({target}) => {
        setName(target.value)
    }
    const setEmailHandler = ({target}) => {
        setEmail(target.value)
    }

    /* handlers */
    const addData = (event) => {
        event.preventDefault()
        const dataToAdd = {
            data:{
                name: name,
                age: age,
                email: email
            }
        }
        fetch(baseUrl,{
            method:'PUT',
            body: JSON.stringify(dataToAdd),
            headers: {
                'Content-Type': 'application/json'
              }
        }).then(response => {
            return response.json()
        }).then(data => {
            setResponseData([...responseData, data])
        })
    }

    console.log(name)
    return (
        <form onSubmit = {addData}>
            <input placeholder = 'NAme' name = 'name' value={name} onChange={setNameHandler}/>
            <input placeholder = 'Возраст' name = 'car' value={age} onChange = {setAgeHandler}/>
            <input placeholder = 'Почта' name = 'time' value={email} onChange = {setEmailHandler}/>
            <input type = 'submit' value = 'Создать запись'/>
        </form>
    )
}