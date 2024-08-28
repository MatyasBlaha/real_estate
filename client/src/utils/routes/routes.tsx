import React, { lazy, Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';

const NoMatch = lazy(() => import('../../pages/NoMatch'));
const Home = lazy(() => import('../../pages/Home'));
const Login = lazy(() => import('../../pages/Login.tsx'));
const Register = lazy(() => import('../../pages/Register.tsx'));
const VerifyEmail = lazy(() => import('../../pages/EmailVerification.tsx'));
const Profile = lazy(() => import('../../pages/Profile.tsx'));
const CreateProfile = lazy(() => import('../../pages/CreateProfile.tsx'));



const AppRoutes = () => {
    return (
        <Suspense fallback={<div className='container'>Loading... </div>}>
            <Routes>
                <Route path='*' element={<NoMatch />} />
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/verify/email/:token' element={<VerifyEmail />} />
                <Route path='/profile/:profileId' element={<Profile />} />
                <Route path='create-profile' element={<CreateProfile />} />
                {/*<Route path='/profile/:id/edit' element={<ProtectedRoute element={<EditProfile />} />} />*/}
            </Routes>
        </Suspense>
    )
}

export default AppRoutes;