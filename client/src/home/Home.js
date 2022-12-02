import React from 'react';
import './Card.css';
import CardItem from './CardItem';
import Card from './Card'
import Navbar from '../common_components/navbar'
import './Home.css'
function Home() {
    return (
        <>
            <Navbar/>
            <Card />
            <div className="footer">
                <a id="clinic" href="url">link text</a>
            </div>
        </>
    );
}

export default Home;