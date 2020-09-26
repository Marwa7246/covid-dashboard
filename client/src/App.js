import React from 'react';
import logo from './logo.svg';
import './App.scss';
import useApplicationData from './hooks/useApplicationData';

function App() {
  const { state, dispatch } = useApplicationData();
    

  const userList = state.users.map(user => (
    <li key={user.id}>
      {user.id},{user.first_name} ,{user.last_name} ,{JSON.parse(user.email).length}
    </li>
  ));
const first =state.users[0]
    if (first) {
      const data = JSON.parse(first.email)
      data.find(ele => console.log(ele.country))
      const oneCountry = data.find(ele => ele.country === 'Albania')
    console.log(oneCountry.cases)

    }
    
  return (
    <div className='App'>
      <h1>Users</h1>

      {state.loading && <h3>Loading...</h3>}

      <ul>{!state.loading && userList}</ul>
    </div>
  );
}

export default App;
