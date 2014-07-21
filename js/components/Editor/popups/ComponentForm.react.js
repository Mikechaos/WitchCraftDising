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

var ComponentSelection = React.createClass({
    componentDidMount: function() {

    },
    componentWillUnmount: function() {
      
    },
    // This was the key fix --- stop events from bubbling
    handleClick: function(e) {
        e.stopPropagation();
    },
    render: function() {
        return (
            <div className="modalSelection" role="dialog" aria-hidden="true">
                <h2>Select your marketing weapon of choice</h2>
                
            </div>
        );
    }
});


module.exports = ComponentSelection;