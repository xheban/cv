import {Col, Container, Row, Image} from "react-bootstrap";
import foto from '../../StaticFiles/foto.jpg'
const AboutMe = () => {
    return (
        <Container>
            <Row className="pt-4">
                <Col xs={12} sm={6}>
                    <Image src={foto} thumbnail/>
                </Col>
                <Col xs={12} sm={6}>
                    <h3> Kontakt: </h3>
                    <div>
                        <i className="bi-envelope-at"> michal.heban52@gmail.com </i>
                    </div>
                    <div className="pt-2">
                        <i className="bi-telephone"> +421 911 138 630 </i>
                    </div>
                    <div className="pt-2 pb-2">
                        <i className="bi-geo-alt"> Mlynica 52, 05991 Mlynica, Slovenská republika </i>
                    </div>
                    <h3> O mne: </h3>
                    <div> Takmer od ukončenia strednej školy sa venujem programovaniu. Mojím hlavným zameraním je tvorba webových aplikácií, kde mám skúsenosti ako aj s backednom, tak aj s frontendom a venujem sa tomu už 5 rokov.</div>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutMe;