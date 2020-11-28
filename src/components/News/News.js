import {Grid, Header, Loader} from 'semantic-ui-react';
import NewsPanel from '../NewsPanel/NewsPanel';
import NewsHeader from '../Header/NewsHeader';
import React from "react";
import {connect} from "react-redux";
import {getNews} from "../../actions";


function News(props) {
    const { getNews } = props;
    const { loading } = props.news;
    const info = 'Hacker News';
    const handleClick = () => getNews();
    return (
        <div>
            <Grid divided='vertically' centered>
                <Grid.Column width={10}>
                    <Grid.Row>
                        <NewsHeader getData={handleClick} goBack={false}/>
                    </Grid.Row>
                    <Grid.Row >
                        <Header as='h1' style={{marginBottom: '10px'}} dividing>{info}</Header>
                    </Grid.Row>
                    <Grid.Row>
                        <Loader active={loading} inline='centered' />
                        <NewsPanel />
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        news: state.news,
    }
};

export default connect(mapStateToProps, { getNews })(News);
