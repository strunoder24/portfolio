<template>
	<div class="checkbox-group-container" :class="{'checkbox-group-container-with-border': options.has_borders}">
		<div class="blocked-input" v-if="isBlocked"></div>
		<div class="checkbox-group-label" v-if="this.options.hasTitle" v-html="options.label"></div>
		<div class="checkbox-item" v-for="(item, index) in flag" :key="index">
			<input  type="checkbox"
					class="radio"
					:class="{'radio-disabled': isBlocked}"
					:id="item.label"
					:checked="item.value">
			<label  :for="item.label"
					class="checkbox forms-checkbox icon-ok"
					@click="checkItem(item.label)">
			</label>
			<label
					:for="item.label"
					class="checkbox-label checkbox-label-filter"
					@click="checkItem(item.label)"
				>{{item.label }}
			</label>
		</div>
	</div>
</template>

<script>

    import vue from 'vue'

    export default {
        props: {
            options: {
                type: Object,
                required: true
            },
            passedData: Array,
            isBlocked: Boolean
        },

        data() {
            return {
                flag: this.passedData
            }
        },

        mounted() {
            this.passValueBack();
        },

        methods: {
            checkItem(label) {
                this.flag.filter((item, i) => {
                    if (item.label === label) {
                        vue.set(this.flag[i], 'value', !this.flag[i].value);
                    }
                });

                this.passValueBack();
            },

            passValueBack() {
                for (let i = 0; i < this.flag.length; i++) {
                    this.$emit('callback', {
                        columnName: this.flag[i].columnName,
                        [this.flag[i].columnName]: this.flag[i].value
                    })
                }
            }
        }
    }
</script>