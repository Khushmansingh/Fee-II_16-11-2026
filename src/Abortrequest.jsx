import { useState, useEffect } from 'react';

function Abortrequest() {
  const [val, setName] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    if (val.trim()) {
      fetch(`https://dummyjson.com/users/search?q=${val}`, {
        signal: controller.signal
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setUsers(data.users);
        })
        .catch(error => {
          if (error.name === 'AbortError') {
            console.log('Request aborted');
          } else {
            console.error(error);
          }
        });
    } else {
      setUsers([]);
    }

    return () => {
      controller.abort();
    };

  }, [val]);

  return (
    <>
      <h1>Abort Request</h1>

      <input
        type="text"
        value={val}
        onChange={(e) => setName(e.target.value)}
        placeholder="Search users..."
      />

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Abortrequest;
