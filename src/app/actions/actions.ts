"use server"

import db from "@/lib/db"

export const createCourse = async(formData: FormData) => {
    const title = formData.get("title") as string
    const price = parseFloat(formData.get("price") as string)

    const course = await db.course.create({
        data: {
            title: title,
            price: price
        }
    })
    if(course) console.log("Course created" , course.id);
}