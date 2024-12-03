import cloudinary from "@/config/cloudinary";
import { Readable } from 'stream';

export async function uploadImage(file: File) {
  try {
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer); // Convert arrayBuffer to Buffer

    // Create a stream from the buffer
    const fileStream = Readable.from(fileBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image', 
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // Pipe the fileStream to the uploadStream
      fileStream.pipe(uploadStream);
    });
  } catch (error) {
    console.error("Error uploading image to Cloudinary: ", error);
    throw new Error("Error uploading image");
  }
}
