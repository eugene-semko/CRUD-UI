import React, { useState, useEffect } from 'react'
import './Table.css'
import Results from '../data/results.json'
import {TableRow} from '../components/TableRow/index' 
import classNames from 'classnames'
import { AddRow } from '../components/AddRow'

export const baseUrl = 'http://178.128.196.163:3000/api/records'

export default function Table () {
    const [responseData, setResponseData] = useState([]) 
    
    const getData = () => {
        fetch (baseUrl,{
            method: 'GET'
        }).then(data => {
            return data.json()          
        }).then(data => {
            setResponseData(data) 
        })
    }

    /* effects */
    useEffect(()=>{
        getData()
    }, [])

    return (
        <div>
            <table>
                <tr>
                    <th>Имя</th>
                    <th>Возраст</th>
                    <th>Почта</th>
                </tr>
                { responseData &&
                    responseData.map((result, index) => (
                        <TableRow
                            key = {index}
                            responseData = {responseData}
                            setResponseData={setResponseData}
                            {...result.data}
                            id = {result._id}
                        />
                    )
                )}
            </table>
            <br></br>
            <AddRow setResponseData={setResponseData} responseData={responseData}/>
        </div>
    )
}