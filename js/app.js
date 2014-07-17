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
var Backbone = require('backbone');

var Editor = require('./components/Editor/Editor.react');
var Renderer = require('./components/Renderer/Renderer.react');

Backbone.$ = $;
/*
React.renderComponent(
  <TodoApp />,
  document.getElementById('todoapp')
);

*/
var Router = Backbone.Router.extend({
  routes: {
    "editor"               :  "editor",
    "editor/:id"           :  "editor",
    "renderer"             :  "renderer",
    '*path'                :  'editor'    
  },
  editor : function(id){
    console.log("shir")
    React.renderComponent(
      <Editor />,
      document.getElementById('editor')
    );
  },
  renderer : function(){
    React.renderComponent(
      <Renderer />,
      document.getElementById('renderer')
    );
  }
});
var approuter = new Router();
Backbone.history.start({pushState: true,  hashChange: false});
