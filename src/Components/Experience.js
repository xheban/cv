import {Accordion, Container, Row} from "react-bootstrap";
const Experience = () => {
    return (
        <Container>
            <Row className="pt-4">
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Analytica Design , spol. s r.o.</Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <i className="bi-dot"> 2018-2020 </i>
                            </div>
                            <div className="pt-2">
                                <i className="bi-dot"> Programátor webových aplikácií </i>
                            </div>
                            <div className="pt-2">
                                <i className="bi-dot"> Technológie: AngularJS, Javascript, PHP, PostgreSQL, Git, Jira </i>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>IBM Slovensko, spol. s r.o.</Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <i className="bi-dot"> 2021-2023 </i>
                            </div>
                            <div className="pt-2">
                                <i className="bi-dot"> Frontend programátor </i>
                            </div>
                            <div className="pt-2">
                                <i className="bi-dot"> Technológie: React, Javascript, Git, Jira </i>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>
        </Container>
    );
}

export default Experience;