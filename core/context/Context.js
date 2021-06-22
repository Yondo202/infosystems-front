import React, { useState } from 'react'
const UserContext = React.createContext();

export const UserStore = (props) => {
    const [ alert, setAlert ] = useState({ color: 'white', text: '', cond: false });
    
    const alertFunc = (color, text, cond)=>{
        setAlert({ color: color, text: text, cond: cond });
        setTimeout(() => { setAlert({ color: 'white', text: '', cond: false }); }, 4000);
    }

    return (
        <UserContext.Provider value={{ alert, alertFunc, }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;