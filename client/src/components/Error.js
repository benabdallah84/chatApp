import React from 'react';
import { Alert} from 'reactstrap'
function Error(props) {
    return (
        <div>
            {props.error ? <Alert color='danger'>{props.error}</Alert> : ""
}        </div>
    );
}
 
export default Error;