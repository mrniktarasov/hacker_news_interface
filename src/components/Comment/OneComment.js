import React from "react";
import {useState} from 'react';
import { Comment } from "semantic-ui-react";
import {API_URL_ITEM} from "../../constants/Constants";
import { getDate, createSanitizedHTML } from '../../decoding';
import validateAPI from "../../validations";


function OneComment(props) {
    let {by, id, kids: kidsCodes, time, text} = props.value;
    let [areKidsShown, setKidsVisibility] = useState(false) ;
    let [kids, setKids] = useState([]);
    const handleClick = () => {
        if (kidsCodes.length) {
            if (!areKidsShown) {
                Promise.allSettled(
                    kidsCodes.map((code) => {
                        return fetch(`${API_URL_ITEM}${code}.json`)
                            .then((response) => response.json())
                            .then((response) => validateAPI(response));
                    })
                ).then((comments) => {
                    setKids([...comments]);
                    setKidsVisibility(true);
                })
            } else {
                setKidsVisibility(false);
            }
        }
    };

    return (
        <Comment key={id} size='medium'>
            <Comment.Content>
                <Comment.Author>{by}</Comment.Author>
                <Comment.Metadata>
                    <div>{getDate(time)}</div>
                </Comment.Metadata>
                <Comment.Text>{createSanitizedHTML(text)}</Comment.Text>
                <Comment.Actions>
                    <Comment.Action
                        onClick={handleClick}
                    >Replies: {kidsCodes.length}</Comment.Action>
                </Comment.Actions>
            </Comment.Content>
            {areKidsShown ? (
                <Comment.Group>
                    {kids.map((comment) => (<OneComment value={comment.value} key={comment.value.id}/>))}
                </Comment.Group>) : null}
        </Comment>
    );
}

export default OneComment;
