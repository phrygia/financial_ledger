import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import style from '../../assets/css/main.module.css';

function Main() {
    return (
        <>
            <Header class="main" />
            <Link to={'/add'} style={{ display: 'block', marginTop: '60px' }}>
                add
            </Link>
        </>
    );
}

export default Main;
