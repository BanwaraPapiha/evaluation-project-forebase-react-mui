import React from 'react';
import { useForm } from 'react-hook-form';

// import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import {
  collection,
  // getDocs,
  addDoc,
  // updateDoc,
  // deleteDoc,
  // doc,
} from "firebase/firestore";


export default function PersonForm() {
  const usersCollectionRef = collection(Db, "persons to be evaluated");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    const createPerson = async () => {
      await addDoc(usersCollectionRef, { Name: data.Name, Email: data.Email, accelerated: data.Accelerated,
        decelerated: data.Decelerated, ac_de_by: data.Accelrated_or_decelerated_by, 
        Total_sum_Score: data.Total_sum_Score, acc_dec_score: data.acc_dec_score });
    };
    createPerson();
    alert("The name is: " + data.Name + "and the email is: " + data.Email );
    console.log(data);
  }
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name" {...register("Name", {required: true, maxLength: 80})} />
      <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
      <label>Accelerated</label>
      <input type="checkbox" placeholder="Accelerated" {...register("Accelerated", {required: false})} />
      <label>Decelerated</label>
      <input type="checkbox" placeholder="Decelerated" {...register("Decelerated", {})} />
      <input type="number" placeholder="Accelrated or decelerated by" {...register("Accelrated_or_decelerated_by", {})} />
      <input type="text" placeholder="Total Sum of Score" {...register("Total_sum_Score", {})} />
      <input type="text" placeholder="Ac/de-celerated Score" {...register("acc_dec_score", {})} />

      <input type="submit" />
    </form>
  );
}