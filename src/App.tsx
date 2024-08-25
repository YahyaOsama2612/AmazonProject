import { ThemeProvider } from "@mui/material";
import { theme } from "./shared/utilits/theme";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import SigninPage from "./pages/SigninPage";
import CartPage from "./pages/CartPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div style={{margin:"2rem" }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/cart" element={<CartPage/>} />
          </Routes>
        </Router>
      </ThemeProvider>
      <Toaster/>
    </div>
  );
}

export default App;
