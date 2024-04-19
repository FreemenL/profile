import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { LoadingButton } from '@mui/lab';

export default function Crop({ file, onUploadHandle, loading }) {
  const imgRef = useRef(null);
  const [upImg, setUpImg] = useState();
  const [img] = useState();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target.result; // 获取DataURL
        setUpImg(imageSrc);
      };
      reader.readAsDataURL(file); // 将文件转换为DataURL
    }
  }, [file]);

  return (
    <div>
      <img src={img} alt="" />
      <Cropper aspectRatio={1} src={upImg} ref={imgRef} viewMode={1} zoomable={false} />
      <LoadingButton
        variant="contained"
        sx={{ mt: 4 }}
        loading={loading}
        fullWidth
        onClick={() => {
          const cropper = imgRef?.current?.cropper;
          if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => {
              if (blob) {
                const newFile = new File([blob], file?.name, {
                  lastModified: Date.now(),
                  type: blob.type,
                });
                // eslint-disable-next-line no-console
                console.log(newFile);
                onUploadHandle(newFile);
              }
            }, 'image/jpeg');
          }
        }}>
        OK
      </LoadingButton>
    </div>
  );
}

Crop.propTypes = {
  file: PropTypes.any.isRequired,
  onUploadHandle: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
