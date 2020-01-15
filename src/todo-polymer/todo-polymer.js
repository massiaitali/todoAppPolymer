import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-toolbar/paper-toolbar.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-material/paper-material.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';

import axios from '@bundled-es-modules/axios/axios.js';

/**
 * @customElement
 * @polymer
 */
class TodoPolymer extends PolymerElement {

  static get properties() {
    return {
      todos: {
        type: Array,
        reflectToAttribute: true,
        notify:true,
        value:[]
      },
      taskInput: {
        type: String,
        value: ''
      },
      urlJsonServer: {
        type: String,
        value: 'http://localhost:3000/column-'
      },
      column: {
        type: String,
        value: ''
      }
    };
  }

  ready(){
    super.ready();
    this.getTasks();
  }

  postTask(){
    if(this.taskInput !== '') {
      this.addTask(this.taskInput);
      this.taskInput = '';
    } else {
      alert('put something in the task');
    }
  }

  removeTask(e){
    const target = e.model;
    this.deleteTask(target.get('item').id);
  }

  updateTaskInput(e){
    this.taskInput = e.target.value;
  }

  getTasks() {
    const self = this;
    axios.get(this.urlJsonServer+this.column)
        .then(function (response) {
          self.todos = response.data;
        });
  }

  addTask(task) {
    const self = this;
    axios.post(this.urlJsonServer+this.column, {task})
        .then(function () {
          self.getTasks();
        });
  }

  deleteTask(index) {
    const self = this;
    axios.delete(this.urlJsonServer+this.column+'/'+index)
        .then(function () {
          self.getTasks();
        });
  }

  static get template() {
    return html`
    <paper-material style="margin:auto; padding:15px">
      <div style="display: flex;justify-content: center">
          <h1>Todo App</h1>
      </div>
      <div style="display: flex;justify-content: space-between">
        <paper-input id="inputTask" on-input="updateTaskInput" label="Task" value="{{taskInput}}"></paper-input>
        <paper-button on-tap="postTask" style="border: 1px solid green;">Add</paper-button>
      </div>
      <div style="display: flex; flex-direction: column;margin-top: 10px;">
        <template is="dom-repeat" items="{{todos}}">
          <div style="border: 1px solid blue;padding: 10px;display: flex;justify-content: space-between;margin-bottom: 10px;">
            <div style="display: flex; align-items: center;">
              {{item.task}}
            </div>
            <paper-button on-tap="removeTask">REMOVE</paper-button>
           </div>
        </template>
      </div>
    </paper-material>
    `;
  }
}

window.customElements.define('todo-polymer', TodoPolymer);
