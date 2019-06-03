import React from 'react';
import Layout from '../components/Layout/Layout';
import Box from '../components/Layout/Box';
import MainMenu from '../components/MainMenu';
import SearchInput from '../containers/search-input';
import CommonList from '../containers/common-list'


const CommonSearch = React.createClass({

    render: function() {
        return (
            <Layout type="row" classes="main-layout">
                <Box width="80px" classes="border-bottom-dark">
                    <MainMenu />
                </Box>
                <Layout type="column" classes="border-top-light">
                    <Box height="70px" classes="border-bottom-dark">
                        <SearchInput classes="main-search-input"/>
                    </Box>
                    <Layout classes="border-top-light">
                        <Box width="350px" classes="border-right-dark">
                            <CommonList />
                        </Box>
                        <Layout type="column" classes="border-left-light">&nbsp;</Layout>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
});

export default CommonSearch;