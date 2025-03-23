import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import WelcomePage from "./pages/welcomePage";
import { BrowserRouter as  Router , Routes , Route } from "react-router-dom";
import Signin from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword"
import LinkSent from "./pages/LinkSent"
import ResetPassword from "./pages/ResetPassword";
import PasswordResetSuccess from "./pages/PasswordResetSuccess";
import TermsAndConditions from "./pages/TnC";
import SignUp from "./pages/SignUp";
import UserApp from "./pages/Donor/UserApp";
import EducationalContent from "./pages/Donor/EduContent";
import Donate from "./pages/Donor/Donate";
import { AuthProvider } from "./context";
import Account from "./pages/Donor/Account";


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
            <Route
              path='reset-password-success'
              element={<PasswordResetSuccess />}
            />
            <Route
              path='terms-and-conditions'
              element={<TermsAndConditions />}
            />
            <Route path='sign-up' element={<SignUp />} />
          </Route>
          <Route path='/user' element={<UserApp />}>
            <Route
              path='educational-content'
              element={<EducationalContent />}
            />
            <Route path='donate' element={<Donate />} />
            <Route path="account" element={<Account/>}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
