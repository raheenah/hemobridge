import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import WelcomePage from "./pages/welcomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import LinkSent from "./pages/LinkSent";
import ResetPassword from "./pages/ResetPassword";
import PasswordResetSuccess from "./pages/PasswordResetSuccess";
import TermsAndConditions from "./pages/TnC";
import SignUp from "./pages/SignUp";
import UserApp from "./pages/Donor/UserApp";
import EducationalContent from "./pages/Donor/EduContent";
import Donate from "./pages/Donor/Donate";
import { AuthProvider } from "./context";
import Account from "./pages/Donor/Account";
import Help from "./pages/Donor/Help";
import Dashboard from "./pages/Donor/Dashboard";
import Notifications from "./pages/Donor/Notifications";
import FacilityAccount from "./pages/Facility/Account";
import FacilityDashboard from "./pages/Facility/Dashboard";
import FacilityApp from "./pages/Facility/FacilityApp";
import VerifyAccount from "./pages/Verify";
import ProtectedRoute from "./ProtectedRoute";
import Send_Code from "./pages/Resend Code";
import Inventory from "./pages/Facility/Inventory";
import Emergency_Requests from "./pages/Facility/Emergency";
import Care_Giver_App from "./pages/Care-giver/UserApp";


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
            <Route path='verify-otp' element={<VerifyAccount />} />
            <Route path='verify-email' element={<Send_Code />} />
          </Route>

          {/* <Route element={<ProtectedRoute />}> */}

          <Route path='/user' element={<UserApp />}>
            <Route
              path='educational-content'
              element={<EducationalContent />}
            />
            <Route path='donate' element={<Donate />} />
            <Route path='account' element={<Account />} />
            <Route path='help' element={<Help />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='notifications' element={<Notifications />} />
          </Route>

          <Route path='/facility' element={<FacilityApp />}>
            <Route path='dashboard' element={<FacilityDashboard />} />
            <Route path='account' element={<Account />} />
            <Route path='help' element={<Help />} />
            <Route path='inventory' element={<Inventory />} />
            <Route path='emergency-requests' element={<Emergency_Requests />} />

            <Route path='notifications' element={<Notifications />} />
          </Route>

          <Route path='/care-giver' element={<Care_Giver_App />}>
            <Route path='inventory' element={<Donate />} />
            <Route
              path='educational-content'
              element={<EducationalContent />}
            />
            <Route path='emergency-requests' element={<Emergency_Requests />} />

            <Route path='account' element={<Account />} />
            <Route path='help' element={<Help />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='notifications' element={<Notifications />} />
          </Route>

          {/* </Route> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
