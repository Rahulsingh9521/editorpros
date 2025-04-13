<template>
    <div class="dropdown-menu" v-if="items.length">
        <button
            :class="{ 'is-selected': index == selectedIndex }"
            v-for="(item,index) in items"
            :key="index"
            @click="selecteItem(index)"
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
            require: true,
        },
    },
    data() {
        return {
            selectedIndex: 0,
        };
    },  
    watch: {
        items() {
            this.selectedIndex = 0;
        }
    },
    methods: {
        onkeydown({event}) {
            if(event.key === 'ArrowUp') {
                this.upHandler();
                return true;
            } else if(event.key === 'ArrowDown') {
                this.downHandler();
                return true;
            } else if(event.key === 'Enter') {
                this.enterHandler();
                return true;
            }

            return false;
        },
        upHandler() {
            this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length;
        },
        downHandler() {
            this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
        },
        enterHandler() {
            if(this.selectedIndex === 0 && this.items.length === 0) {
                console.log('No items available');
            }
            else{
                this.selecteItem(this.selectedIndex);
            }
        },

        selecteItem(index) {
            const item = this.items[index];
            if (item) {
                this.command(item);
            }
        },
    },
};
</script>

<style scoped>
.dropdown-menu {
    background: #fff;
    border: 1px solid gray;
    width: 150px;
    display: flex;
    flex-direction: column;
    overflow: auto;
    position: relative;
    padding: 0.5rem;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    box-shadow: 1px 2px 2px #000;

    button{
        border: none;
        background: #fff;
        align-items: center;
        display: flex;
        text-align: left;
        width: 100%;
        font-size: 12px;
        padding: 5px 10px;
        border-radius: 5px;

        &.is-selected{
            background-color: #f5f5f5;
            color: #000;
        }
        &:hover{
            background-color: #f5f5f5;
            color: #000;
        }
    }
}

</style>