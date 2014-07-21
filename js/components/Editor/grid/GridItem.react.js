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

var React = require('react');
var Modal = require('../popups/PopupBase.react');
var ModalSelection = require('../popups/ComponentSelection.react');
var ModalActions = require('../../../actions/ModalActions.js');

var GridItem = React.createClass({

  propTypes: {},

  getInitialState: function () {
    return { 
      highlighted: false,
      active: false
    };
  },

  render: function() {
    borderStyle = {
      border: "solid grey 1px",
      width: 100 / 12 + "vw",
      height: "100%",
      display: "inline-block",
      "float": "left",
      "box-sizing": "border-box"
    };

    if (this.state.highlight) {
      borderStyle.border = "solid pink 1px";
    }

    return (
      <div onClick={this.showSelection} style={borderStyle} onMouseEnter={this.setActive} onMouseLeave={this.setInactive}></div>
    );
  },

  setActive: function () {
    this.state.active = true;
    console.log(this.props, this.state);
  },

  setInactive: function () {
    this.state.active = false;
    console.log(this.props, this.state);
  },

  toggleSelect: function () {
    this.state.highlighted = !this.state.highlighted;
    this.forceUpdate();
  },

  highlight: function () {
    this.state.highlighted = true;
    this.forceUpdate();
  },

  showSelection : function(e){
    if(this.state.active){
      e.preventDefault();
      e.stopPropagation();
      ModalActions.show({id:"ModalSelection"});      
    }
  }


});

module.exports = GridItem;
