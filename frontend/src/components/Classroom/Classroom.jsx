import React, { useEffect, useState } from 'react';
import './Classroom.css';
import leftArrow from '../../assets/leftarrow.svg';
import { useNavigate } from 'react-router-dom';


function Classroom({ name, room, state, setState}) {
    const [image, setImage] = useState("")

    const navigate = useNavigate();

    useEffect(()=>{
        setImage("");
    },[room])
    
    useEffect(() => {
        if(room === null || room === undefined){
            return;
        }
        if(room.image === "/"){
            console.log("image is /");
            setImage("https://www.jmzarchitects.com/wp-content/uploads/2020/03/17112901-2-scaled.jpg");
        } else {
            setImage(`${process.env.PUBLIC_URL}${room.image}`);
        }
    }, [room]);

    useEffect(() => {console.log(state)},[state]);

    
    if(name === "none" || !name){
        return "";
    }

    const backtoResults = () => {
        setState("calendarSearch");
    };

    return (
        <div className='classroom-component'>
            <div className={`image ${image === "" ? "shimmer": ""}`}>
                {!(image === "")? 
                    <img src={image} alt="classroom"></img>
                : ""}
            </div>
            
            <div className="classroom-info">
                {state === "calendarSearchResult" ? <div className="back-to-results" onClick={backtoResults}>
                    <img src={leftArrow} alt="back arrow" ></img>
                    <p>back to results</p>
                </div> : "" }
                <h1>{name}</h1>
            </div>
        </div>
    );
}

export default Classroom;
