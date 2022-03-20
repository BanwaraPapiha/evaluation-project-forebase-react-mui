import React from 'react';
import { useForm } from 'react-hook-form';

export default function EvalForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="being_evaluated" {...register("being_evaluated", {required: true, maxLength: 256})} />
      <input type="text" placeholder="evaluator" {...register("evaluator", {required: true, maxLength: 256})} />
      <input type="text" placeholder="feature" {...register("feature", {required: true})} />
      <input type="text" placeholder="score_awarded" {...register("score_awarded", {required: true})} />
      <input type="text" placeholder="total_score" {...register("total_score", {})} />

      <input type="submit" />
    </form>
  );
}