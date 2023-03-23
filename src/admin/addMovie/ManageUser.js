import axios from "axios";
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { isLoading, isSuccess, isFailing } from "../../../redux/auth/slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserStore } from "../../../App";
import "./style.scss";

function ManageUser() {
    const { cache } = useContext(UserStore);
    const dispatch = useDispatch();
    const [user, setUser] = useState([]);

    useEffect(() => {
        let here = true;
        const url = "http://localhost:3000/type";
        if (cache.current[url]) {
            console.log(cache.current[url]);
            return setUser(cache.current[url]);
        }
        dispatch(isLoading());
        axios
            .get(url)
            .then((res) => {
                if (!here) {
                    return;
                }
                setUser(res?.data);
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


    return (
        <div className="manageUser">
            <h3>Quản lý người dùng</h3>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Status</th>
                </tr>
                {user.map(p =>
                    <tr>
                        <td>{p.id}</td>
                        <td>{p.userName}</td>
                        <td>{p.password}</td>
                        <td></td>
                    </tr>
                )}

            </table>
        </div>
    )
}