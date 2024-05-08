"use server"

import db from "@/lib/db"
import { convertToCents } from "@/lib/utils/convertToCents"

export const createCourse = async(formData: FormData) => {
    const title = formData.get("title") as string
    const price = parseFloat(formData.get("price") as string)
    const convertedPrice = convertToCents(price)
    // console.log("converted price : ",convertedPrice)
    const course = await db.course.create({
        data: {
            title: title,
            price: convertedPrice
        }
    })
    if(course) console.log("Course created" , course.id);
}