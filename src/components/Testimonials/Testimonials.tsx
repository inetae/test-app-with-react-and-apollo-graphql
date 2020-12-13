import React, { useRef } from 'react';
import { useQuery } from '@apollo/client';
import Slider from 'react-slick';
import { Testimonial } from 'constants/interfaces';
import { CommentsQuery } from 'queries/CommentsQuery';
import style from './Testimonials.module.scss';
import 'assets/style/slick.scss';

const Testimonials = () => {
    const slider = useRef<any>(null);

    const { error, data } = useQuery(CommentsQuery);

    const settings = {
        arrows: false,
        focusOnSelect: false,
        infinite: true,
        slidesToScroll: 1,
        swipeToSlide: true,
        variableWidth: true,
    };

    const lastSixComments = data && data.comments.slice(Math.max(data.comments.length - 6, 0)).reverse();

    return (
        <>
            <div className={style.wrapper}>
                {error && <p>Content can&apos;t be loaded</p>}
                <Slider {...settings} ref={slider}>
                    { !error
                    && lastSixComments
                    && lastSixComments.map(({ id, firstName, lastName, message }: Testimonial) => (
                        <div key={`${id}-post`}>
                            <div
                                className={style.commentWrapper}
                                onClick={() => slider.current && slider.current.slickGoTo(id)}
                            >
                                <p className={style.name}>
                                    {firstName}
                                    {lastName && <span>, {lastName}</span>}
                                </p>
                                <p className={style.text}>
                                    {message && message.length > 150
                                        ? message.substring(0, 150).concat(`...`)
                                        : message}
                                </p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            {!error && (
                <div className={style.arrows}>
                    <div className={style.arrow} onClick={() => slider.current.slickPrev()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59">
                            <path
                                d="M32.725 36.949L25.5 29.724l7.225-7.224"
                                fill="none"
                                stroke="#4d1ba8"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
                    <div className={style.arrow} onClick={() => slider.current.slickNext()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59">
                            <path d="M26 22l7.225 7.225L26 36.449" fill="none" stroke="#4d1ba8" strokeWidth="2" />
                        </svg>
                    </div>
                </div>
            )}
        </>
    );
};

export default Testimonials;
