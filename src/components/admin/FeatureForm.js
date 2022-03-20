import React from 'react';
import { useForm } from 'react-hook-form';
import { Db } from "../../firebase-config/db";
import {
  collection,
  addDoc } from "firebase/firestore";

export default function FeatureForm() {
  const usersCollectionRef = collection(Db, "features for evaluation");

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    const createFeature = async () => {
      await addDoc(usersCollectionRef, { feature: data.Feature, total_score: Number(data.Total_Scores) });
    };

    createFeature();
    console.log(data);
  }
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Feature to evaluate" {...register("Feature", {required: true, maxLength: 80})} />
      <input type="number" placeholder="Total Possible Scores" {...register("Total_Scores", {required: true, maxLength: 4})} />

      <input type="submit" />
    </form>
  );
}