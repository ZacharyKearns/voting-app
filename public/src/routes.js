import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import PollsIndex from './pages/PollsIndex';
import NewPoll from './pages/NewPoll';
import MyPolls from './pages/MyPolls';
import PollsShow from './pages/PollsShow';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PollsIndex} />
    <Route path="/newpoll" component={NewPoll} />
    <Route path="polls/:id" component={PollsShow} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
  </Route>
);
