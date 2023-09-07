import React, { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../utils/cropImage";
import { useAuth } from "../../stores/auth/context";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

export const CropEasy = ({ photoUrl }) => {
  const refCloseModal = useRef();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const { onUpdatePicture } = useAuth();

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const data = await getCroppedImg(photoUrl, croppedAreaPixels, rotation);
      const fd = new FormData();
      fd.append("file", data.file);
      const result = await onUpdatePicture(fd);
      if (result && result.error) {
        return Swal.fire({
          icon: "error",
          title: `Gagal update foto profil`,
          confirmButtonText: "OK",
        });
      }
      await Toast.fire({
        icon: "success",
        title: "Sukses merubah profile picture",
      });
      refCloseModal.current.click();
    } catch (error) {}
  };

  return (
    <div
      className="modal fade"
      id="modal-add"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit image</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="w-100" style={{ minHeight: "400px" }}>
              <Cropper
                image={photoUrl}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropChange={setCrop}
                onCropComplete={cropComplete}
              />
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex flex-column w-100">
              <div>
                <label htmlFor="zoom-range" className="form-label">
                  Zoom: {zoomPercent(zoom)}
                </label>
                <input
                  id="zoom-range"
                  type="range"
                  className="form-range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => {
                    const { value } = e.target;
                    setZoom(value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="rotation-range" className="form-label">
                  Rotation: {rotation}
                </label>
                <input
                  id="rotation-range"
                  type="range"
                  className="form-range"
                  min="0"
                  max="360"
                  value={rotation}
                  onChange={(e) => {
                    const { value } = e.target;
                    setRotation(value);
                  }}
                />
              </div>
              <div className="d-flex flex-row justify-content-end">
                <button
                  ref={refCloseModal}
                  type="button"
                  className="ms-2 me-2 p-2 btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="ms-2 me-2 p-2 btn btn-secondtheme text-light"
                  onClick={cropImage}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
