import React from 'react';
import Avatar from 'components/Avatar'; 
import { Row } from 'reactstrap';

function UserPrifile(props) {
    return (
        <div className={props.open ? 'side-profile open' : 'side-profile'}>
            <Row className='heading'>
                <div className='mr-2 nav-link' onClick={props.toggle}>
                    <i className='fa fa-arrow-right'></i>

                </div>
                <div>{props.contact.name}</div>

            </Row>
            <div className='d-flex flex-column overflow-auto'>
                <Avatar src={props.contact.avatar}/>
                <div className='bg-white px-3 py-3'>
                    <label className='text-muted'>رسالة الحالة</label>
                    <p>{props.contact.about ? props.contact.about : 'أهلا بك في ملفي الشخصي'}</p>

                </div>
            </div>
        </div>
    );
}

export default UserPrifile;