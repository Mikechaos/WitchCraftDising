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
var GridItem = require('./GridItem.react.js');
var GridRow = require('./GridRow.react.js');


var Header = React.createClass({

  rowCount: 12,
  colCount: 12,

  initGrid: function () {
    this.rowElems = {
      num: 0,
      items: []
    };
    this.rows = [];
    this.buildGrid();
  },

  buildGrid: function () {
    for (var i = 0; i < this.rowCount; ++i) {
      this.addRow();
    }
  },

  addRow: function () {
    this.rowElems.items.push(this.buildRow());

    this.rows.push(<GridRow items={this.rowElems.items} />)

    this.rowElems.items = [];
  },

  buildRow: function (row, col) {
    row = row || [];
    col = col || 0;

    if (col === this.colCount) { return row; }

    row.push(<GridItem row={this.rowElems.num} col={col} />);

    return this.buildRow(row, col + 1);
  },

  render: function() {
    this.initGrid();
    debugger;
    return (
        <div>{this.rows}</div>
    );
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    TodoActions.create(text);
  }

});

module.exports = Header;
