import React from 'react'
import fileService from "../appwrite/file_service"
import { Link } from 'react-router-dom'

const PostCard = ({$id, title, featuredImage}) => {
  return (
   <Link to={`/post/${$id}`} className=''>
    <div className=''>
        <img src={fileService.getFilePreview(featuredImage)} alt={title} className=''/>
    </div>
    <h2 className=''>{title}</h2>
   </Link>
  )
}

export default PostCard
