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
var ENTER_KEY_CODE = 13;

var Header = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
  	return (
      <header id="header">
        <h1>WitchcraftDising Visual Page Maker</h1>
        <div className="tools">
          <input
            onBlur={this._saveTitle}
            onKeyDown={this._onKeyDown}
            id="pageTite"
            placeholder="New page: Page title"
            onSave={this._onSave}
          />
          <div className="right-tools">
            <a href="#" className="btn nobg" onClick={this._hideGrid}><i className="fa fa-th"></i>Hide grid</a>
            <a href="#" className="btn" onClick={this._save}><i className="fa fa-floppy-o"></i>Save / preview</a>
            <a href="#" className="btn" onClick={this._publish}><i className="fa fa-cloud-upload"></i> Publish</a>
          </div>
        </div>
      </header>
  	);
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _saveTitle: function(events) {
    console.log("shiat")
    //this.setState();
  },

  _hideGrid: function(){

  },
  _save : function () {
    
  },
  _publish : function () {
    
  },


  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._saveTitle();
    }
  }
});

module.exports = Header;
