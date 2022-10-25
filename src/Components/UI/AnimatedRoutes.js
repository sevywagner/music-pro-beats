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
            <Routes basename="/music-pro-beats" location={location} key={location.pathname}>
                <Route path='/' element={<Navigate to="/home" />} />
                <Route path='/home' element={<Home />} />
                <Route path='/beats' element={<Beat />} />
                <Route path='/beats/:beatId' element={<BeatDetailPage />} />
                <Route path='/services' element={<Services />} />
                <Route path='/success' element={<Approve />} />
                <Route path='/error' element={<Error />} />
            </Routes>
        </AnimatePresence>
        
    );
};

export default AnimatedRoutes;