import React from 'react'
import {Button} from 'semantic-ui-react';
import styles from './NewsHeader.module.css'
import { useHistory } from 'react-router-dom';

function NewsHeader(props) {
    const {getData, goBack} = props;
    let history = useHistory();
    return (
        <div className={styles.newsHeader}>
            <Button icon='arrow left'
                    size='huge'
            disabled={!goBack}
            onClick={goBack ? () => history.goBack() : null}/>
            <Button icon='retweet'
                    size='huge'
                    onClick={getData}/>
        </div>
    );
}

export default NewsHeader;