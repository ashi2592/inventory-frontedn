import React from "react";
import { useHistory } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

const nav = [
  { text: "Dashboard", link: "/dashboard", icon: "home" },
  { text: "Order", link: "/order", icon: "box" },
  { text: "Product", link: "/product", icon: "tv", active: true },
  { text: "Purchases", link: "/purchase", icon: "money" },
  { text: "History", link: "/transcation", icon: "book" },
  { text: "Customer", link: "/customer", icon: "user" },
  { text: "Settings", link: "/setting", icon: "setting" },

];

const Sidebar = ({ toggleBtn }) => {

    const history =  useHistory();

    const handleICon= (name)=>{
         history.push(name)
    }
  return (
    <div
      className={`${toggleBtn ? "sidebar collapse" : "sidebar"}`}
      data-simplebar
    >
      <ul>
        {nav.map(item => (
          <li key={item.text}>
                <Menu.Item as="a" onClick={()=>handleICon(item.link)}>
            <span className="icon">
                <Icon name={item.icon} ></Icon>
              </span>
              <span className="title">{item.text}</span>
            </Menu.Item>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
