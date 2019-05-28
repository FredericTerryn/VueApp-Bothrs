<template>
  <div class="sign-up">
    <p>Let's create a new account !</p>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="signUp">Sign Up</button>
    <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

 <script>
 import firebase from 'firebase';
  export default {
    name: 'signUp',
    data() {
      return {
          email: '', 
          password:''
      }
    },
    methods: {
        signUp: function() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then( (user) => {
                this.$router.replace('airtable')
            }, 
            function(err){
                alert('oops, ' + err.message)
            }); 
        }
    }
  }
</script>

 <style scoped>
  .sign-up {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
 button {
  margin-top: 20px;
  background-color: #008CBA;;
  color: white;
  cursor: pointer;
  border: #008CBA;
  width: 10%;
  padding: 2px 0px;
  border-radius: 4px
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>