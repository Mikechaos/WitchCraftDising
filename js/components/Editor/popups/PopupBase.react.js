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


var Modal = React.createClass({
    componentDidMount: function() {

    },
    show : function(){
        // Initialize the modal, once we have the DOM node
        var $el = $(this.getDOMNode());
        $el.find(".modal-dialog").animate({
            opacity:0.7
        },200);
        $el.find(".modal-content").animate({
            opacity:1
        },200);
    },
    componentWillUnmount: function() {
        //$(this.getDOMNode()).off('hidden');
    },
    // This was the key fix --- stop events from bubbling
    handleClick: function(e) {
        e.stopPropagation();
    },
    hide: function(e) {
        e.stopPropagation();
    },
    render: function() {
        var Body = this.props.body;
        return (
            <div  className="modal fade" role="dialog" aria-hidden="true">
                <div onClick={this.hide} className="modal-dialog"></div>
                <div className="modal-content">
                    <Body />
                </div>
                
            </div>
        );
    }
});



module.exports = Modal;