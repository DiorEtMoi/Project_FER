import axios from "axios";
import React, {
    useRef,
    useContext,
    useEffect,
    useState
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
        fetch('http://localhost:3000/user')
          .then(response => response.json())
          .then(data => setUser(data));
      },);

    // const [status, setStatus] = useState(user.status);
    const handleChangeStatus = (userId, userName, passWord, role, newStatus) => {
        if(window.confirm('Confirm to change user status?')){
        axios.patch(`http://localhost:3000/user/${userId}`, { status: newStatus })
        .then(response => {
        //   setStatus(newStatus);
        })
        
        .catch(error => console.error(error));
    }
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