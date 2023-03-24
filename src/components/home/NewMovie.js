import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, {
    useRef,
    useContext,
    useEffect,
    useState
} from "react";
import './style.css'

function NewMovie() {
    const [newMovie, setNewMovie] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:3000/movie')
            .then(response => response.json())
            .then(
                data => setNewMovie(data.sort((a, b) => b.id - a.id))
            );
    },);

    return (
        <div className="home_movie">
            <h3>Phim mới cập nhập</h3>
            {newMovie.map(p => (
                <img style={{width: '22%',padding: '20px',}} src={p.image}
                onClick={() => navigate(`/movie/${p?.id}`)}
                />
            ))}
        </div>
    )
}


export default NewMovie;