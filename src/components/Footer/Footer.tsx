import React from 'react';
import classNames from 'classnames';
import { Link } from '@reach/router';
import useIsMobile from 'controllers/useIsMobile';
import style from './Footer.module.scss';

const Footer = () => {
    const isMobile = useIsMobile(600);
    return (
        <div className={style.footerWrapper}>
            <div className={style.footer}>
                <div className={style.navigation}>
                    <Link to="/" className={classNames(style.link, { [style.mobileLink]: isMobile })}>
                        Home
                    </Link>
                    <Link to="#Projects" className={classNames(style.link, { [style.mobileLink]: isMobile })}>
                        Projects
                    </Link>
                    <Link to="#AboutUs" className={classNames(style.link, { [style.mobileLink]: isMobile })}>
                        About Us
                    </Link>
                    <Link to="#Testimonials" className={classNames(style.link, { [style.mobileLink]: isMobile })}>
                        Testimonials
                    </Link>
                    <Link to="#Contact" className={classNames(style.link, { [style.mobileLink]: isMobile })}>
                        Contact
                    </Link>
                </div>
                <p className={style.text}>
                    Lacus augue efficitur mi, vitae iaculis lorem turpis in enim. Donec tristique dignissim massa, id
                    dignissim tellus sodales nec. Ut molesti neque eu arcu ultrices rhoncus. Suspendisse potenti.Quisque
                    a justo efficitur, sagittis felis at, maximus lacus. Sed id tempor mauris. Suspendisse eget ipsum
                    nibh. Nam ornare sodales mi quis ornare.
                </p>
            </div>
        </div>
    );
};

export default Footer;
