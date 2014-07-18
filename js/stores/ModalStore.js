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

var _modalStore = new Backbone.Model({});
/**
 * Create a component item.
 * @param  {string} text The content of the component
 */
function showModal(id) {
  _modalStore.set("activeModal", {
    id: id
  });
}
/**
 * Delete a component item.
 * @param  {string} id
 */
function destroy() {
  _modalStore.set("activeModal", false);
}

// Register to handle all updates
AppDispatcher.on('all', function(eventName, payload) {
  switch(eventName) {
    case 'showModal':
        showModal(payload.id);
    break;

    case 'destroyModal':
      destroy();
      break;
    default:
      return;
  }

});


module.exports = _modalStore;