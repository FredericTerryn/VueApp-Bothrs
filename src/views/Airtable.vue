<template>
  <div class="airtable">
    <ul>
      <li v-for="item in items" v-bind:key="item">
        <h3>{{ item['fields']['Item'] }}</h3>
        <p>{{ item['fields']['Description'] }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "airtable",
  data() {
    return {
      items: []
    };
  },
  mounted: function() {
    this.loadItems();
  },
  methods: {
    loadItems: function() {
      var self = this;
      var app_id = "appc0sRZRaryAOek9";
      var app_key = "keykVoSAxMcjkEDEb";
      this.items = [];
      axios
        .get(
          "https://api.airtable.com/v0/" + app_id + "/Menu?view=Grid%20view",
          {
            headers: { Authorization: "Bearer " + app_key }
          }
        )
        .then(function(response) {
          self.items = response.data.records;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style>
        ul{
              background:
                url(../assets/achtergrondBothrs2.svg) bottom center no-repeat,
                url(../assets/achtergrondBothrs.svg) no-repeat;

        }
        h1 {
            text-align: center; 
        }
        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }
        li {
            width: 200px;
            background: #e6e6e6;
            border-radius: 15px;
            padding: 15px;
            text-align: center;
            margin: 50px;
        }
    </style>