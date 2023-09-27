import {Nav, Container, Navbar, NavLink} from "react-bootstrap"
import './Navbar.scss';

const NavigationBar = () =>{

    return (
        <Navbar expand="md" className="blackBg">
            <Container>
                <Navbar.Brand>Michal Heban - CV</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" variant="underline"
                     activeKey={window.location.pathname}
                     defaultActiveKey={"/"}>
                    <NavLink href="/" >O mne</NavLink>
                    <NavLink href="/vzdelanie" > Vzdelanie</NavLink>
                    <NavLink href="/skusenosti"> Pracovné skúsenosti</NavLink>
                    <NavLink href="/znalosti" > Znalosti</NavLink>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;