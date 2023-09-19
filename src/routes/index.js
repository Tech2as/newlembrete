import { Route, Routes, route } from "react-router-dom";

import Home from '../pages/Home';
import Register from '../pages/Register'
import Admin from '../pages/Admin';
import Private from "./Private";
import Finish from "../pages/Admin/finish";

function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>

            <Route path='/admin' element={<Private> <Admin/> </Private>}/>
            <Route path='/finish' element={<Private> <Finish/> </Private>}/>
        </Routes>
    )
}

export default RoutesApp;