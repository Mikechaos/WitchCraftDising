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
var componentArray = [];
componentArray.image_title = require('./ComponentImageTitle');
componentArray.product = require('./ComponentProduct');
componentArray.image_text = require('./ComponentImageText');
componentArray.text = require('./ComponentText');
componentArray.image = require('./ComponentImage');



var BaseComponent = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    var component = this.props.component;
    var positionsClasses = "visual_component top"+component.positions.top+" left"+component.positions.left+" width"+component.sizes.width+" height"+component.sizes.height+" "+component.type;
    var Node = componentArray[component.type];

    return (
      <div className={positionsClasses}>
        <Node component={component} />
      </div>
    );
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
  }

});

module.exports = BaseComponent;
