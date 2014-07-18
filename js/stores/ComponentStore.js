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

var _componentStore = new Backbone.Model({
		id:908239048,
		title:"shoes",
		items:[{
			type:"product",
			id:768930,
			positions:{
				top:4,
				left:0
			},
			sizes:{
				width:4,
				height:4
			}
		},
		{
			type:"image",
			url:"www.ssense.com",
			src:"https://static2.ssense.com/ssenseweb/image/upload/c_lpad,g_south,h_1086,w_724/c_scale,h_560/v808753779/42259M032001_1.jpg",
			positions:{
				top:4,
				left:9
			},
			sizes:{
				width:8,
				height:10
			}
		},
		{
			type:"image_title",
			url:"http://www.ssense.com",
			title:"We are the best TITLE",
			src:"https://static1.ssense.com/ssenseweb/image/upload/c_lpad,g_south,h_1086,w_724/c_scale,h_560/v1626112192/42266M004001_1.jpg",
			custom_css:"<style>.whatever{display:none;}</style>",
			positions:{
				top:8,
				left:3
			},
			sizes:{
				width:10,
				height:2
			}
		},
		{
			type:"image_text",
			url:"http://www.ssense.com",
			title:"We are the best TEXT yes",
			src:"https://static1.ssense.com/ssenseweb/image/upload/c_lpad,g_south,h_1086,w_724/c_scale,h_560/v1850731820/42092M032001_1.jpg",
			custom_css:"#432423423 {display:none;}</style>",
			positions:{
				top:2,
				left:5
			},
			sizes:{
				width:4,
				height:10
			}
		},
		{
			type:"image_text",
			url:"http://www.ssense.com",
			title:"We are the best TEXT",
			src:"https://static1.ssense.com/ssenseweb/image/upload/c_lpad,g_south,h_1086,w_724/c_scale,h_560/v580910961/42259M004002_1.jpg",
			custom_css:"<style>.whatever{display:none;}</style>",
			positions:{
				top:2,
				left:5
			},
			sizes:{
				width:4,
				height:10
			}
		},
		{
			type:"text",
			url:"http://www.ssense.com",
			title:"We are the best",
			desc:"this is a desc",
			custom_css:"<style>.whatever{display:none;}</style>",
			positions:{
				top:2,
				left:5
			},
			sizes:{
				width:4,
				height:10
			}
		}]
});
/**
 * Create a component item.
 * @param  {string} text The content of the component
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp in place of a real id.
  var id = Date.now();
  _componentStore.set(id, {
    id: id,
    complete: false,
    text: text
  });
}

/**
 * Update a component item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  var beforeUpdate = _.clone( _componentStore.get(id) );
  var updated = _.extend( beforeUpdate, updates);
  _componentStore.set(id, updated);
}

/**
 * Update all of the component items with the same object.
 *     the data to be updated.  Used to mark all components as completed.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.

 */
function updateAll(updates) {
  _.each(_componentStore.keys(), function(id){
    update(id, updates);
  });
}

/**
 * Delete a component item.
 * @param  {string} id
 */
function destroy(id) {
  _componentStore.unset(id);
}

/**
 * Delete all the completed component items.
 */
function destroyCompleted() {
  _.each(_componentStore.keys(), function(id){
    if (_componentStore.get(id).complete) {
      destroy(id);
    }
  });
}

var componentStore = _.extend(_componentStore, {

  /**
   * Tests whether all the remaining component items are marked as completed.
   * @return {booleam}
   */
  areAllComplete: function() {
    return _.every(_componentStore.keys(), function(id){
      return _componentStore.get(id).complete;
    });
  },

  /**
   * Get the entire collection of components.
   * @return {object}
   */
  getAll: function() {
    return _componentStore.toJSON().items;
  }
});

// Register to handle all updates
AppDispatcher.on('all', function(eventName, payload) {
  var text;

  switch(eventName) {
    case 'create':
      text = payload.text.trim();
      if (text !== '') {
        create(text);
      }
      break;

    case 'toggleCompleteAll':
      if (componentStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      break;

    case 'undoComplete':
      update(payload.id, {complete: false});
      break;

    case 'complete':
      update(payload.id, {complete: true});
      break;

    case 'updateText':
      text = payload.text.trim();
      if (text !== '') {
        update(payload.id, {text: text});
      }
      break;

    case 'destroy':
      destroy(payload.id);
      break;

    case 'destroyCompleted':
      destroyCompleted();
      break;

    default:
      return;
  }

});


module.exports = _componentStore;


/* example JSON 

var products = {
	id:908239048,
	title:"shoes",
	items:[{
		type:"product"
		id:768930,
		positions:{
			top:2,
			left:5
		}
		sizes:{
			width:4,
			height:10
		}
	},
	{
		type:"image"
		url:"http://www.ssense.com",
		src:"http://www.ssense.com/images/whatever.png",
		positions:{
			top:2,
			left:5
		}
		sizes:{
			width:4,
			height:10
		}
	},
	{
		type:"image_title"
		url:"http://www.ssense.com",
		title:"We are the best",
		src:"http://www.ssense.com/images/whatever.png",
		custom_css:"<style>.whatever{display:none;}</style>",
		positions:{
			top:2,
			left:5
		}
		sizes:{
			width:4,
			height:10
		}
	},
	{
		type:"image_text"
		url:"http://www.ssense.com",
		title:"We are the best",
		src:"http://www.ssense.com/images/whatever.png",
		custom_css:"#432423423 {display:none;}</style>",
		positions:{
			top:2,
			left:5
		}
		sizes:{
			width:4,
			height:10
		}
	},
	{
		type:"image_text"
		url:"http://www.ssense.com",
		title:"We are the best",
		src:"http://www.ssense.com/images/whatever.png",
		custom_css:"<style>.whatever{display:none;}</style>",
		positions:{
			top:2,
			left:5
		}
		sizes:{
			width:4,
			height:10
		}
	}
	{
		type:"text"
		url:"http://www.ssense.com",
		title:"We are the best",
		desc:"this is a desc",
		custom_css:"<style>.whatever{display:none;}</style>",
		positions:{
			top:2,
			left:5
		}
		sizes:{
			width:4,
			height:10
		}
	}]
}
*/
