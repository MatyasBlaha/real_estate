import React, { lazy, Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';

const NoMatch = lazy(() => import('./pages/NoMatch'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));



const AppRoutes = () => {
    return (
        <Suspense fallback={<div className='container'>Loading... </div>}>
            <Routes>
                <Route path='*' element={<NoMatch />} />
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </Suspense>
    )
}

export default AppRoutes;