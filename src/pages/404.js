import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';

const NoMatch = () => (
    <Layout className="app-404" isHeader={false}>
        <h1>Page not found  404</h1>
        <Link to="/" >Back_To_Home</Link>
    </Layout>
)

export default NoMatch