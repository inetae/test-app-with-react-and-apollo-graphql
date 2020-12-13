import React from 'react';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Testimonials from 'components/Testimonials/Testimonials';
import Sidebar from 'components/Sidebar/Sidebar';
import Posts from 'components/Posts/Posts';
import style from './Home.module.scss';

const Home = () => (
    <div className={style.layout}>
        <Header />
        <div className={style.wrapper}>
            <Posts />
            <Sidebar />
            <Testimonials />
        </div>
        <Footer />
    </div>
);

export default Home;
