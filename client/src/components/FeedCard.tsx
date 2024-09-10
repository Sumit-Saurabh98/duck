import Image from 'next/image';
import React from 'react';
import { BiCommentDots, BiRepost, BiHeart } from 'react-icons/bi';
import { FaRegBookmark } from 'react-icons/fa';
import { MdIosShare } from 'react-icons/md';
import { VscGraph } from 'react-icons/vsc';

const FeedCard = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md flex">
      <div className="w-[10%]h-[10%] flex justify-center items-start p-4">
        <Image
          src="https://img.icons8.com/?size=100&id=YABoRANFP0sq&format=png&color=000000"
          alt="profile"
          width={50}
          height={50}
          className="rounded-full border-red-600 w-10 h-10 bg-slate-50"
        />
      </div>
      <div className="w-[90%] pb-5 pr-2 py-4">
        <div>
          <h3 className="text-xl font-bold">User Name</h3>
          <p className="text-gray-400">post content</p>
        </div>
        <div className="my-4">
          <Image
            src="https://images.unsplash.com/photo-1725832062946-2ec9aae5c4e2?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="post"
            width={300}
            height={100}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <div className="flex gap-4 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <BiCommentDots />
              <span>200</span>
            </div>
            <div className="flex items-center gap-2">
              <BiRepost />
              <span>30K</span>
            </div>
            <div className="flex items-center gap-2">
              <BiHeart />
              <span>10k</span>
            </div>
            <div className="flex items-center gap-2">
              <VscGraph />
              <span>3k</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <FaRegBookmark />
            </div>
            <div>
              <MdIosShare />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;