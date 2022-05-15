import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from 'react-pro-sidebar';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Icon, Image } from "semantic-ui-react";
import "./Navigation.css";
function Navigation() {
    const [logo,setLogo] = useState('')
    const [menuCollapse, setMenuCollapse] = useState(true)

    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
      };
     
    
    useEffect(()=>{
       setLogo(localStorage.getItem('logo'))
     
    },[])
    return (


        <ProSidebar breakPoint toggled={true} style={{position:'fixed'}} collapsed={menuCollapse} >
            <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? <Image src={logo}></Image> : "InventHooks"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
               <Icon name={'arrow circle right'}></Icon>
              ) : (
                <Icon name={'arrow circle right'}></Icon>
              )}
            </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="square" popperArrow={true}>
                    <MenuItem icon={<Icon name={"gem"}></Icon>}>
                        Dashboard
                        <Link to="/dashboard" />
                    </MenuItem>
                    <MenuItem icon={<Icon name={"first order"}></Icon>}>
                        Order
                        <Link to="/order" />
                    </MenuItem>
                    <MenuItem icon={<Icon name={"cart"}></Icon>}>
                        Product
                        <Link to="/product" />
                    </MenuItem>
                    <MenuItem icon={<Icon name={"gem"}></Icon>}>
                        Order History
                        <Link to="/transcation" />
                    </MenuItem>
                   
                    <MenuItem icon={<Icon name={"gem"}></Icon>}>
                        Settings
                        <Link to="/setting" />
                    </MenuItem>
                </Menu>
             
            </SidebarContent>
            <SidebarFooter>
            <Menu >
                    <MenuItem icon={<Icon name={"logout"}></Icon>}>
                        logout
                        <Link to="/logout" />
                    </MenuItem>
                </Menu>

            </SidebarFooter>
        </ProSidebar>
      

    )
}


export default Navigation;