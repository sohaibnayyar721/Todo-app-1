"use client";
import Image from 'next/image'
import Todo from './component/Todo';
import { useEffect } from 'react';
import Video from './component/Video';
import Loader from './component/Loader';
export default function Home() {

  return (
    <div >
      <Todo />
    </div>
  )
}


