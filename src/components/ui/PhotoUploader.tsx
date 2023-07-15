import { environment } from "@/environments/environments";
import { useState } from "react";

type PhotoUploaderProps = {
  onPhotoUpload: (base64Data: any) => void;
  photo?: any;
};
const PhotoUploader = ({ onPhotoUpload, photo }: PhotoUploaderProps) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState<any>(null);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    previewFile(selectedFile);
  };

  const previewFile = (selectedFile: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setPreview(reader.result);
      onPhotoUpload(reader.result);
    };
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} className={"mb-2"} />
      {<img src={preview ? preview : photo ? `${environment.fileUrl}/${photo}` : "" || "/img/no-image.png"} width={400} alt="Preview" />}
    </div>
  );
};

export default PhotoUploader;
