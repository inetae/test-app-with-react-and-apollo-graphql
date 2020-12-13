import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useQuery } from '@apollo/client';
import { Post } from 'constants/interfaces';
import { postsQuery } from 'queries/postsQuery';
import style from './Posts.module.scss';

const Posts = () => {
    const { loading, error, data } = useQuery(postsQuery);

    if (loading) return <p>Loading...</p>;

    return (
        <div className={style.contentWrapper}>
            {error && <p>Content can&apos;t be loaded</p>}
            {!error && data && data.posts.map(({ id, title, content }: Post) => (
                <div key={id} className={style.content}>
                    <p>{title}</p>
                    {content && (
                        <ReactMarkdown
                            children={content}
                            escapeHtml={false}
                            renderers={{
                                link: ({ href, children }) => (

                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={style.link}
                                    >
                                        {children}
                                    </a>
                                )
                            }}
                        />
                    )}
                </div>
                ))}
        </div>
    );
};

export default Posts;
