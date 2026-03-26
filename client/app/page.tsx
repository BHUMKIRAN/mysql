"use client"
import axios from 'axios';
import React, { useEffect } from 'react'

const CrudOpration = () => {
  const [users, setUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user")
        setUsers(res.data)
      } catch (err) {
        alert(err)
      }
    }
    fetchUser()
  }, [])
  const postUser = async () => {
    try {
      if (data.length === 0) return
      const res = await axios.post("http://localhost:8080/user", data)
    } catch (err) {
      alert(err)
    }
  }
  useEffect(() => {
    postUser()
  }, [])

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {

    setData({
      ...data, [e.target.name]: e.target.value
    })

  }
  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        Click me
      </button>

      {open && (
        <div className="overflow-x-auto">
          <table className="border-collapse border border-gray-300 w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">Id</th>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Email</th>
                <th className="border p-3 text-left">Age</th>
              </tr>
            </thead>

            <tbody>
              {users.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="border p-3">{d.id}</td>
                  <td className="border p-3">{d.name}</td>
                  <td className="border p-3">{d.email}</td>
                  <td className="border p-3">{d.age}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
      
          <form action="" onSubmit={postUser}>
            <input type="text" name="name" onChange={handleFormData} placeholder='name' />
            <input type="text" name="email" onChange={handleFormData} placeholder='email'/>
            <input type="text" name="age" onChange={handleFormData} placeholder='age'/>
            <button type="submit">Submit</button>
          </form>
    </div>
  )
}

export default CrudOpration