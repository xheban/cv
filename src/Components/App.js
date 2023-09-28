import {BrowserRouter, Routes, Route} from "react-router-dom";
import AboutMe from './AboutMePage/AboutMe.jsx'
import NavigationBar from "./Navigation/NavBar";
import Education from "./EducationPage/Education";
import Experience from "./ExperiencePage/Experience";
import Skills from "./SkillsPage/Skills";
import {CvContextProvider} from "../helpers/cvContext";

const App = () => {
    return (
        <BrowserRouter>
            <CvContextProvider>
            <NavigationBar/>
            <Routes>
                <Route path="/" element={<AboutMe/>}/>
                <Route path="/vzdelanie" element={<Education/>}/>
                <Route path="/skusenosti" element={<Experience/>}/>
                <Route path="/znalosti" element={<Skills/>}/>
            </Routes>
            </CvContextProvider>
        </BrowserRouter>
    );
}

export default App;