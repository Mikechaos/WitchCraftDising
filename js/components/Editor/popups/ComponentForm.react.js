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
var ComponentStore = require('../../../stores/ComponentStore.js');
var ModalActions = require('../../../actions/ModalActions');

var GridStore = require("../../../stores/GridStore");


var ComponentSelection = React.createClass({
    componentDidMount: function() {

    },
    componentWillUnmount: function() {
      
    },

    addItem: function(e) {
        var rect = GridStore.get('rect');
        e.preventDefault();
        var data = {
            url :  this.refs.link.getDOMNode().value.trim(),
            src :  this.refs.img.getDOMNode().value.trim(),
            title :  this.refs.title.getDOMNode().value.trim(),
            type: this.props.type,
            desc :  this.refs.descrition.getDOMNode().value.trim(),
            positions: rect.positions,
            sizes: rect.sizes
        };
        ComponentStore.addItem(data);
        ModalActions.destroy();

    },
    render: function() {
        var classSet = "formSelection "+" "+this.props.type+" "+this.props.showForm;
        return (
            <form className={classSet} method="post" onSubmit={this.addItem}>
                <h2>Insert your component</h2>
                <label className="el_link">Link</label>
                <input type="text" ref="link" className="el_link" />

                <label className="el_img">Image</label>
                <input type="text" ref="img" className="el_img" />

                <label className="el_title">Title</label>
                <input type="text" ref="title" className="el_title" />

                <label className="el_description">Description</label>
                <input type="text" ref="descrition" className="el_description" />
                <div className="modal-tools">
                    <button type="submit"  className="btn">Insert</button>
                </div>
            </form>
        );
    }
});


module.exports = ComponentSelection;