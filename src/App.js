import 'semantic-ui-css/semantic.min.css';
import './App.css';
import React from 'react'
import {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { getNews } from "./actions";
import News from './components/News/News';
import Post from './components/Post/Post';


function App(props) {
    let { news, getNews} = props;
    if(news.length === 0) {
        getNews();
    }
    useEffect(() => {
        getNews();
        setInterval(() => getNews(), 60000);
    }, [getNews]);
    return (
        <Router>
            <Switch>
                {news.map((item) => (
                    <Route path={`/post/${item.value.id}`} key={item.value.id}>
                        <Post value={item.value}/>
                    </Route>
                ))}
                <Route path='/'>
                    <News />
                </Route>
            </Switch>
        </Router>
    );
}

const mapStateToProps = (state) => {
      return {
        news: state.news.newsData,
      }
};

export default connect(mapStateToProps, { getNews })(App);



