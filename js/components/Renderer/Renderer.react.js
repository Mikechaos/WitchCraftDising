/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @jsx React.DOM
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var BaseComponent = require('./BaseComponent.react');
var ComponentStore = require('../../stores/ComponentStore');
var React = require('react');

function getComponents() {
  return {
    allComponents: ComponentStore.getAll()
  };
}

var TodoApp = React.createClass({

  getInitialState: function() {
    return getComponents();
  },

  componentDidMount: function() {
    ComponentStore.on('change', this._onChange);
  },

  componentWillUnmount: function() {
    ComponentStore.off('change', this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    var components = [];
    for (var key in this.state.allComponents) {
      components.push(<BaseComponent key={key} component={this.state.allComponents[key]} />);
    }

  	return (
      <div className="visual_components"> 
        {components}
      </div>
  	);
  },



  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getComponents());
  }

});

module.exports = TodoApp;
