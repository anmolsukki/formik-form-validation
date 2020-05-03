import React from 'react';

export default function Home() {

    const logOutHandler = () => {
        localStorage.clear();
        window.location.reload()
    }

    return (
        <div className="App">
            <p>Welcome to HomePage</p>
            <button onClick={logOutHandler}>Logout</button>
        </div>
    )
}
