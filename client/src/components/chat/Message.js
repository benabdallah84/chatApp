import React from 'react';
import moment from 'moment';

function Message(props) {
    return (
        <div className={props.message.outgoing ? 'message-item' : 'message-item incoming'}>
            <div className='d-flex flex-row'>
                <div className='body m-1 mr-2'>
                    <div>{props.message.content}</div>
                    <span className='small text-muted'>
                        {moment(props.message.data).format('hh:mm a |MMM D')}

                    </span>
                </div>

            </div>
            
        </div>
    );
}

export default Message;