"use client";

import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import { useState } from "react";
import Image from "next/image";
import { Toaster, toast } from "sonner";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    return { token: data.token, expire: data.expire, signature: data.signature };
  } catch (error: any) {
    console.error("Authentication error:", error);
    throw new Error("Authentication request failed");
  }
};

const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.error("Upload error:", error);
    toast.error("Image upload failed", {
      description: "Your image could not be uploaded. Please try again.",
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success("Image uploaded successfully", {
      description: `${res.filePath} uploaded successfully!`,
    });
  };

  return (
    <>
      <Toaster position="top-right" />
      <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
        <IKUpload
          className="hidden"
          onError={onError}
          onSuccess={onSuccess}
          fileName={`upload-${Date.now()}.webp`} // Tránh trùng file
        />

        <button
          className="upload-btn bg-blue-500 text-white px-4 py-2 rounded"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector<HTMLInputElement>(".hidden")?.click();
          }}
        >
          <Image src="/icons/upload.svg" alt="upload_icon" width={20} height={20} className="object-contain mx-auto" />
          <p className="text-base text-light-100">Upload a File</p>
        </button>

        {file && (
          <IKImage
            alt="Uploaded Image"
            path={file.filePath}
            width={500}
            height={500}
            className="mt-4 rounded-lg shadow-lg"
          />
        )}
      </ImageKitProvider>
    </>
  );
};



export default ImageUpload;
