import {Col, Container, Row, Image} from "react-bootstrap";
import {useContext} from "react";
import {CvContext} from "../../helpers/cvContext";
const AboutMe = () => {
    const { cv } = useContext(CvContext);
    return (
        <Container>
            <Row className="pt-4">
                <Col xs={12} sm={6}>
                    <Image src={cv.photoPath} thumbnail/>
                </Col>
                <Col xs={12} sm={6}>
                    <h3> Kontakt: </h3>
                    <div>
                        <i className="bi-envelope-at"> {cv.contact.email} </i>
                    </div>
                    <div className="pt-2">
                        <i className="bi-telephone"> {cv.contact.telephone} </i>
                    </div>
                    <div className="pt-2 pb-2">
                        <i className="bi-geo-alt"> {cv.contact.address} </i>
                    </div>
                    <h3> O mne: </h3>
                    <div>{cv.about}</div>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutMe;