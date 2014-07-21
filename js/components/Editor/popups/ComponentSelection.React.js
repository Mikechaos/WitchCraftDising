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
var Form = require('./ComponentForm.react.js');

var ComponentSelection = React.createClass({

    getInitialState: function () {
        return {
          showForm: "hidden",
          showSelection: "visible",
          type : ""
        };
    },
    componentDidMount: function() {

    },
    componentWillUnmount: function() {
      
    },
    // This was the key fix --- stop events from bubbling
    showForm: function(type, e) {
        e.preventDefault();
        this.setState({
            showForm: "visible",
            showSelection: "hidden",
            type:type
        });
    },
    render: function() {
        var classSet = "modalSelection " + this.state.showSelection;
        return (
            <div  role="dialog" aria-hidden="true">
                <div className={classSet}>
                    <h2>Select your marketing weapon of choice</h2>
                    <div class="selection">
                        <a onClick={this.showForm.bind(this,"image")} href="#">
                            <img src="images/sales.png" />
                            <span>Image</span>
                        </a>
                        <a onClick={this.showForm.bind(this,"categories")} href="#">
                            <img src="images/categories.png" />
                            <span>Categories</span>
                        </a>
                        <a onClick={this.showForm.bind(this,"products")} href="#">
                            <img src="images/products.png" />
                            <span>Products</span>
                        </a>
                        <a onClick={this.showForm.bind(this,"text")} href="#">
                            <img src="images/text.png" />
                            <span>text</span>
                        </a>
                    </div>
                </div>
                <Form type={this.state.type} showForm={this.state.showForm} />
            </div>
        );
    }
});


module.exports = ComponentSelection;
