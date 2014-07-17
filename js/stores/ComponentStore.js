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
 * TodoStore
 */

var _ = require('underscore');
var Backbone = require('backbone');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var ComponentStore = new Backbone.Model();


module.exports = ComponentStore;


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
		size:{
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
		size:{
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
		size:{
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
		size:{
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
		size:{
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
		size:{
			width:4,
			height:10
		}
	}]
}
*/
