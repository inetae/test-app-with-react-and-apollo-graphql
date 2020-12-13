import React, { ChangeEvent, FormEvent, useState } from 'react';
import classNames from 'classnames';
import { gql, useMutation } from '@apollo/client';
import { CommentsQuery } from 'queries/CommentsQuery';
import { Testimonial } from 'constants/interfaces';
import validateLogin from 'controllers/formValidation';
import style from './CommentForm.module.scss';

const ADD_COMMENT = gql`
    mutation addComment($firstName: String!, $lastName: String, $message: String!) {
        addComment(firstName: $firstName, lastName: $lastName, message: $message) {
            firstName
            lastName
            message
        }
    }
`;

const CommentForm = () => {
    const [commentData, setCommentData] = useState<Record<string, unknown>>({});
    const [errors, setErrors] = useState<Record<string, unknown>>({});
    const { firstName, lastName, message }: Testimonial = commentData;

    const resetInput = () => {
        setCommentData({});
    };

    const [addComment, { data, error }] = useMutation(ADD_COMMENT, {
        onCompleted: () => resetInput(),
        onError: () => resetInput(),
        refetchQueries: [
            {
                query: CommentsQuery,
                variables: {
                    firstName: `name`,
                    lastName: `surname`,
                    message: `text message`,
                },
            },
        ],
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        if (event) event.preventDefault();
        setErrors(validateLogin(commentData));

        if (Object.keys(validateLogin(commentData)).length === 0) {
            addComment({ variables: commentData });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.formGroup}>
                <label htmlFor="firstName" className={style.label}>
                    First name
                </label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder={errors.firstName ? `Please enter your name` : `Your name here`}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setCommentData({ ...commentData, firstName: e.target.value })
                    }
                    value={firstName || ``}
                    className={classNames(style.input, {
                        [style.errorInput]: errors.firstName,
                    })}
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="firstName" className={style.label}>
                    Last name
                </label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Your last name here"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setCommentData({ ...commentData, lastName: e.target.value })
                    }
                    value={lastName || ``}
                    className={style.input}
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="firstName" className={style.label}>
                    Your message
                </label>
                <textarea
                    name="message"
                    id="message"
                    cols={30}
                    rows={4}
                    placeholder={errors.message ? `Message cannot be empty` : `Type your message here`}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setCommentData({ ...commentData, message: e.target.value })
                    }
                    value={message || ``}
                    className={classNames(style.input, {
                        [style.errorInput]: errors.message,
                    })}
                />
            </div>
            {data && <p className={style.errorMessage}>Thank you for your comment!</p>}
            {error && <p className={style.errorMessage}>Something went wrong, try it later</p>}
            <button type="submit" className={style.button} disabled={Object.values(commentData).length === 0}>
                Submit
            </button>
        </form>
    );
};

export default CommentForm;
