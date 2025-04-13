<template>
    <button calss="dropdown">
        <div class="bi dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Aa
        </div>
        <ul class="dropdown-menu">
            <li class="item-property dropdown-item"><i class="bi bi-alphabet-uppercase"></i><span class="text">Uppercase</span></li>
            <li class="item-property dropdown-item"><i class="bi bi-alphabet"></i><span class="text">Lowercase</span></li>
            <li class="item-property dropdown-item"><div class="">Tt</div><span class="text">Capitalize</span></li>
            <li class="item-property dropdown-item"><i class="bi bi-subscript"></i><span class="text">Subscript</span></li>
            <li class="item-property dropdown-item"><i class="bi bi-superscript"></i><span class="text">Superscript</span></li>
            <li class="item-property dropdown-item"><i class="bi bi-highlighter"></i><span class="text">highlight</span></li>
        </ul>
    </button>
</template>

<script>
export default {
    props: {
        editor: {
            type: Object,
            required: true,
        },
    },
    methods: {
        makeUpperCase() {
            // const selection = this.editor.view.state.selection;

        }
    },
};
</script>

<style scoped>
.text-property{
    display: flex;

    .text{
        width: 100%;
        text-align: center;
        margin-left: 5px;
        font-size: 13px;
        font-family: revert;
        font-weight: bold;
    }
}
</style>