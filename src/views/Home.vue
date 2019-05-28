<template>
  <div class="home">
    <div class="card-header"><h3>Bothrs' question list</h3></div>
     <div class="card-body">
        <form @submit.prevent="addTodo" class="form-group">
            <label for="newTodo">Item: </label>
            <input v-model="newTodo" class="form-control text-center" type="text" name="newTodo" id="newTodo" value=""/>
            <button class="btn btn-light col-3" type="submit" name="button">add</button>
        </form>
        <button class="btn btn-light col-3" type="button" name="alldone" @click="allDone"> all done</button>
        <ul class="list-inline">
            <li style="margin:5px 0px; text-align: left" class="list-inline-item col-5" v-bind:key="todo" v-for="todo in todos">
                <input style="margin-right:2px;" type="checkbox" v-model="todo.done" />
                <span :class="{done: todo.done}">{{todo.title}}
                </span>
                <button style="float:right" @click="removeTodo(todo)" type="button" class="btn btn-warning btn-sm">Remove</button>
            </li>
        </ul>
    </div>
    <div style="margin-top:5px">
    <button class="btn btn-danger" @click="logout">Logout</button></div>
    <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th v-for="(col, colIndex) in columns" :key="colIndex">
          {{ col }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="record in records" :key="record.id">
        <td v-for="(col, colIndex) in columns" :key="record.id + '-' + colIndex">
          {{ record.fields[col] }}
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import firebase from "firebase";
import VueFire from 'vuefire'
import {todosCollection} from "../main"
import axios from 'axios'

export default {
  name: "home",
  name2: 'VueAirtable', 
  props: ['columns'],
  data() {
    return {
       apiUrl: 'https://api.airtable.com/v0/',
       apiKey: 'keyjfC46QkXzDzQKD', 
       base: 'test', 
       records: [],
      newTodo: "",
      todos: [
        {title: "Nieuwe producten vs onderhoud", done: false}, 
        {title: "Machine learning al in gebruik?", done: false},
        {title: "Meest gebruikte talen/frameworks/...?", done: false},  
        {title: "Frontend/backend", done: false},  
        {title: "Combinatie studeren - werken", done: false}, 
        {title: "Toekomstbeeld", done: false}, 
      ]
    };
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    addTodo() {
      this.todos.push({
        title: this.newTodo,
        done: false
      });
      this.newTodo = "";
    },
    removeTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos.splice(todoIndex, 1);
    },
    allDone() {
      this.todos.forEach(element => {
        element.done = true;
      });
    }, 
    getData: function(){
      axios({
        url: this.apiUrl + this.base,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      }).then((res) => {
        this.records = res.data.records; 
      }); 
    }
  }
};
</script>

<style scoped>
  .done {
    text-decoration: line-through;
  }
</style>