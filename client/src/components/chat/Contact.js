import React from 'react';
import Avatar from 'components/Avatar';
import moment from 'moment';
import {Badge} from 'reactstrap'
const Contact =props =>(
    <div className='Contact m-2'>
        <div>
            <Avatar src={props.contact.avatar}/>
            {props.contact.status === true ? <i className='fa fa-circle online'/> : ''}
        </div>
        <div className='w-50'>
            <div className='name mr-1'>{props.contact.name}</div>
            {/* <div className='small last-message'>
                {props.message ? props.message.content : 'انقر هنا قصد المحاولة'}
            </div> */}
        </div>
        <div className='flex-grow-1 text-left'>
            <div className='small text-muted'>
            {props.message ? moment(props.message.data).format("hh:mm a") : ''}
            </div>
            {props.unseen > 0 ? <Badge Color="success">{props.unseen}</Badge> : ''}
        </div>
    </div>
)
export default Contact