import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let res = await fetch('https://jsonplaceholder.typicode.com/users');
      let result = await res.json();
      if(result && result.length > 0){
        setItems(result);
        setIsLoaded(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const postData = async (index) => {
    try {
      let res = await fetch('https://webhook.site/73f1c0a3-632f-4d1b-81ef-97886c4af496',{
        method: 'post',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(items[index])
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
    <div>
      <ul>
        { items.map((item, index) => {
          return (
            <li key={item.id}>Name : {item.name} | User : {item.username} | Email : {item.username}
            <button onClick={ () => postData(index) }>Send data</button>
            </li>
          );
        }) }
      </ul>
    </div>
    </>
  )
}
