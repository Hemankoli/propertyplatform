import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminRoute, ConfirmationModal, Footer, Header, Loader, Login, PropertyForm, Signup, UserRoute } from './components'
import { AccountPage, Admin, Home, PageNotFound, PropertyDetails, PropertyPage } from './pages'
import { useMainContext } from './context';

export default function AppRoutes() {
    const { modal, loader } = useMainContext();
    
    return (
        <BrowserRouter>
            <Toaster />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='*' element={<PageNotFound />} />
                <Route path="/properties" element={<PropertyPage />} />
                <Route path="/properties/:propertyId" element={<PropertyDetails />} />
                <Route path="/dashboard" element={<AdminRoute />} >
                    <Route path="admin" element={<Admin />} />
                </Route>
                <Route path="/dashboard" element={<UserRoute />} >
                    <Route path="account" element={<AccountPage />} />
                </Route>
            </Routes>
            {loader && <Loader />}
            {modal === "login-modal" && <Login key="login-modal" />}
            {modal === "signup-modal" && <Signup key="signup-modal" />}
            {modal === "create-property-modal" && <PropertyForm key="create-property-modal" />}
            {modal === "delete-property-modal" && <ConfirmationModal key="delete-property-modal" />}
            <Footer />
        </BrowserRouter>
    )
}
