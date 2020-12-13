import React from 'react';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Posts from 'components/Posts/Posts';
import style from './Home.module.scss';

const Home = () => (
    <div className={style.layout}>
        <Header />
        <div className={style.wrapper}>
            <Posts />
        </div>
        <Footer />
    </div>
);

export default Home;
