import {Accordion, Container, Row} from "react-bootstrap";

const Education = () => {
    return (
        <Container>
            <Row className="pt-4">
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Gymnázium, Dominika Tatarku, Poprad</Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <i className="bi-dot"> všeobecné zameranie </i>
                            </div>
                            <div className="pt-2">
                                <i className="bi-dot"> 2012-2016 </i>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Fakulta informatiky a informačných technológií, STU, Bratislava</Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <i className="bi-dot"> Bakalárske štúdium </i>
                            </div>
                            <div className="pt-2">
                                <i className="bi-dot"> 2016-2021 </i>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Fakulta informatiky, Paneurópska vysoká škola, Bratislava</Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <i className="bi-dot"> Bakalárske štúdium a pokračovanie na Magisterskom</i>
                            </div>
                            <div className="pt-2">
                                <i className="bi-dot"> 2021- aktuálne </i>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>
        </Container>
    );
}

export default Education;