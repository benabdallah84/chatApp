import React from "react";
import Avatar from "components/Avatar";
import { Row } from "reactstrap";
const ContactHeader = (props) => {
    return(
        <Row className="heading">
            <Avatar />
            <div>جهات الاتصال</div>
    
        </Row>
    )
}
export default ContactHeader