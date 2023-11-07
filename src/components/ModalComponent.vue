<template>
    <div class="modal-container d-flex ">
        <!-- Modal -->
        <div class="modal fade show d-block" id="staticBackdrop" 
            aria-labelledby="staticBackdropLabel">
            <div class="modal-dialog">
                <div class="modal-content">
                    
                    <div class="modal-header">
                        <slot name="header"></slot>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal()"></button>
                    </div>
                    
                    <div class="modal-body w-100 ">
                        <slot name="body"></slot>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script>

export default {

    data(){
        return {

        }
    },

    methods : {
        closeModal()
        {
            this.$emit('closeModal');
        }
    },
    
    emits : ['closeModal'],

}


</script>