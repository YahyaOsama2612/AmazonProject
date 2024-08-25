import { NavLink } from "react-router-dom";
 import { useSelector } from "react-redux";
 import { selectCartItems } from "../app/applications//cart/cartSlice";

const Navbar = () => {
    const { cartItems } = useSelector(selectCartItems);

  return (
    <nav style={{ display: "flex", justifyContent: "space-between" }}>
      <img src="amazon-logo.jpg" alt="amazon logo" height={"80px"} />
      <ul  style={{ display: "flex"}}>
        <li style={{marginRight:"100px", listStyle:"none" }} >
          <NavLink style={{textDecoration:"none",color:"#000000"}} to="/cart">
            Cart({cartItems.length})
          </NavLink>
        </li>
        <li style={{marginRight:"100px", listStyle:"none" }}>
          <NavLink style={{textDecoration:"none",color:"#000000"}} to="/signin">
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
    
  );
};

export default Navbar;
