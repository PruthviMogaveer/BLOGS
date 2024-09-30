import React, { memo } from "react";
import fileUploadService from "../appwrite/file_service";
import { Link } from "react-router-dom";

const PostCard = memo(({ $id, title, featuredImage }) => {
  return (
    <div className="relative pb-4 h-full w-52 shadow-post rounded-xl flex flex-col items-center overflow-hidden bg-white transition-transform duration-300 hover:scale-105">
      <div className="absolute -top-6 rotate-[14deg] bg-yellow z-0 w-72 h-32 "></div>
      <Link
        to={`/post/${$id}`}
        className="relative flex flex-col items-center space-y-3 mb-2 "
      >
        <div className="m-2">
          <img
            src={fileUploadService.getFilePreview(featuredImage)}
            alt={title}
            className=" object-cover h-36 w-48 rounded-md "
          />
        </div>
        <h2 className="w-44 h-auto font-montserrat font-bold text-base break-words">
          {title}
        </h2>
      </Link>
    </div>
  );
});

export default PostCard;
