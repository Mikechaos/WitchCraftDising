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
var ComponentStore = require('../../stores/ComponentStore');

var Sidebar = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div id="sidebar">
        <img className="logo" src="images/ssense_logo.png" />
        <div className="tools-pages">
          <a href="#" onClick={this.createPage}><i className="fa fa-plus-square"></i> New pages</a>
          <div className="pages-listing">test</div>
        </div>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  createPage: function(events) {
    console.log("createPage")

  }
});

module.exports = Sidebar;
