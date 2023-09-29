import {Nav, Container, Navbar, NavLink, NavDropdown} from "react-bootstrap"
import './Navbar.scss';
import {userData} from '../../Data/UsersData'
import {useContext} from "react";
import {CvContext} from "../../Helpers/CvContext";

const NavigationBar = () =>{
    const { cv, setCv } = useContext(CvContext);
    const changeCv = (i) => {
        localStorage.setItem('cvId', JSON.stringify(i));
        setCv(userData[i]);
    }

    const createCvList =() => {
        let cvList = [];
        for (let i = 0; i < userData.length; i++) {
            cvList.push(<NavDropdown.Item key={i} onClick={() => changeCv(i)}>{userData[i].name} </NavDropdown.Item>);
        }
        return cvList;
    }

    return (
        <Navbar expand="md" className="blackBg">
            <Container>
                <Navbar.Brand> {cv.name} - CV</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" variant="underline"
                         activeKey={window.location.pathname}
                         defaultActiveKey={"/cv"}>
                        <NavLink href="/cv" >O mne</NavLink>
                        <NavLink href="/cv/vzdelanieeee" > Vzdelanieee</NavLink>
                        <NavLink href="/cv/skusenosti"> Pracovné skúsenosti</NavLink>
                        <NavLink href="/cv/znalosti" > Znalosti</NavLink>
                    </Nav>
                    <Nav className="ms-auto" variant="underline">
                        <NavDropdown title="CV-výber" id="basic-nav-dropdown">
                            {createCvList()}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;