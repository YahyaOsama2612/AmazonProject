import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../app/applications//cart/cartSlice";
import { ShoppingCart } from "lucide-react";
import { memo } from "react";

const Navbar = () => {
  const { cartItems } = useSelector(selectCartItems);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: "#131921",
        color: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        marginBottom: "20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="amazon-logo.jpg"
          alt="Amazon logo"
          height="40px"
          style={{ marginRight: "20px" }}
        />
      </div>

      <ul
        style={{
          display: "flex",
          alignItems: "center",
          listStyle: "none",
          margin: 0,
        }}
      >
        <li>
          <NavLink
            style={{
              textDecoration: "none",
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
            to="/cart"
          >
            <div style={{ position: "relative" }}>
              <ShoppingCart size={28} />
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  backgroundColor: "#f08804",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                {cartItems.length}
              </span>
            </div>
            <span style={{ marginLeft: "8px", fontWeight: "bold" }}>Cart</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Navbar) ;
