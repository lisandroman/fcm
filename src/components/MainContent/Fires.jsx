import React from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../firebase/firebase';

const fires = () => {


const addData = async function() {

  try {
    const docRef = await addDoc(collection(db, "orders"), {
      coins: 1111,
      platform: 'xbox',
      price: 240,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}



  return (
    <div>
      <button className="btn btn-outline-danger" onClick={addData}>ADD TO FIRESTORE</button>
    </div>
  )
}

export default fires