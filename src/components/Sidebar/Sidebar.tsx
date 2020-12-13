import React from 'react';
import CommentForm from 'components/CommentForm/CommentForm';
import style from './Sidebar.module.scss';

const Sidebar = () => (
    <div className={style.sidebarWrapper}>
        <CommentForm />
    </div>
);

export default Sidebar;
