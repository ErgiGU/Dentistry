/**
 * Skeleton for card body.
 * @author Agata Ciuchta (@ciuchta)
 */
import React from 'react';
import {Link} from 'react-router-dom';

export default function CardItem(props) {
    return (
        <>
            <li className='item' id={'homeCardItem'}>
                <Link className='link' id={'homeCardLink'} to={props.path}>
                    <figure className='image_container' id={'homeCardImageContainer'} data-category={props.label}>
                        <img className='image' id={'homeCardImage'} alt='card' src={props.src}/>
                    </figure>
                    <div className='text_container' id={'homeCardTextContainer'}>
                        <h5 className='text' id={'homeCardText'}>{props.text}</h5>
                    </div>
                </Link>
            </li>
        </>
    );
}
