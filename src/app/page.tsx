"use client"
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [Videos, setVideos] = useState<IVideo[]>([]);

  useEffect(()=>{
    const featchVideos = async () =>{
      try {
        const data = await apiClient.getVideos();
        setVideos(data)
      } catch (error) {
        console.error("featch Videos error",error)
      }
    };
    featchVideos();
  },[])
  return (
    <div>
        <h1>Chai Aur code.</h1>
    </div>
  );
}
