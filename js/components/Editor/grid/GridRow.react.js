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


var GridRow = React.createClass({

  render: function() {
    var style = {
      height: 100 / this.props.rowCount + "%"
    }
    return (
      <div className={"grid-row"} style={style}>{this.props.items}</div>
    );
  },

  highlightItems: function (start, end) {
    for (var i = start; i <= end; ++i) {
      this.props.items[i].highlight();
    }
  },

  highlightItemsReverse: function (start, end) {
    for (var i = start; i >= end; --i) {
      this.props.items[i].highlight();
    }
  }

});

module.exports = GridRow;
