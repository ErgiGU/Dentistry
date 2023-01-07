/**
 * Skeleton for cards inserted in patient home page.
 * @author Agata Ciuchta (@ciuchta)
 */
import React from 'react';
import './Card.css';
import CardItem from '../common_components/CardItem';
import Tips from '../assets/tips.png'
import TeethCare from '../assets/toothcare.png'

export default function Card() {
    return (
        <div id={'homeCardsTop'}>
            <div id={'homeCardsContainer'}>
                <div id={'homeCardsWrapper'}>
                    <ul id={'homeCardsItems'}>
                        <CardItem
                            src='https://st.depositphotos.com/1003098/1651/i/600/depositphotos_16512515-stock-photo-woman-with-receptionist-filling-form.jpg'
                            text='Find the clinics localizations in different parts of Göteborg.'
                            path='/'
                        />
                        <CardItem
                            src='https://static8.depositphotos.com/1594308/1073/i/600/depositphotos_10733789-stock-photo-medical-check-up.jpg'
                            text='Choose the day, time and book the appointment just now.'
                            path='/'
                        />
                        <CardItem
                            src="https://st4.depositphotos.com/13193658/24527/i/600/depositphotos_245279174-stock-photo-dentists-masks-standing-crossed-arms.jpg"
                            text='Find out more about our clinics. Vist the About Us page.'
                            path='/'
                        />
                    </ul>
                    <ul id={'homeCardsItems'}>
                        <CardItem
                            src={Tips}
                            text='To avoid any stress before the appointment, use the advices we prepared for you above!'
                        />
                        <CardItem
                            src={TeethCare}
                            text='What can you do to maintain your teeth health? Follow the list we prepared for you!'
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}
