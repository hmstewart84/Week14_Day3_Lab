var React = require('react');

var FilterChoice = React.createClass({
  getInitialState: function() {
    return({selectedIndex: 0});
  },

  valuesChanged: function(newValues) {
    if (!this.props.values || !newValues || (newValues.length !== this.props.values.length)) {
      return true;
    }
    for(var i = 0; i < newValues.length; i++) {
      if(newValues[i] !== this.props.values[i]) return true;
    }
    return false;
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.valuesChanged(nextProps.values)) {
      this.setState({selectedIndex: 0});
      this.props.handleChange(0);
    }
  },

  handleChange: function(event) {
    event.preventDefault();
    var newIndex = event.target.value;
    this.setState({selectedIndex: newIndex});
    this.props.handleChange(newIndex);
  },

  render: function() {
    console.log("Rendering FilterChoice...");
    if (!this.props.values || this.props.values.length === 0) {
      return(
        <div className="filter-choice">
          <select id="filter-choice">
            <option>No filter selected</option>
          </select>
        </div>
      )
    }

    var options = this.props.values.map(function(filterValue, index){
      return <option value={index} key={index}>{filterValue}</option>
    });
    return(
      <div className="filter-choice">
        <select id="filter-choice" value={this.state.selectedIndex} onChange={this.handleChange}>
          {options}
        </select>
      </div>
    )
  }
})

module.exports = FilterChoice;
