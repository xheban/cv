import {BrowserRouter, Routes, Route} from "react-router-dom";
import AboutMe from './AboutMe.js'
import NavigationBar from "./Navigation/NavBar";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";

const App = () => {
    return (
        <BrowserRouter>
            <NavigationBar/>
            <Routes>
                <Route path="/" element={<AboutMe/>}/>
                <Route path="/vzdelanie" element={<Education/>}/>
                <Route path="/skusenosti" element={<Experience/>}/>
                <Route path="/znalosti" element={<Skills/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;