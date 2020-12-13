import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from '@reach/router';
import useIsMobile from 'controllers/useIsMobile';
import logo from 'assets/images/logo.svg';
import style from './Header.module.scss';

const Header = () => {
    const documentIsDefined = typeof document === `object`;
    const [isOpen, setIsOpen] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const isMobile = useIsMobile(768);

    const toggleMobileMenu = () => {
        if (documentIsDefined) {
            const body = document.querySelector(`body`);
            if (body) {
                body.classList.toggle(`overflowHidden`);
            }
        }
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        removeOverflowHidden();

        window.addEventListener(`resize`, removeOverflowClassAndChangeState, {
            passive: true,
        });
        return () => window.removeEventListener(`resize`, removeOverflowClassAndChangeState);
    }, []);

    const removeOverflowHidden = () => {
        if (documentIsDefined) {
            const body = document.querySelector(`body`);
            if (body) {
                body.classList.remove(`overflowHidden`);
            }
        }
    };

    const removeOverflowClassAndChangeState = () => {
        removeOverflowHidden();
        setIsOpen(false);
    };

    return (
        <div className={style.header}>
            <div className={style.wrapper}>
                <Link to="/">
                    <img src={logo} alt="Logo" className={style.logo} />
                </Link>
                {isMobile && (
                    <div>
                        <div
                            className={classNames(style.menu, { [style.open]: isOpen })}
                            onClick={() => toggleMobileMenu()}
                        >
                            <span className={style.bar} />
                            <span className={style.bar} />
                            <span className={style.bar} />
                        </div>
                        <nav
                            className={classNames(style.mobileNav, {
                                [style.openMobileNav]: isOpen,
                            })}
                        >
                            <svg width={100} height={40} className={style.svg}>
                                <text x="50%" y="50%" className={style.text}>
                                    MENU
                                </text>
                            </svg>
                            <a href="#" className={style.link} onClick={() => {setIsOpen(false); removeOverflowHidden()}}>
                                Projects
                            </a>
                            <a href="#" className={style.link} onClick={() => {setIsOpen(false); removeOverflowHidden()}}>
                                About Us
                            </a>
                            <a href="#" className={style.link} onClick={() => {setIsOpen(false); removeOverflowHidden()}}>
                                Testimonials
                            </a>
                            <a href="#" className={style.link} onClick={() => {setIsOpen(false); removeOverflowHidden()}}>
                                Contacts
                            </a>
                        </nav>
                    </div>
                )}
                {!isMobile && (
                    <ul className={style.navList}>
                        <li
                            className={style.navListItem}
                            onMouseEnter={() => setIsPopoverOpen(true)}
                            onMouseLeave={() => setIsPopoverOpen(false)}
                        >
                            <p
                                className={classNames(style.link, {
                                    [style.active]: isPopoverOpen,
                                })}
                            >
                                Projects
                            </p>
                            <ul
                                className={classNames(style.subList, {
                                    [style.subListOpen]: isPopoverOpen,
                                })}
                            >
                                <li className={style.subListItem}>
                                    <a href="#" className={style.subListLink} onClick={() => setIsPopoverOpen(false)}>
                                        Link 1
                                    </a>
                                </li>
                                <li className={style.subListItem}>
                                    <a href="#" className={style.subListLink} onClick={() => setIsPopoverOpen(false)}>
                                        Link 2
                                    </a>
                                </li>
                                <li className={style.subListItem}>
                                    <a href="#" className={style.subListLink} onClick={() => setIsPopoverOpen(false)}>
                                        Link 3
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className={style.navListItem}>
                            <a href="#" className={style.link}>
                                About Us
                            </a>
                        </li>
                        <li className={style.navListItem}>
                            <a href="#" className={style.link}>
                                Testimonials
                            </a>
                        </li>
                        <li className={style.navListItem}>
                            <a href="#" className={style.link}>
                                Contacts
                            </a>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Header;
