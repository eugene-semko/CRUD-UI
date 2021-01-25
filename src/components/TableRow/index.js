import React, {useState} from 'react'
import {baseUrl} from '../../table/Table'

export const TableRow = (props) => {
    const {
        id,
        readOrNot,
        setResponseData,
        responseData
    } = props
    const [name, setName] = useState(props.name)
    const [age,setAge] = useState(props.age)
    const [email, setEmail] = useState(props.email)
    const [isEditable, setIsEditable] = useState(false)

    /* handlers */
    const deleteHandler = () => {
        fetch(baseUrl+'/'+id, {
            method:'DELETE'
        }).then(response => {
            return response.json()
        }).then(isRowDeleted => {
            if (isRowDeleted) {
                //all ids which != deleted id
                setResponseData(responseData.filter(item => {
                    return item._id != id
                }))
            }
        })
    }

    const updateUser = () => {
        const dataToAdd = {
            data:{
                name: name,
                age: age,
                email: email
            }
        }
        fetch(baseUrl+'/'+id,{
            method:'POST',
            body: JSON.stringify(dataToAdd),
            headers: {
                'Content-Type': 'application/json'
              }
        }).then(response => {
            return response.json()
        }).then(data => {
            //data == new element
            const newUsers = responseData.map(user => {
                if (user._id === data._id){
                    return data
                }
                return user
            })
            setResponseData(newUsers)
        })
    }

    const toggleEdit = () => {
        if (isEditable) {
            updateUser()

        }
        setIsEditable(!isEditable)
    }

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


    return (
        <tr>
            <th>
                <input
                    value={name}
                    readOnly = {!isEditable} 
                    onChange = {setNameHandler}
                />
            </th>
            <th>
                <input 
                    value={age}
                    readOnly = {!isEditable} 
                    onChange = {setAgeHandler}
                />
            </th>
            <th>
                <input 
                    value={email} 
                    readOnly = {!isEditable} 
                    onChange = {setEmailHandler}
                />
            </th>
            <th>
                <button onClick = {deleteHandler}>
                    Удалить
                </button>
            </th>
            <th>
                <button onClick = {toggleEdit}>
                    {isEditable ? 'Сохранить' : 'Редактировать'}
                </button>
            </th>
        </tr>
    )
}