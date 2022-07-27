import React from "react";
import { useHistory } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";




const Navbar = ({ setToggle }) => {

    const history =  useHistory();
    const handleLogout = (event) =>{
        event.preventDefault();
        history.push('/logout')
    }

    return (
    <div className="navbar">
      <div className="brand">
        <div className="hamburger" onClick={setToggle}>
          <div />
          <div />
          <div />
        </div>
        <div className="logo">
          <a href="/home"><Image src={'/assets/inventhooks-logo.png'} size="mini"></Image></a>
        </div>
      </div>
      <div className="left">
        <Icon name="sign-out" onClick={handleLogout}></Icon>
      </div>
    </div>
  );
};
export default Navbar;
