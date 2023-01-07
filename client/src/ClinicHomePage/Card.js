/**
 * Skeleton for cards inserted in the clinic home page.
 * @author Agata Ciuchta (@ciuchta)
 */
import React from 'react';
import '../home/Card.css';
import CardItem from '../common_components/CardItem';
import Services from '../assets/services.png'

function Card() {
    return (
        <div className='cards'>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem
                            src='https://static9.depositphotos.com/1023803/1104/i/600/depositphotos_11043046-stock-photo-closeup-of-calendar-page.jpg'
                            text='Check out all the booked appointments and their specifications.'
                            path='/'
                        />
                        <CardItem
                            src='https://st2.depositphotos.com/1003924/6299/i/600/depositphotos_62996381-stock-photo-computer-crime-concept.jpg'
                            text='Check if your information is correct and update it if it is needed. '
                            path='/'
                        />
                        <CardItem
                            src="https://st2.depositphotos.com/19525528/42295/i/600/depositphotos_422953320-stock-photo-medical-healthcare-concept-banner-red.jpg"
                            text='Check the current opening hours for your clinic for each weekday.'
                            path='/'
                        />
                    </ul>
                    <ul className='cards__items'>
                        <CardItem
                            src="https://static8.depositphotos.com/1000423/922/i/600/depositphotos_9220251-stock-photo-scientists-in-laboratory.jpg"
                            text='Add a new dentist to your clinic.'
                        />
                        <CardItem
                            src={Services}
                            text='Your clinic services.'
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Card;

