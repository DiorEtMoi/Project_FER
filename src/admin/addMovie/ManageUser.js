import axios from "axios";
import React, {
    useRef,
    useContext,
    useEffect,
    useState,
} from "react";
import { isLoading, isSuccess, isFailing } from "../../redux/auth/slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserStore } from "../../App";
import "./style.css"

function ManageUser() {
    const { cache } = useContext(UserStore);
    const dispatch = useDispatch();
    const [user, setUser] = useState([]);

    useEffect(() => {
        let here = true;
        const url = "http://localhost:3000/user";
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

    const handleChangeStatus = async (userId, userName, passWord, role, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:3000/user/${userId}`, {
                role: role,
                userName: userName,
                password: passWord,
                status: newStatus
                
            });
            console.log(userId)
        } catch (error) {
            console.error(error);
        }
        setUser(user);
    };




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
                        <td>{p.status ? 'Active' : 'Deactive'} | {p.status ? <button onClick={() => handleChangeStatus(p.id, p.userName,p.password,p.role, 0)}>Deactive</button> : <button onClick={() => handleChangeStatus(p.id, p.userName,p.password,p.role, 1)} >Active</button>}</td>
                    </tr>
                )}

            </table>
        </div>
    )
}


export default ManageUser;