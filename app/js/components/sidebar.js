import React from 'react';
import { Link } from 'react-router';

var Sidebar = React.createClass({
  render: function() {
    const { entries } = this.props

    var entryList = <div className="padded-more">No Entries</div>;
    if (entries && entries.length > 0) {
      var entryList = entries.map(function(entry) {
        return (
          <Link to={`/entry/${entry.uuid}`} key={entry.uuid}>
            <li className="list-group-item">
              <div className="media-body">
                <strong>{entry.name}</strong>
                <p>{entry.text}</p>
              </div>
            </li>
          </Link>
        );
      }.bind(this));
    }
    return (
      <ul className="list-group">
        <li className="list-group-header">
          <input className="form-control" type="text" placeholder="Search for an entry" />
        </li>
        {entryList}
      </ul>
    );
  }
});

module.exports = Sidebar
