<template>
    <div class="dropdown-menu" v-if="items.length">
        <button
          :class="{ 'is-selected': index == selectedIndex }"
          v-for="(item, index) in items"
          :key="index"
          @click="selectItem(index)"
        >
          {{ item.title }}
        </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
  
      command: {
        type: Function,
        required: true,
      },
    },
  
    data() {
      return {
        selectedIndex: 0,
      }
    },
  
    watch: {
      items() {
        // console.log(this.items.length, this.items);
        this.selectedIndex = 0
      },
    },
    mounted() {
        // console.log(this.props, this.command);
    },
  
    methods: {
      onKeyDown({ event }) {
        if (event.key === 'ArrowUp') {
          this.upHandler()
          return true
        }
  
        if (event.key === 'ArrowDown') {
          this.downHandler()
          return true
        }
  
        if (event.key === 'Enter') {
          this.enterHandler()
          return true
        }
  
        return false
      },
  
      upHandler() {
        this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
      },
  
      downHandler() {
        this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
      },

      enterHandler() {
        if(this.selectedIndex === 0 && this.items.length === 0) {
            console.log('No items to select');
        }
        else{
            this.selectItem(this.selectedIndex)
        }
      },
  
      selectItem(index) {
        const item = this.items[index]
  
        if (item) {
          this.command(item)
        }
      },
    },
  }
  </script>
  
  <style lang="scss">
  /* Dropdown menu */
  .dropdown-menu {
    background: yellow;
    border: 1px solid black;
    border-radius: 0.7rem;
    box-shadow: brown;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    overflow: auto;
    padding: 0.4rem;
    position: relative;
  
    button {
      align-items: center;
      background-color: transparent;
      display: flex;
      gap: 0.25rem;
      text-align: left;
      width: 100%;
  
      &:hover,
      &:hover.is-selected {
        background-color: green($color: #3ebc42);
      }
  
      &.is-selected {
        background-color: blue($color: #2567e3);
      }
    }
  }
  </style>