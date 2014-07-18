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
var ModalStore = require('../../../stores/ModalStore');
var ModalActions = require('../../../actions/ModalActions');

var Modal = React.createClass({
    componentDidMount: function() {
        ModalStore.on('change:activeModal', this.handleActions);
    },
    handleActions : function(ModalStore, activeModal){
        if(activeModal.id){
            this.show(activeModal.id);
        }else{
            this.destroy();
        }
    },
    show : function(id){
        var $el =$("#"+id);
        console.log(id)
        $el.find(".modal-dialog").css("display","block").animate({
            opacity:0.7
        },200);
        $el.find(".modal-content").css("display","block").animate({
            opacity:1
        },200);
    },
    componentWillUnmount: function() {
        //$(this.getDOMNode()).off('hidden');
    },
    hide: function(e) {
        e.preventDefault();
        ModalActions.destroy();
    },
    destroy : function(){
        $(".modal-dialog:visible").animate({
            opacity:0.7
        },300, function(){
            $(this).css({
                opacity:0,
                display:"none"
            });
        });
        $(".modal-content:visible").css("display","block").animate({
            opacity:1
        },300, function(){
            $(this).css({
                opacity:0,
                display:"none"
            });
        });
    },
    render: function() {
        var Body = this.props.body;
        return (
            <div  className="modal fade" id={this.props.id} role="dialog" aria-hidden="true">
                <div onClick={this.hide} className="modal-dialog"></div>
                <div className="modal-content">
                    <Body />
                </div>
                
            </div>
        );
    }
});



module.exports = Modal;