import { ThemeProvider } from "@mui/material";
import { theme } from "./shared/utilits/theme";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div style={{margin:"2rem" }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage/>} />
          </Routes>
        </Router>
      </ThemeProvider>
  
    </div>
  );
}

export default App;
