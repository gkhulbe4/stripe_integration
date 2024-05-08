import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { formatPrice } from "@/lib/utils/convertToCents";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

type Course = {
  title: string;
  priceInCents: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

async function Courses() {
  const session = await getServerSession(authOptions)
  const courses = await db.course.findMany();

  if(!session?.user) return <>Please signin to see the courses</>
  return (
    <div className="flex flex-col gap-3">
      {courses.map((course: Course) => (
        <Link
          href={`/courses/${course.id}`}
          key={course.id}
          className="flex gap-3 cursor-pointer p-3 border borde-gray-200"
        >
          <h1>{course.title}</h1>
          <h1>{formatPrice(course.priceInCents!)}</h1>
        </Link>
      ))}
    </div>
  );
}

export default Courses;
