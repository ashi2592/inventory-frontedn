import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";


const Logout = ()=>{

    const history = useHistory()
    useEffect(()=>{
        localStorage.clear();
        setTimeout(()=>{history.push('/login')},100)

    })

    return(<div></div>)
}

export default Logout