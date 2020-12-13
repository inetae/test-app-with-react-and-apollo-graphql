import React from 'react';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import style from './Home.module.scss';

const Home = () => (
    <div className={style.layout}>
        <Header />
        <Footer />
    </div>
);

export default Home;
