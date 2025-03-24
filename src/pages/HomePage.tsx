import { memo } from "react";
import Navbar from "../components/NavBar";
import Productslist from "../components/Productslist";


const HomePage = () => {
  return (
    <div >
      <Navbar/>
       <Productslist/> 
    </div>
  );
};

export default memo(HomePage) ;
