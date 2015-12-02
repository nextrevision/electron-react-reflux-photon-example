import Reflux from 'reflux';
import EntryActions from '../actions/entries';
import StateMixin from '../stores/state.mixin';

var EntryStore = Reflux.createStore({
  listenables: [EntryActions],
  mixins: [StateMixin],
  getDefaultState: function() {
    return {
      entries: this.updateEntries(),
    }
  },
  updateEntries: function() {
    this.setState({
      entries: [
          {uuid: "1-2-3-4-5", name: "item1", text: "item1 text"},
          {uuid: "6-7-8-9-0", name: "item2", text: "item2 text"}
        ]
    });
    return this.state.entries;
  }
});

module.exports = EntryStore;
