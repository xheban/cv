import { Routes, Route, HashRouter} from "react-router-dom";
import AboutMe from './AboutMePage/AboutMe.jsx'
import NavigationBar from "./Navigation/NavBar";
import Education from "./EducationPage/Education";
import Experience from "./ExperiencePage/Experience";
import Skills from "./SkillsPage/Skills";
import {CvContextProvider} from "../Helpers/CvContext";
import TicketSystem from "./TicketSystem/TicketSystem";

const App = () => {
    return (
        <HashRouter>
            <CvContextProvider>
            <NavigationBar />
            <Routes>
                <Route path="/cv" element={<AboutMe/>}/>
                <Route path="/cv/vzdelanie" element={<Education/>}/>
                <Route path="/cv/skusenosti" element={<Experience/>}/>
                <Route path="/cv/znalosti" element={<Skills/>}/>
                <Route path="/cv/ticket" element={<TicketSystem/>}/>
            </Routes>
            </CvContextProvider>
        </HashRouter>
    );
}

export default App;