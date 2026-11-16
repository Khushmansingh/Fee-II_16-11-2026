import Abortrequest from './Abortrequest';
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [val, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [debounceName, setDebounceName] = useState('');

  // Debouncing
  useEffect(() => {
    let timer = setTimeout(() => {
      setDebounceName(val);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [val]);

  // API call
  useEffect(() => {
    if (debounceName.trim()) {
      fetch(`https://dummyjson.com/users/search?q=${encodeURIComponent(debounceName)}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setUsers(data.users);
        });
    } else {
      setUsers([]);
    }
  }, [debounceName]);

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
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName}
            </li>
          ))
        ) : debounceName.trim() ? (
          <p>No users found</p>
        ) : (
          <p>Start typing to search users</p>
        )}
      </ol>

      <Abortrequest/>
    </>
  )
}

export default App
