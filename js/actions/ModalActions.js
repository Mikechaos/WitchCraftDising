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
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');

var ModalActions = {

  /**
   * @param  {string} text
   */
  show : function(id) {
    AppDispatcher.trigger('showModal', id);
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.trigger('destroyModal');
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: function() {
    AppDispatcher.trigger('destroyModalCompleted');
  }

};

module.exports = ModalActions;
