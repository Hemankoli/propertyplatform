import './App.css';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Header from './components/Header';
import { useMainContext } from './context';
import Home from './pages/Home';
import Login from './components/modals/Login';
import Signup from './components/modals/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PropertyDetails from './pages/PropertyDetails';
import Admin from './pages/Admin';
import PropertyForm from './components/modals/PropertyForm';
import { Loader } from './components/modals/Loader';
import { ConfirmationModal } from './components/modals/ConfirmModal';
import { AccountPage } from './pages/AccountPage';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import PropertyPage from './pages/PropertyPage';

function App() {
  const { modal, loader } = useMainContext();
  
  return (
    <BrowserRouter>
      <Toaster />
      {loader && <Loader />}
      {modal === "login-modal" && <Login key="login-modal" />}
      {modal === "signup-modal" && <Signup key="signup-modal" />}
      {modal === "create-property-modal" && <PropertyForm key="create-property-modal" />}
      {modal === "delete-property-modal" && <ConfirmationModal key="delete-property-modal" />}
      <Header />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<PropertyPage />} />
        <Route path="/properties/:propertyId" element={<PropertyDetails />} />
        <Route path="/dashboard" element={<AdminRoute />} >
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="/dashboard" element={<UserRoute />} >
          <Route path="account" element={<AccountPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
