import React from 'react'
import Homepage from './Components/Home'
import Navbar from './Components/Navbar'
import Blog from './Components/Blog'
import {useSelector} from 'react-redux'
import {selectSignedIn} from './features/userSlice'
import './styling/app.css'

const App = () => {
    const isSignedIn = useSelector(selectSignedIn);
    return (
        <div>
            <Navbar />
            <Homepage />
            {isSignedIn && <Blog />}
        </div>
    )
}

export default App
