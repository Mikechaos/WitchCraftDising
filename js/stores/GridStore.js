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
 * componentStore
 */

var _ = require('underscore');
var Backbone = require('backbone');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var GridStore = new Backbone.Model({
  grid: []
});

GridComponent = {

  createRect: function (origin, target) {
    this.composePoints(origin, target);

    this.calculateRect();
  },

  composePoints: function (origin, target) {
    var newOrigin = {}, newTarget = {};

    newOrigin.row = origin.row < target.row ? origin.row : target.row;
    newOrigin.col = origin.col < target.col ? origin.col : target.col;
    newTarget.row = target.row > target.row ? origin.row : target.row;
    newTarget.col = target.col > target.col ? origin.col : target.col;

    this.origin = newOrigin;
    this.target = newTarget;
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
    this.rows.push(0);
  },

  buildRow: function (row, col) {
    row = row || [];
    col = col || 0;

    if (col === this.colCount) { return row; }

    row.push(0);

    return this.buildRow(row, col + 1);
  },


  calculateRect: function (active) {
    var grid = [];
    for (var i = 0; i < 12; ++i) {
      var row = [];
      for (var j = 0; j < 12; ++j) {
        var state = this.isIncludedInRect(i, j);
        row.push(state)
        if (state) { console.log(i, j); }
      }
      grid.push(row);
    }

    GridStore.set('grid', grid);
  },

  isIncludedInRect: function (row, col) {
    return row >= this.origin.row && col >= this.origin.col &&
           row <= this.target.row && col <= this.target.col;
  },

  hide:function(){
    
  }

};

// Register to handle all updates
AppDispatcher.on('all', function(eventName, payload) {
  var text;

  switch(eventName) {
    case 'createRect':
      GridComponent.createRect(payload.origin, payload.target);
      break;
  }

});


module.exports = GridStore;