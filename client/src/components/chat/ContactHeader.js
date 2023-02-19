import React from "react";
import Avatar from "components/Avatar";
import { Row } from "reactstrap";
const ContactHeader = (props) => {
    return(
        <Row className="heading">
            <Avatar src={props.user.avatar}/>
            <div>جهات الاتصال</div>
            <div className="mr-auto nav-link" onClick={props.toggle}>
                <i className="fa fa-bars"></i>
            </div>
        </Row>
    )
}
export default ContactHeader