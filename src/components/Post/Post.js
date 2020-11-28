import React, { useEffect } from "react";
import {Grid, Comment, Item, Header, Loader} from "semantic-ui-react";
import NewsHeader from "../Header/NewsHeader";
import OneComment from "../Comment/OneComment";
import { getComments } from '../../actions';
import {connect} from "react-redux";
import { getDate } from "../../decoding";


function Post(props) {
    debugger;
    const {url, title, time, by, kids, descendants} = props.value;
    let { getComments } = props;
    const {comments, loading} = props.comments;
    const handleClick = () => {
        getComments(kids);
    };

    useEffect(() => {
        getComments(kids);
        let polling = setInterval(() => getComments(kids), 60000);
        return function cleanUp() {
            clearInterval(polling);
        }
    }, [kids, getComments]);

    return (
        <Grid divided='vertically' centered>
            <Grid.Column width={10}>
                <Grid.Row key='header'>
                    <NewsHeader getData={handleClick} goBack={true}/>
                </Grid.Row>
                <Grid.Row>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Item.Header as='h1'>{title}</Item.Header>
                                <Item.Meta>by {by}</Item.Meta>
                                <Item.Description as='a' href={url}>{url}</Item.Description>
                                <Item.Extra>{getDate(time)}, comments: {descendants}.</Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Row>
                <Grid.Row height={2}>
                    <Header as='h3' dividing>Comments</Header>
                </Grid.Row>
                <Loader active={loading} inline='centered' />
                {kids.length ? (
                    <Grid.Row>
                            <Comment.Group>
                                {comments.map((comment) => (
                                    <OneComment
                                        value={comment.value}
                                        key={comment.value.id}
                                    />
                                ))}
                            </Comment.Group>
                    </Grid.Row>
                ): null}
            </Grid.Column>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments,
    }
};

export default connect(mapStateToProps, { getComments })(Post);
