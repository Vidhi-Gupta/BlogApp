import React from 'react'
import GoogleLogin from 'react-google-login'
import { useSelector, useDispatch } from 'react-redux'
import { selectSignedIn, setBlogData, setSignedIn , setUserData } from '../features/userSlice'
import '../styling/home.css'
const Homepage = () => {
    const dispatch = useDispatch();
    const login = (response) => {
    console.log(response);
    dispatch(setSignedIn(true));
    dispatch(setUserData(response.profileObj));
    };

    const isSignedIn = useSelector(selectSignedIn);

    return (
        <div className="home__page" style={{display: isSignedIn? "none": ""}}>
            {!isSignedIn ? (
                <div className="login__message">
                <h1>A Reader's favourite place</h1>
                <p>
                    We provide high qaulity online resources for reading blogs.
                </p>
                <GoogleLogin 
                clientId='222311972282-23suvd2cponu3t644k00d5p27iqvboi2.apps.googleusercontent.com'
                render={(renderProps) => (
                    <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="login__button" >
                        Login with Google
                    </button>
                )}
                onSuccess={login}
                onFailure={login}
                isSignedIn = {true}
                cookiePolicy={"single_host_origin"} />
            </div>
            ) : ""}
            
        </div>
    )
}
export default Homepage;
