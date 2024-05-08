import React from "react";
import { createCourse } from "../actions/actions";
import Link from "next/link";

function AddCourse() {
  return (
    <div>
      Create Course
      <form action={createCourse}>
        <input name="title" type="text" placeholder="title" />
        <input name="price" type="text" placeholder="price" />
        <button type="submit">create</button>
      </form>
      <Link href={"/courses"}>Go to courses</Link>
    </div>
  );
}

export default AddCourse;
