import React from 'react';
import './Card.css';
import CardItem from './CardItem';

function Card() {
    return (
        <div className='cards'>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem
                            src='https://v.wpimg.pl/QUJDREVGfjQrJiR2eTxzIWh-cCw_ZX13P2ZoZ3lxY2Eyaz8qOCIoez00MSE4aSE5ZS19LXl2ZGRlKyA8MXNgY3txY2s8NzZ3Nw'
                            text='Explore the hidden waterfall deep inside the Amazon Jungle'
                            path='/'
                        />
                        <CardItem
                            src='images/img-2.jpg'
                            text='Travel through the Islands of Bali in a Private Cruise'
                            path='/'
                        />
                        <CardItem
                            src='images/img-3.jpg'
                            text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
                            path='/'
                        />
                    </ul>
                    <ul className='cards__items'>
                        <CardItem
                            src='images/img-4.jpg'
                            text='Experience Football on Top of the Himilayan Mountains'
                            path='/'
                        />
                        <CardItem
                            src='images/img-8.jpg'
                            text='Ride through the Sahara Desert on a guided camel tour'
                            path='/'
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Card;
