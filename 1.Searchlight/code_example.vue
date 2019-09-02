/*
	Это компонент отрисовывающий дашборд.
	-------------------------------------
	this is component used to render dashboard.
*/

<template>
	<div>
		<div class="main" :class="{'blured-layout': blurDashboard}">
			<app-header />
			<div
					class='rest-content'
					:class="{'blured-layout': searchOpened}"
					@click="setSearchFocusFalse">
				<div class="wrapper">
					<project-list @removePreloader="removePreloader" />
				</div>
				<app-footer />
			</div>
		</div>
		<div class="dashboard-popup-container" v-show="currentPopup">
			<ManagePopup
					v-if="currentPopup === 'edit' || currentPopup === 'add'"
					@closePopup="closePopup"
					:project="getProjectById(popupProjectId)">
			</ManagePopup>

			<sharePopup
					v-if="currentPopup === 'rights'"
					@closePopup="closePopup"
					:project="getProjectById(popupProjectId)">
			</sharePopup>

			<deletePopup
					v-if="currentPopup === 'delete'"
					@closePopup="closePopup"
					:project="getProjectById(popupProjectId)">
			</deletePopup>


			<div
					v-if="blurDashboard"
					class="blur-background-without-header"
					:class="{'darkened-popup-background': drawMeBlack}"
					@click="closePopup">
			</div>
		</div>
		<div
				v-if="searchOpened"
				class="blur-background-with-header"
				:class="{'darkened-popup-background': drawMeBlack}"
				@click="closeAll">
		</div>
		<messager />
		<Preloader :showPreloader="preloaderStatus" />
	</div>
</template>

<script>
    import vue from 'vue'
    import { mapState, mapGetters } from 'vuex'

    import Project from './project-list/ProjectList.vue'
    import Header from './Header.vue'
    import Footer from './Footer.vue'
    import sharePopup from './popups/ShareProject.vue'
    import ManagePopup from './popups/ManageProject.vue'
    import deletePopup from './popups/DeleteProject.vue'
    import Messager from '../elements/ErrorMessages.vue'
    import Preloader from '../elements/Preloader.vue'

    export default {

        created(){
            document.title = 'Мои проекты';
            this.$store.commit('setStatus', 'pending');
            this.$store.commit('setPagesMode', 'none');
            document.addEventListener('keydown', this.keyDownEvent);
            document.addEventListener('keyup', this.keyUpEvent);
        },

        data(){
            return {
                preloaderStatus: true,
                drawMeBlack: false,
                keysPressed: {},
            }
        },

        watch: {
            'currentPopup': function () {
                if (this.currentPopup !== '')
                    this.toDarkPopup()
            },

            'searchOpened': function () {
                if (this.searchOpened)
                    this.toDarkPopup();
                else
                    this.drawMeBlack = false;
            },

            'keysPressed': function () {            /*Через ватчер, потому что событие нажатия клавиши баблится*/
                this.multiKeypressHandler();
            }
        },

        computed: {
            ...mapState({
                popupProjectId: state => state.DashboardStore.popupProjectId,
                currentPopup: state => state.DashboardStore.currentPopup,
                searchOpened: state => state.SearchStore.searchOnFocus
            }),

            ...mapGetters([
                'currentOsMainKey'
            ]),

            blurDashboard(){
                return this.currentPopup !== ''
            },
        },

        methods: {
            keyDownEvent(event){
                if (!this.keysPressed[event.keyCode])
                    vue.set(this.keysPressed, event.keyCode, true);
                if (this.keysPressed[this.currentOsMainKey] && (this.keysPressed[70] || this.keysPressed[80])) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            },

            keyUpEvent(event){
                if (this.keysPressed[this.currentOsMainKey])
                    this.keysPressed = {};
                if (this.keysPressed[event.keyCode])
                    vue.delete(this.keysPressed, event.keyCode);

                event.preventDefault();
                event.stopPropagation();
            },

            multiKeypressHandler(){
                if (this.keysPressed[this.currentOsMainKey] && this.keysPressed[80])
                    this.callPopup('add', 0);
                if (this.keysPressed[this.currentOsMainKey] && this.keysPressed[70])
                    this.$store.commit('setSearchFocus', true);
            },

            callPopup(popupType, project_id) {
                this.$store.commit('setCurrentPopup', popupType);
                this.$store.commit('setPopupProjectId', project_id);
            },

            toDarkPopup(){
                setTimeout(() => {this.drawMeBlack = true}, 10);
            },

            closePopup(){
                this.$store.commit('setCurrentPopup', '');
                this.drawMeBlack = false;
            },
            closeAll(){
                this.$store.commit('setSearchFocus', false);
                this.$store.commit('setProfileStatus', false);
                this.$store.commit('setSearchSelectorStatus', false);
            },

            getProjectById(id) {
                return this.$store.getters.getProjectById(id)
            },

            removePreloader(){
                this.preloaderStatus = false;
            },

            setSearchFocusFalse(){
                this.$store.commit('setSearchFocus', false);
                this.$store.commit('setProfileStatus', false);
            },
        },

        beforeDestroy(){
            document.removeEventListener('keyup', this.keyUpEvent);
            document.removeEventListener('keydown', this.keyDownEvent);
        },

        components: {
            projectList: Project,
            appHeader: Header,
            appFooter: Footer,
            ManagePopup,
            deletePopup,
            Messager,
            Preloader,
            sharePopup,
        },

    }

</script>