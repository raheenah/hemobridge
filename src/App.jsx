import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import WelcomePage from "./pages/welcomePage";
import { BrowserRouter as  Router , Routes , Route } from "react-router-dom";
import Signin from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword"
import LinkSent from "./pages/LinkSent"
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./context";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<WelcomePage />}>
            <Route index element={<Signin />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-link-sent' element={<LinkSent />} />
            <Route path='reset-password' element={<ResetPassword />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
