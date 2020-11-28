import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Icon } from 'semantic-ui-react';
import {decodeHTML, getDate} from '../../decoding';
import {connect} from "react-redux";
import {getNews} from "../../actions";


function NewsPanel(props) {
    const { news } = props;
    return (
        <Item.Group divided>
            {
                news.map((oneNews) => (
                    <Item size='medium' key={oneNews.value.id}>
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as={Link} to={`/post/${oneNews.value.id}`}>
                                {decodeHTML(oneNews.value.title)}
                            </Item.Header>
                            <Item.Meta>by {oneNews.value.by}</Item.Meta>
                            <Item.Extra>
                                <div>
                                    {getDate(oneNews.value.time)}, <Icon name='star' /> {oneNews.value.score}</div>
                                </Item.Extra>
                        </Item.Content>
                    </Item>
                ))
            }
        </Item.Group>
    );
}

const mapStateToProps = (state) => {
    return {
        news: state.news.newsData,
    }
};

export default connect(mapStateToProps, { getNews })(NewsPanel);
