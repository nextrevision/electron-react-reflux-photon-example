import React from 'react';
import Reflux from 'reflux';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';

import Header from './js/components/header';
import Sidebar from './js/components/sidebar';
import Footer from './js/components/footer';

import EntryActions from './js/actions/entries';
import EntryStore from './js/stores/entries';

var App = React.createClass({
  mixins: [Reflux.connect(EntryStore)],
  render: function() {
    const { content } = this.props

    return (
      <div className="window">
        <Header />
        <div className="window-content">
          <div className="pane-group">
            <div className="pane pane-sm sidebar">
              <Sidebar entries={this.state.entries} />
            </div>
            <div className="content-pane pane padded-more">
              { content || <Home />}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
});

var Home = React.createClass({
  render: function() {
    return (
      <div>Home</div>
    );
  }
});

var Content = React.createClass({
  mixins: [Reflux.connect(EntryStore)],
  render: function() {
    var entries = this.state.entries;
    var uuid = this.props.routeParams.uuid;

    var details = <div>Cannot find details for {uuid}.</div>;
    if (entries && entries.length > 0) {
      var details = entries.map(function(entry) {
        if (entry.uuid == uuid) {
          return (
            <div key={entry.uuid}>
              <h1>{entry.name}</h1>
              <p>{entry.text}</p>
            </div>
          );
        }
      });
    }
    return (
      <div className="content-wrapper">{details}</div>
    );
  }
});

render((
  <Router >
    <Route path="/" component={App}>
      <Route path="entry/:uuid" components={{ content: Content }} />
    </Route>
  </Router>
), document.getElementById("main"));
