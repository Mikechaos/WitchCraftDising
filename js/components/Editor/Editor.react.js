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

var AppDispatcher = require("../../dispatcher/AppDispatcher");

var Header = require('./Header.react');
var Sidebar = require('./Sidebar.react');

var GridAction = require("../../actions/GridAction");
var GridItem = require('./grid/GridItem.react');
var GridRow = require('./grid/GridRow.react');
var GridStore = require("../../stores/GridStore");
var GridView = require('./grid/GridView.react');

var Modal = require('./popups/PopupBase.react');
var ModalActions = require('../../actions/ModalActions.js');
var ModalPublish = require('./popups/Publish.react');
var ModalSelection = require('./popups/ComponentSelection.react');

var Renderer = require('../Renderer/Renderer.react');


var modals = {
    showPublish: false,
};


var Editor = React.createClass({

  rowCount: 12,
  colCount: 12,

  getInitialState: function () {
    return {
      dragging: false,
      origin: {
        row: 0,
        col: 0
      },
      width: 0,
      rect: {}
    };
  },

  componentWillMount: function () {
    this.state.size = $('#editor').width() / GridStore.get('cols');
    GridStore.on('change:grid', _.bind(function (model, grid) {
      this.setProps({grid: grid});
    }, this));

    GridStore.on('change:rect', _.bind(function (model, rect) {
      console.log('rect in on change', rect);
      this.setState({rect: rect});
      this.forceUpdate();
    }, this));

    this.initGrid();
  },

  initGrid: function () {
    this.rowCount = GridStore.get('rows');
    this.colCount = GridStore.get('cols');
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
    this.rows.push(<GridRow items={this.rowElems.items} key={"gridRow" + this.rowElems.num} rowCount={this.rowCount} />)
  },

  buildRow: function (row, col) {
    row = row || [];
    col = col || 0;

    if (col === this.colCount) { return row; }

    if (this.props.grid.length === 0) { var state = false; }
    else { var state = this.props.grid[this.rowElems.num][col]; }

    row.push(<GridItem row={this.rowElems.num} col={col} key={"gridItem" + this.rowElems.num + "_" + col} highlight={state} colCount={this.colCount} />);

    return this.buildRow(row, col + 1);
  },

  mapGrid: function () {
    if (this.props.grid.length === 0) { return false; }
    for (var i = 0; i < GridStore.get('rows'); ++i) {
      for (var j = 0; j < GridStore.get('cols'); ++j) {
        var state = this.props.grid[i][j]
        this.rows[i].props.items[j].setState({highlight: state});
      }
    }
  },

  render: function() {
    this.mapGrid();
    var style = {
      "background-color": "white",
      width: this.state.size * GridStore.get('cols'),
      height: this.state.size * GridStore.get('rows'),
      "min-width": "600px",
      position: "relative"
    }

    return (
        <div className="mainSection">
          <Sidebar />
          <div className="editor">
            <Header />
            <div id={"editor-view"} style={style} onMouseDown={this.startDragging} onMouseUp={this.stopDragging}>
              <Renderer />
              <GridView rows={this.rows} grid={this.props.grid} />
            </div>
            <Modal body={ModalSelection} id="ModalSelection" rect={this.state.rect} />
          </div>
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
      if (this.state.dragging === false) {
        return clearInterval(interval);
      }
      var target = this.findActiveItem();
      GridAction.triggerRect({
        origin: this.state.origin,
        target: target
      });
      //this.calculateRect(active);
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

  stopDragging: function () {
    this.state.dragging = false;
  }

});

module.exports = Editor;
