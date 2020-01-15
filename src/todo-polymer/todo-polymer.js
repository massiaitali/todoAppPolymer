import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-toolbar/paper-toolbar.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-material/paper-material.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';

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
      }
    };
  }

  postTask(){
    if(this.taskInput !== '') {
      this.push('todos', {task: this.taskInput});
      this.taskInput = '';
    } else {
      alert('put something in the task');
    }
  }

  removeTask(e){
    var target = e.model;
    var index = this.todos.indexOf(target.get('item'));
    this.splice('todos', index, 1);
  }

  updateTaskInput(e){
    this.taskInput = e.target.value;
  }

  static get template() {
    return html`
    <paper-material elevation="2" style="width:500px; margin:auto; padding:15px">
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
