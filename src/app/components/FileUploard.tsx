"use client";
import React, { ChangeEvent, useState } from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse, UploadError } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";

interface FileUploardProps{
    onSucess:(res:IKUploadResponse) => void
    onProcess?:(progress:number) => void
    fileType?: "image" | "Video"
}
export default function FileUploard({
    onSucess,
    onProcess,
    fileType
}:FileUploardProps ) {
  const [uploading,setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null)
  
  const onError = (err:UploadError) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };
  
  const handleSuccess = (res:IKUploadResponse) => {
    console.log("Success", res);
    setUploading(false);
    setError(null);
    onSucess(res)
  };
  
  const handleProgress = (evt:ProgressEvent) => {
    if(evt.lengthComputable && onProcess){
        let perscentage = (evt.loaded / evt.total) * 100;
        onProcess(Math.round(perscentage));
    }
  };
  
  const handleStartUpload = (evt:ChangeEvent) => {
    console.log("Start", evt);
  };

  const ValidateFile = (file:File) =>{
    if(fileType === "Video"){
        if(!file.type.startsWith("video/")){
            setError("Please uploard a video File");
            return false;
        }
        if (file.size > 100 * 1024 * 1024) {
            setError("video must be less than 100 MB");
            return false;
        }
    }else{
        const validTypes = ["image/jpeg","image/png","image/webp","image/jpg"];
        if(!validTypes.includes(file.type)){
            setError("Please uploard a Valid FIle. (webp, jpeg, png, jpg)")
            return false
        }
        if(file.size > 5 * 1024 * 1024){
            setError("image must be lesser than 5 MB");
            return false
        }
    }
    return false
   
  }


  return (
    <div className="space-y-2">
        <IKUpload
          fileName={fileType === "Video" ? "Video" : "Image"}
          onError={onError}
          onSuccess={handleSuccess}
          onUploadStart={handleStartUpload}
          onUploadProgress={handleProgress}
          accept={fileType === "Video"? "video/*" : "image/*"}
          folder={fileType === "Video"? "/Videos" : "/Images"}
          validateFile={ValidateFile}
          className="file-input file-input-bordered w-full"
        />
        {
            uploading && ( 
            <div className="flex items-center gap-2 text-sm text-primary">
                <Loader2 className="animate-spin"/>
            </div>
        )
        }
        {
            error && (
                <div className="test-error text-sm">
                    {error}
                </div>
            )
        }
    </div>
  );
}