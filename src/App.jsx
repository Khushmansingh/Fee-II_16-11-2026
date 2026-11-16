
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [val, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [debounceName , setdebounceName] = useState('');

  useEffect(() => {
    if (!val) {
      setUsers([]);
      return;
    }

    fetch(`https://dummyjson.com/users/search?q=${val}`)
      .then(res => res.json())
      .then(data => setUsers(data.users))
      .catch(error => console.log(error));

  }, [val]);

  return (
    <>
      <h1>Search User</h1>

      <input
        type="text"
        placeholder="Search"
        value={val}
        onChange={(e) => setName(e.target.value)}
      />

      <ol>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ol>
    </>
  )
}

export default App
