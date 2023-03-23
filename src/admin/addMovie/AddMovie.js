import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { UserStore } from "../../App";
import { isLoading, isSuccess, isFailing } from "../../redux/auth/slice";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function AddMovie() {
  const [option, setOption] = useState([]);
  const [select, setSelect] = useState();
  const { cache } = useContext(UserStore);
  const [bg, setBg] = useState("");
  const dispatch = useDispatch();
  const imageRef = useRef("");
  const nameRef = useRef("");
  const contentRef = useRef("");
  const totalRef = useRef("");
  const naviagte = useNavigate();
  const options = useMemo(() => {
    return option?.map((item) => {
      return {
        value: item?.typeID,
        label: item?.typeName,
      };
    });
  }, [option]);
  useEffect(() => {
    let here = true;
    const url = "http://localhost:3000/type";
    if (cache.current[url]) {
      console.log(cache.current[url]);
      return setOption(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setOption(res?.data);
        console.log(res?.data);
        cache.current[url] = res?.data;
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, []);
  const onDrop = useCallback((acceptedFiles) => {
    const url = URL.createObjectURL(acceptedFiles[0]);
    if (bg) {
      URL.revokeObjectURL(bg);
    }
    imageRef.current = acceptedFiles[0];
    setBg(url);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handleCreate = async () => {
    if (
      nameRef.current.value === "" ||
      contentRef.current.value === "" ||
      totalRef.current.value === ""
    ) {
      return toast.error("Enter all fields");
    }
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
    console.log({
      name: nameRef.current.value,
      content: contentRef.current.value,
      totalChap: totalRef.current.value,
      chap: [],
      image,
      type: { typeID: select?.value },
    });
    try {
      const res = await axios.post("http://localhost:3000/movie", {
        name: nameRef.current.value,
        content: contentRef.current.value,
        totalChap: totalRef.current.value,
        chap: [],
        image,
        type: { typeID: select?.value },
      });
      dispatch(isSuccess());
      console.log(res?.data);
      return naviagte("/admin/movie_manager");
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data);
    }
  };
  return (
    <div className="add_movie">
      <div className="add_movie_header">
        <h3
          style={{
            color: "#fff",
            marginBottom: "20px",
          }}
        >
          Thêm Phim
        </h3>
      </div>
      <div className="add_movie_body container">
        <div className="add_movie_body_input">
          <label>Name : </label>
          <input ref={nameRef} />
        </div>
        <div className="add_movie_body_input">
          <label>Content : </label>
          <input ref={contentRef} />
        </div>
        <div className="add_movie_body_input">
          <label>Type :</label>
          <Select
            options={options}
            className="select_type"
            onChange={(choice) => {
              return setSelect(choice);
            }}
          />
        </div>
        <div className="add_movie_body_input">
          <label>Total Chap : </label>
          <input type="number" ref={totalRef} />
        </div>
        <div className="add_movie_body_image">
          <div className="add_movie_body_image_bg">
            <div {...getRootProps()} className="add_movie_body_image_bg_wrap">
              <input {...getInputProps()} />
              <img src={bg} />
              <i class="fa-solid fa-image"></i>
            </div>
          </div>
          {/* <div className="add_movie_body_image_img">
            <div {...getRootProps()} className="add_movie_body_image_img_wrap">
              <input {...getInputProps()} />
              <i class="fa-solid fa-image"></i>
              <img src="" />
            </div>
          </div> */}
        </div>
        <button
          className="btn btn-light"
          style={{
            marginTop: "30px",
            width: "100px",
            fontWeight: "800",
          }}
          onClick={handleCreate}
        >
          Thêm
        </button>
      </div>
    </div>
  );
}

export default AddMovie;