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
var _ = require('underscore');
var Header = require('./Header.react');
var GridItem = require('./grid/GridItem.react');
var GridRow = require('./grid/GridRow.react');


var Editor = React.createClass({

  rowCount: 12,
  colCount: 12,

  getInitialState: function () {
    return {
      dragging: false,
      origin: {
        row: 0,
        col: 0
      }
    };
  },

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
      ++this.rowElems.num;
    }
  },

  addRow: function () {
    this.rowElems.items = this.buildRow();
    this.rows.push(<GridRow items={this.rowElems.items} />)
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
    var style = {
      "background-color": "white"
    }
    return (
        <div className="mainSection">
          <Header />
          <div id={"test"} style={style} onMouseDown={this.startDragging} onMouseUp={this.stopDragging}>{this.rows}</div>
        </div>
    );
  },

  startDragging: function () {
    this.state.dragging = true;
    this.state.origin = this.findActiveItem();
    this.startInterval();
  },

  startInterval: function () {
    var interval = setInterval(_.bind(function () {
      var active = this.findActiveItem();
      this.calculateRect(active);
      if (this.state.dragging === false) {
        clearInterval(interval);
      }
    }, this), 100)
  },

  findActiveItem: function () {
    var found = false;
    for (var i = 0; i < this.rows.length; ++i) {
      if (found !== false) { break; }
      for (var j = 0; j < this.colCount; ++j) {
        if (this.getItem(i, j).state.active) { found = {row: i, col: j}; break; }
      }
    }
    return found;
  },

  getItem: function (row, col) {
    return this.rows[row].props.items[col];
  },

  calculateRect: function (active) {
    if (this.state.origin.row > active.row) {
      for (var i = this.state.origin.row; i >= active.row; --i) {
        if (this.state.origin.col > active.col) {
          this.rows[i].highlightItemsReverse(this.state.origin.col, active.col);
        } else {
          this.rows[i].highlightItems(this.state.origin.col, active.col);
        }
      }
    } else {
      for (var i = this.state.origin.row; i <= active.row; ++i) {
        if (this.state.origin.col > active.col) {
          this.rows[i].highlightItemsReverse(this.state.origin.col, active.col);
        } else {
          this.rows[i].highlightItems(this.state.origin.col, active.col);
        }
      }
    }
   // this.getItem(active.row, active.col).toggleSelect();
  },

  stopDragging: function () {
    this.state.dragging = false;
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

module.exports = Editor;
