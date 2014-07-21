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
var GridStore = require("./stores/GridStore")

Backbone.$ = $;
/*
React.renderComponent(
  <TodoApp />,
  document.getElementById('todoapp')
);

*/

var componentData = JSON.stringify({
    id:908239048,
    title:"shoes",
    items:[{
      type:"image_title",
      url:"www.ssense.com",
      title:"Heels",
      src:"https://res.cloudinary.com/ssenseweb/image/upload/v1405959698/visual/render_heels.jpg",
      positions:{
        top:1,
        left:2
      },
      sizes:{
        width:4,
        height:3
      }
    },
    /*
    {
      type:"image_title",
      url:"www.ssense.com",
      title:"Sandals",
      src:"https://res.cloudinary.com/ssenseweb/image/upload/v1405959698/visual/render_sandals.jpg",
      positions:{
        top:3,
        left:6
      },
      sizes:{
        width:4,
        height:2
      }
    },
    */
    {
      type:"text",
      url:"http://www.ssense.com",
      title:"The Sale\nNever Ends",
      desc:"Up To 70%",
      custom_css:"<style>.whatever{display:none;}</style>",
      positions:{
        top:4,
        left:1
      },
      sizes:{
        width:3,
        height:3
      }
    },
    {
      type:"image_title",
      url:"http://www.ssense.com",
      title:"Chloé",
      src:"https://res.cloudinary.com/ssenseweb/image/upload/v1405959698/visual/render_chloe.jpg",
      custom_css:"<style>.whatever{display:none;}</style>",
      positions:{
        top:4,
        left:4
      },
      sizes:{
        width:2,
        height:4
      }
    },
    {
      type:"image_title",
      url:"http://www.ssense.com",
      title:"Flats",
      src:"https://res.cloudinary.com/ssenseweb/image/upload/v1405959698/visual/render_flats.jpg",
      custom_css:"<style>.whatever{display:none;}</style>",
      positions:{
        top:5,
        left:7
      },
      sizes:{
        width:5,
        height:2
      }
    },
    {
      type:"image_title",
      url:"http://www.ssense.com",
      title:"Sneakers",
      src:"https://res.cloudinary.com/ssenseweb/image/upload/v1405959698/visual/render_sneakers.jpg",
      custom_css:"#432423423 {display:none;}</style>",
      positions:{
        top:8,
        left:1
      },
      sizes:{
        width:5,
        height:3
      }
    },
    {
      type:"text",
      url:"http://www.ssense.com",
      title:"New\nThis Week",
      desc:"View Now",
      custom_css:"<style>.whatever{display:none;}</style>",
      positions:{
        top:8,
        left:6
      },
      sizes:{
        width:3,
        height:3
      }
    },
    {
      type:"image_title",
      url:"http://www.ssense.com",
      title:"Versace",
      src:"https://res.cloudinary.com/ssenseweb/image/upload/v1405959698/visual/render_versace.jpg",
      custom_css:"<style>.whatever{display:none;}</style>",
      positions:{
        top:7,
        left:9
      },
      sizes:{
        width:2,
        height:5
      }
    }]
});


var components = localStorage.getItem("components");
if(!components) localStorage.setItem("components",componentData);




var Router = Backbone.Router.extend({
  routes: {
    "editor"               :  "editor",
    "editor/:id"           :  "editor",
    "renderer"             :  "renderer",
    '*path'                :  'editor'    
  },
  editor : function(id){
    this.editor = React.renderComponent(
      <Editor grid={ GridStore.get('grid') } />,
      document.getElementById('editor')
    );
  },
  renderer : function(){

    React.renderComponent(
      <Renderer />,
      document.getElementById('renderer')
    );
  },

  init: function () {  }
});
var approuter = new Router();
Backbone.history.start({pushState: true,  hashChange: false});

approuter.init();

module.exports = approuter;