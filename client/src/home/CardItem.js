import React from 'react';
import {Link} from 'react-router-dom';

function CardItem(props) {
    return (
        <>
            <li className='item'>
                <Link className='link' to={props.path}>
                    <figure className='image_container' data-category={props.label}>
                        <img className='image' alt='item' src={props.src}/>
                    </figure>
                    <div className='text_container'>
                        <h5 className='text'>{props.text}</h5>
                    </div>
                </Link>
            </li>
        </>
    );
}

export default CardItem;