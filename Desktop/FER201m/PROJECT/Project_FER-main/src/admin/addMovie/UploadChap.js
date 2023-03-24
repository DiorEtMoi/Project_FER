import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import "./style.scss";
function UploadChap() {
  const [image, setImage] = useState("");
  const [anime, setAnime] = useState([]);
  const { slug } = useParams();
  const nameRef = useRef("");
  const linkRef = useRef("");
  const imageRef = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onDrop = useCallback((acceptedFiles) => {
    const url = URL.createObjectURL(acceptedFiles[0]);
    if (image) {
      URL.revokeObjectURL(image);
    }
    imageRef.current = acceptedFiles[0];
    setImage(url);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handleUpload = async () => {
    let image = "";
    const formData = new FormData();
    formData.append("file", imageRef.current);
    formData.append("upload_preset", "dinhhoan");
    dispatch(isLoading());
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/db7xtr0t6/image/upload",
        formData
      );
      image = res?.data?.url;
    } catch (error) {
      return dispatch(isFailing());
    }
    try {
      const res = await axios.post(`http://localhost:3000/chapAnime`, {
        name: nameRef.current.value,
        animeID: parseInt(slug),
        video: linkRef.current.value,
        image,
      });
      console.log(res);
      await axios.put(`http://localhost:3000/movie/${slug}`, {
        name: anime?.name,
        content: anime?.content,
        image: anime?.image,
        type: anime?.type,
        chap: [
          ...anime?.chap,
          {
            chapID: res?.data?.id,
          },
        ],
      });
      dispatch(isSuccess());
      navigate("/admin/movie_manager");
      return toast.success("Thêm tập thành công");
    } catch (error) {
      return dispatch(isFailing());
    }
  };
  useEffect(() => {
    let here = true;
    const url = `http://localhost:3000/movie/${slug}`;

    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setAnime(res?.data);
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, []);
  useEffect(() => {
    console.log(anime);
  }, [anime]);
  return (
    <div className="upload">
      <div className="upload_header">
        <h3
          style={{
            color: "#fff",
            marginBottom: "20px",
          }}
        >
          Upload Chap
        </h3>
      </div>
      <div className="upload_body container">
        <div className="upload_body_input">
          <label>Name : </label>
          <input ref={nameRef} />
        </div>
        <div className="upload_body_input">
          <label>Link : </label>
          <input ref={linkRef} />
        </div>
        <div className="upload_body_input">
          <label>Image</label>
          <div {...getRootProps()} className="upload_body_input_wrap">
            <input {...getInputProps()} />
            <img src={image} />
            <i class="fa-solid fa-image"></i>
          </div>
        </div>
      </div>
      <button
        className="btn btn-light"
        style={{
          marginTop: "20px",
        }}
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
}

export default UploadChap;
