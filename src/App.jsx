// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import { useEffect, useState } from 'react';

function App() {

  const url = 'https://randomuser.me/api/';
  const [count, setCount] = useState(0)

  // ; (async () => {
  //   const res = await axios.get(url)
  //   console.log(1, res.data);
  // })();

  useEffect(() => {
    (async () => {
      const res = await axios.get(url)
      console.log(1, res.data);
    })()
  }, []);

  return (
    <>
      <button onClick={() => { setCount(count + 1) }}>{count}</button>
    </>
  )
}

export default App
