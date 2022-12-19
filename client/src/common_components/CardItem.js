import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
    return (
        <>
            <li className='item'>
                <Link className='link' to={props.path}>
                    <figure className='image_container' data-category={props.label}>
<<<<<<< HEAD
                        <img className='image' alt='something' src={props.src}/>
=======
                        <img className='image' alt='Image' src={props.src}/>
>>>>>>> 6606f39 (Change in the folder structure)
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