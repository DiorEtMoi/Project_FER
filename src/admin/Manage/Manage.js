import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isSuccess, isFailing, isLoading } from "../../redux/auth/slice";

function Manage() {
  const [type, setType] = useState([]);
  const [movie, setMovie] = useState([]);
  const [rate, setRate] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    let here = true;
    const url = "http://localhost:3000/type";
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setType(res?.data);
        console.log(res?.data);
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
    let here = true;
    const url = "http://localhost:3000/movie";
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setMovie(res?.data);
        console.log(res?.data);

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
    let here = true;
    const url = "http://localhost:3000/rating";
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setRate(res?.data);
        console.log(res?.data);

        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, []);
  return <div>Manage</div>;
}

export default Manage;
