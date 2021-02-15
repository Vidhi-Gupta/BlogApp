import { Avatar } from '@material-ui/core'
import React from 'react'
import {useState} from 'react'
import { GoogleLogout } from 'react-google-login'
import {useSelector, useDispatch} from 'react-redux'
import {selectSignedIn, selectUserData, setSignedIn, setUserData, setSearchInput} from '../features/userSlice'
import '../styling/navbar.css'

const Navbar = () => {
    const isSignedIn = useSelector(selectSignedIn)
    const [inputValue,setInputValue] = useState("tech")
    const userData = useSelector(selectUserData);
    const dispatch = useDispatch();
    const logout=(response) => {
        
        dispatch(setUserData(null))
        dispatch(setSignedIn(false))
    }

    const handleClick=(e)=> {
        e.preventDefault();
        dispatch(setSearchInput(inputValue));
    };
    return (
        <div className="navbar">
            <h1 className="navbar__header">BlogMania</h1>
            {isSignedIn && (
                <div className="blog__search">
                    <input 
                    className="search"
                    placeholder="Search for a blog"
                    value={inputValue}
                    onChange={(e)=> setInputValue(e.target.value)} />
                    <button className='submit' onClick={handleClick}>
                        Search
                    </button>
                </div>
            ) }

            {isSignedIn ? <div className="navbar__user__data">
                <Avatar  className="user" src={userData?.imageUrl} alt={userData?.name} />
                <h1 className="signedIn">{userData?.givenName}</h1>
                <GoogleLogout 
                clientId='222311972282-23suvd2cponu3t644k00d5p27iqvboi2.apps.googleusercontent.com'
                render={(renderProps) => (
                    <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="logout__button" >
                        Logout
                    </button>
                )}
                onLogoutSuccess={logout} />
            </div>:
            <h1 className="notSignedIn">User Not signed In</h1>}
            
        </div>
    )
}

export default Navbar
