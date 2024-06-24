import React,{ useEffect, useState, useRef } from 'react'
import { useNavigate,useLocation, Link } from 'react-router-dom';
import logo from '../../assets/red_logo.svg';
import './Header.css';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import useAuth from '../../hooks/useAuth';
import MobileLogo from '../../assets/MobileLogo.svg';

const Header = React.memo(()=>{
    const { isAuthenticating, isAuthenticated, logout, user } = useAuth();
    const [page, setPage] = useState(useLocation().pathname);
    const [pageClass, setPageClass] = useState(null);
    const navigate = useNavigate();

    const [width, setWidth] = useState(window.innerWidth);

    const goToLogin = ()=>{
        navigate('/login',{replace : true});
    }

    const goHome = ()=>{
        if(!page.includes("/room")){
            navigate('/room/none',{replace : true});
        }
    }

    useEffect(()=>{
        if(page.includes("/room")){
            setTimeout(() => {             
                setPageClass("room");
            }, 100);
        } else if(page.includes("/friends")){
            setTimeout(() => {
                setPageClass("friends");
            }, 100);
        }
    },[page]);

    useEffect(() => { //useEffect for window resizing
        function handleResize() {
          setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return(
        <div className="Header">
                {page === "/login" || page === "/register" ? "" :
                    isAuthenticated ? 
                    <div className="nav-container">
                        <nav>
                            <Link className={`nav-link ${ pageClass === "room" ? "active" : ""}`} to="/room/none" ><h2>search</h2></Link>
                            <Link className={`nav-link ${ pageClass === "friends" ? "active" : ""}`} to="/friends" ><h2>friends</h2></Link>
                        </nav>  
                    </div>

                    : "" 
                }
                 
            <Link to='/'>
                <img className="logo" src={ isAuthenticated || isAuthenticating ? width < 800 ? MobileLogo : logo : logo} alt="logo"/>
            </Link>

            {page === "/login" || page === "/register" ? "" :
                <div className="header-right">
                    {isAuthenticated ? <ProfilePicture/> : ""}
                    {!isAuthenticated ? <button onClick={goToLogin}>login</button> : ""}
                </div>    
            }
        </div>
    );
});

export default Header