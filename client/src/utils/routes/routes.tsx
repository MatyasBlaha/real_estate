import React, {lazy, Suspense, useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from "./protectedRoutes.tsx";

const NoMatch = lazy(() => import('../../pages/NoMatch'));
const Home = lazy(() => import('../../pages/Home'));
const Login = lazy(() => import('../../pages/Login.tsx'));
const Register = lazy(() => import('../../pages/Register.tsx'));
const VerifyEmail = lazy(() => import('../../pages/EmailVerification.tsx'));
const Profile = lazy(() => import('../../pages/Profile.tsx'));
const CreateProfile = lazy(() => import('../../pages/CreateProfile.tsx'));
const CreateProperty = lazy(() => import('../../pages/CreateEstate.tsx'))



const AppRoutes = () => {
    const [showFallback, setShowFallback] = useState(false)

    const fallbackTimer = 2000

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFallback(true)
        }, fallbackTimer);

        return () => clearTimeout(timer);
    })


    return (
        <Suspense fallback={showFallback ? <div className='container'>Loading... </div> : null}>
            <Routes>
                <Route path='*' element={<NoMatch />} />
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/verify/email/:token' element={<VerifyEmail />} />
                <Route path='/profile/:profileId' element={<Profile />} />
                <Route path='create-profile' element={<CreateProfile />} />

                <Route path='/create-estate' element={<ProtectedRoute element={<CreateProperty />} />} />
            </Routes>
        </Suspense>
    )
}

export default AppRoutes;