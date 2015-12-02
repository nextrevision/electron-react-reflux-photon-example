import Update from 'react-addons-update';

var StateMixin = {
  init: function() {
    this.state = this.getDefaultState();
  },
  getInitialState: function() {
    return this.state;
  },
  setState: function(state) {
    if (this.state) {
      this.state = Update(this.state, {$merge: state});
    } else {
      this.state = state;
    }
    this.trigger(state);
  }
}

module.exports = StateMixin;
