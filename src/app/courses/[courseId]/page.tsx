"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

function Course() {
  const params = useParams<{courseId: string}>()

  async function buyCourse(){
    try{
      const res = await axios.post(`/api/courses/${params.courseId}/checkout`)
      console.log(res.data);
      window.location.assign(res.data.url)
    }catch(error){
      alert(error)
    }
  }
  return (
    <div>
      <h1>CourseId: {params.courseId}</h1>
      <button className='bg-gray-300 border border-gray-400 px-3'
      onClick={buyCourse}
      >BUY</button>
    </div>
  )
}

export default Course