import { Route, Routes, useLocation, Navigate } from "react-router";
import Beat from "../../Pages/Beat";
import BeatDetailPage from "../Beats/BeatDetailPage";
import Home from "../../Pages/Home";
import { AnimatePresence } from 'framer-motion';
import Approve from "../Cart/PayPal/Approve";
import Error from "../Cart/PayPal/Error";
import Services from "../../Pages/Services";

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Navigate to="/music-pro-beats/home" />} />
                <Route path='/music-pro-beats' element={<Navigate to="/home" />} />
                <Route path='/music-pro-beats/home' element={<Home />} />
                <Route path='/music-pro-beats/beats' element={<Beat />} />
                <Route path='/music-pro-beats/beats/:beatId' element={<BeatDetailPage />} />
                <Route path='/music-pro-beats/services' element={<Services />} />
                <Route path='/music-pro-beats/success' element={<Approve />} />
                <Route path='/music-pro-beats/error' element={<Error />} />
            </Routes>
        </AnimatePresence>
        
    );
};

export default AnimatedRoutes;