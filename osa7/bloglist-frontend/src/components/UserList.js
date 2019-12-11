import React, { useEffect, useState } from 'react'
import userService from '../services/users'
import { Table } from 'react-bootstrap'


const UserList = () => {

    const [users, setUsers] = useState([])
    useEffect(() => {
        userService.getAll().then(users => setUsers(users))
    }, [])



    console.log('users ', users, users.length)
    return (

        <div>
            <h2> Users </h2>
            <Table striped>
                <td>Name </td>
                <td>Blogs</td>
                {users.map(user =>
                    <tr key={user.id} >
                        <td> {user.name}   </td>
                        <td> {user.blogs.length}</td>
                    </tr>
                )}
            </Table>
        </div>

    )


}

export default UserList