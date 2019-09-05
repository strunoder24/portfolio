/*
	Компонент для загрузки/редактирования изображения.
	-------------------------------------------------
	Image upload/edit component.
*/

<template>
	<div class="image-buffer-wrapper">
		<preloader :showPreloader="showMassPreloader" :mode="'coverFooter'"></preloader>
		<div class="image-buffer-header-title" v-if="images.length === 1">Добавление {{images.length}} нового изображения</div>
		<div class="image-buffer-header-title" v-if="images.length > 1">Добавление {{images.length}} новых изображений</div>
		<div class="image-buffer-items-container">
			<div class="image-buffer-item" :key="item.codename" v-for="(item, index) in images">
				<div class="image-buffer-image-block">
					<img :src="item.thumbnails.preview" alt="Изображение">
				</div>
				<div class="image-buffer-info-block">
					<div>
						<div class="image-buffer-item-info-header">
							<div>
								<div class="image-buffer-item-title">{{item.codename}}</div>
								<div style="display: flex;">
									<span>{{item.file_resolution}} / {{item.file_size}} / {{item.extension}}</span>
									<exif :info="item.exif"></exif>
								</div>
							</div>
							<button v-if="!deleteDialog.includes(item.id)" class="button proto-button" @click="deleteDialog.push(item.id)">Удалить</button>
							<div class="image-buffer-delete-dialog" v-if="deleteDialog.includes(item.id)">
								<span>Вы уверены?</span>
								<button class="button button-borderless" @click="deleteImage(item.id)">Удалить</button>
								<button class="button button-borderless" @click="deleteDialog.splice(deleteDialog.indexOf(item.id), 1)">Отмена</button>
							</div>
						</div>
					</div>
					<div>
						<div class="image-buffer-item-row">
							<span>Название (IPTC: Headline) *</span>
							<div style="position: relative" @mouseenter="hovered = `tittle${item.id}`" @mouseleave="hovered = ''">
								<div
										class="synchronize-value-container"
										:class="{'synchronize-value-container-picked': hovered === `tittle${item.id}` && item.title}"
										@click="syncValue(item.title, 'title')"
										v-if="imagesCount > 1"
										title="Применить для всех">
									<img src="../../../src/images/icons/icon_add.png">
								</div>
								<input
										@input="setValue(item, 'title', $event)"
										v-model="item.title"
										title="Название"
										@click="deleteError(item, 'title')"
										maxlength="255"
										type="text"
										:class="{'input-on-error': hasError(item, 'title')}"
										class="input image-buffer-text-input">
								<inputError
										v-if="hovered === `tittle${item.id}`"
										:errors="errorsObject[item.id]"
										:flagName="'title'">
								</inputError>
							</div>
						</div>
						<div class="image-buffer-item-row">
							<span>Автор (IPTC: Creator) *</span>
							<autofillInput
									:title="'Автор'"
									:api="'authors'"
									:itemName="'name'"
									:maxLength="255"
									:passedData="item.author"
									:width="420"
									:placeholder="'Введите ФИО автора'"
									:hasError="hasError(item, 'author')"
									:inputClass="'image-buffer-text-input'"
									@clearError="deleteError(item, 'author')"
									@picked="setValueClear(item, 'author', $event)">
							</autofillInput>
						</div>
						<div class="image-buffer-item-row">
							<span>Описание (IPTC: Description) *</span>
							<textareaWidget
									:codename="'description'"
									:title="'Описание'"
									:imageItem="item"
									:width="'420px'"
									:maxHeight="'210px'"
									:errorsObject="errorsObject"
									:passedData="item.description"
									@clearError="deleteError(item, 'description')"
									@callback="textareaCallback(item, 'description', $event)">
							</textareaWidget>
						</div>
						<div class="image-buffer-item-row">
							<span>Лицензия ©</span>
							<singleSelector
									:title="'Копирайт / Лицензия'"
									:api="'copyrights'"
									:itemName="'name'"
									:passedData="(typeof item.copyright === 'object') ? item.copyright : undefined"
									:hasError="hasError(item, 'copyright')"
									:placeholder="'Выберите тип лицензии'"
									:width="420"
									:inputClass="'image-buffer-text-input'"
									@clearError="deleteError(item, 'copyright')"
									@picked="setValueClear(item, 'copyright', $event)">
							</singleSelector>
						</div>
						<div class="image-buffer-item-row">
							<span>Теги (IPTC: Keywords) *</span>
							<tagsWidget
									:codename="'tags'"
									:title="'Теги'"
									:placeholder="'Перечислите тэги через запятую или точку с запятой'"
									:imageItem="item"
									:valueName="'tag'"
									:width="'420px'"
									:maxHeight="'210px'"
									:passedData="item.tags"
									:errorsObject="errorsObject"
									@clearError="deleteError(item, 'tags')"
									@callback="setValueClear(item, 'tags', $event)">
							</tagsWidget>
						</div>
						<div class="image-buffer-item-row">
							<span>Дата съемки (IPTC: Date Created)</span>
							<dateInput
									:title="'Дата съемки'"
									:itemName="'name'"
									:calendarIconRight="'180px'"
									:hasError="hasError(item, 'shooting_date')"
									:passedData="item.shooting_date"
									:transX="'-28px'"
									:type="'datetime'"
									:placeholder="'00.00.0000 00:00'"
									:inputClass="'image-buffer-date-input'"
									@clearError="deleteError(item, 'shooting_date')"
									@picked="setValueClear(item, 'shooting_date', $event)">
							</dateInput>
						</div>
						<div class="image-buffer-item-row">
							<span>Место съемки (IPTC: Sublocation)</span>
							<autofillInput
									:title="'Место съемки'"
									:api="'locations'"
									:itemName="'location'"
									:maxLength="255"
									:width="420"
									:placeholder="'Введите название места съёмки'"
									:hasError="hasError(item, 'photo_location')"
									:passedData="(typeof item.photo_location === 'object') ? item.photo_location : undefined"
									:inputClass="'image-buffer-text-input'"
									@clearError="deleteError(item, 'photo_location')"
									@picked="setValueClear(item, 'photo_location', $event)">
							</autofillInput>
						</div>
						<div class="image-buffer-item-row">
							<span>Населённый пункт (IPTC: City)</span>
							<autofillInput
									:title="'Населённый пункт'"
									:api="'cities'"
									:itemName="'name'"
									:maxLength="255"
									:width="420"
									:placeholder="'Введите название населённого пункта (города)'"
									:hasError="hasError(item, 'city')"
									:passedData="(typeof item.city === 'object') ? item.city : undefined"
									:inputClass="'image-buffer-text-input'"
									@clearError="deleteError(item, 'city')"
									@picked="setValueClear(item, 'city', $event)">
							</autofillInput>
						</div>
						<div class="image-buffer-item-row">
							<span>Регион (IPTC: State/Province)</span>
							<autofillInput
									:title="'Регион'"
									:api="'states'"
									:itemName="'name'"
									:maxLength="255"
									:width="420"
									:placeholder="'Введите название региона (области, края)'"
									:hasError="hasError(item, 'state')"
									:passedData="(typeof item.state === 'object') ? item.state : undefined"
									:inputClass="'image-buffer-text-input'"
									@clearError="deleteError(item, 'state')"
									@picked="setValueClear(item, 'state', $event)">
							</autofillInput>
						</div>
						<div class="image-buffer-item-row">
							<span>Страна (IPTC: Country)</span>
							<autofillInput
									:title="'Страна'"
									:api="'countries'"
									:itemName="'name'"
									:maxLength="255"
									:width="420"
									:placeholder="'Введите название страны (территории)'"
									:hasError="hasError(item, 'country')"
									:passedData="(typeof item.country === 'object') ? item.country : undefined"
									:inputClass="'image-buffer-text-input'"
									@clearError="deleteError(item, 'country')"
									@picked="setValueClear(item, 'country', $event)">
							</autofillInput>
						</div>
						<div class="image-buffer-item-row">
							<span>Использование</span>
							<div @mouseenter="hovered = `where_was_used${item.id}`" @mouseleave="hovered = ''">
								<div
										class="synchronize-value-container"
										:class="{'synchronize-value-container-picked': hovered === `where_was_used${item.id}` && item.where_was_used}"
										@click="syncValue(item.where_was_used, 'where_was_used')"
										v-if="imagesCount > 1"
										title="Применить для всех">
									<img src="../../../src/images/icons/icon_add.png">
								</div>
								<input
										@click="deleteError(item, 'where_was_used')"
										v-model="item.where_was_used"
										@input="setValue(item, 'where_was_used', $event)"
										:maxLength="255"
										title="Использование"
										:class="{'input-on-error': hasError(item, 'where_was_used')}"
										class="input image-buffer-text-input">
							</div>
						</div>
						<div class="image-buffer-item-row">
							<span>Примечание</span>
							<div @mouseenter="hovered = `comment${item.id}`" @mouseleave="hovered = ''">
								<textareaWidget
										:codename="'comment'"
										:title="'Примечание'"
										:imageItem="item"
										:width="'420px'"
										:maxHeight="'210px'"
										:errorsObject="errorsObject"
										:passedData="item.comment"
										@clearError="deleteError(item, 'comment')"
										@callback="textareaCallback(item, 'comment', $event)">
								</textareaWidget>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="image-buffer-bottom-buttons">
			<button class="button proto-button image-buffer-delete-all"
			        @click="showDeletePopup = true"
			        @close="showDeletePopup = false"
			        v-show="images.length > 1">
				Удалить всё
			</button>
			<div class="image-buffer-upload-container">
				<div class="icon-upload"></div>
				<button class="button proto-button header-upload-button" @click="showUploadPopup = true">Загрузить ещё</button>
			</div>
			<button class="button big-colored-button image-buffer-save-button" @click="saveBuffer">Сохранить {{images.length}} {{multiEnds(images.length)}}</button>
		</div>
		<uploadPopup v-if="showUploadPopup" @close="showUploadPopup = false"></uploadPopup>
		<deleteImages v-if="showDeletePopup" @close="showDeletePopup = false"></deleteImages>
	</div>
</template>

<script>
    import vue from 'vue'
    import axios from 'axios'
    import VueCookie from 'vue-cookies'
    import { mapState } from 'vuex'

    import uploadPopup from '../elements/popups/UploadImages.vue'
    import deleteImages from '../elements/popups/DeleteBufferPopup.vue'

    import autofillInput from '../elements/widgets/InputAutofill.vue'
    import tagSelector from '../elements/widgets/TagSelector.vue'
    import singleSelector from '../elements/widgets/SingleSelector.vue'
    import dateInput from '../elements/widgets/dateInput/dateInput.vue'
    import exif from '../elements/widgets/Exif.vue'
    import inputError from '../elements/InputError.vue'
    import textareaWidget from '../elements/widgets/Textarea.vue'
    import tagsWidget from '../elements/widgets/TagsWidget.vue'
    import preloader from '../elements/Preloader.vue'

    import { numberDependantEnd } from '../../helpers/wordForms'
    import errorHelper from '../../helpers/errors'
    import { containsOnlySpaces } from '../../helpers/strings'

    export default {
        data() {
            return {
                images: [],

                errorsObject: [],
                hovered: '',

                showMassPreloader: true,
                showDeletePopup: false,
                showUploadPopup: false,
                deleteDialog: [],
            }
        },

        mounted() {
            this.getUserUploads();
        },

        computed: {
            ...mapState({
                reloadTrigger: state => state.imageBuffer.BufferTrigger,
                imagesCount: state => state.imagesSync.imagesCount,
                changeField: state => state.imagesSync.changeField,
            })
        },

        watch: {
            'reloadTrigger': function () {
                this.getUserUploads();
            },

            'changeField': function () {
                if (this.changeField.flag === 'where_was_used' || this.changeField.flag === 'title') {
                    for (let i = 0; i < this.images.length; i++) {
                        vue.set(this.images[i], this.changeField.flag, this.changeField.value);
                        this.changeImageData(this.images[i], this.changeField.flag, this.changeField.value);
                    }
                }
            }
        },

        methods: {
            containOnlySpaces(str){
                return containsOnlySpaces(str)
            },

            syncValue(value, flag){
                if (value) {
                    this.$store.commit('setSyncChangeField', {flag, value})
                }
            },

            hasError(entity, codename) {
                if (this.errorsObject[entity.id] && this.errorsObject[entity.id][codename])
                    return this.errorsObject[entity.id][codename][0];
                else
                    return false;
            },

            deleteError(entity, codename){
                if (this.errorsObject[entity.id] && this.errorsObject[entity.id][codename])
                    vue.delete(this.errorsObject[entity.id], codename)
            },

            setValue(item, codename, e){
                this.changeImageData(item, codename, e.target.value);
            },

            setValueClear(item, codename, value) {
                vue.set(item, codename, value);
                this.changeImageData(item, codename, value);
            },

            textareaCallback(item, codename, value) {
                this.changeImageData(item, codename, value);
            },

            saveBuffer(){
                setTimeout(() => {
                    let conf = {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFTOKEN': VueCookie.get('csrftoken')
                        },
                    };

                    axios.post(`/image-buffer/`, this.images, conf)
                        .then(() => {
                            this.$router.push({name: 'main-page'});
                            this.$store.commit('setBuffer', {});
                            this.$store.commit('userUploadsChanged');
                            this.$store.commit('setErrorsStore', {
                                type: 'success',
                                message: (this.images.length === 1) ? 'Изображение добавлено в базу Фотостога' : 'Изображения добавлены в базу Фотостога'
                            });
                        })
                        .catch(e => {
                            if (e.response) {
                                if (e.response.status === 400) {
                                    this.$store.commit('setErrorsStore', {
                                        type: 'failed',
                                        message: 'Одно или несколько полей формы содержат ошибки'
                                    });
                                    this.errorsObject = e.response.data;
                                } else {
                                    errorHelper.errorHandler(this, e, `/image-buffer/`)
                                }
                            }
                        })
                }, 50);
            },

            changeImageData(image, codename, value){
                if (typeof codename !== 'undefined' && typeof value !== 'undefined' && !this.containOnlySpaces(value)) {
                    let conf = {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFTOKEN': VueCookie.get('csrftoken')
                        },
                    };

                    axios.patch(`/image-buffer/${image.id}/`, {
                        [codename]: value
                    }, conf)
                        .then(() => {})
                }
            },

            getUserUploads(){
                const conf = {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                };
                axios.get(`/image-buffer/`,conf)
                    .then(response => {
                        this.images = response.data;
                        this.$store.commit('setSyncImagesCount', this.images.length);
                        setTimeout(() => {
                            this.showMassPreloader = false
                        }, 200);

                        if (this.images.length === 0)
                            this.$router.push({name: 'main-page'});
                    })
                    .catch(error => {
                        if (error.response.status === 500) {
                            this.$store.commit('setErrorsStore', {
                                type: 'failed',
                                message: 'Ошибка 500: внутреняя ошибка сервера, попробуйте попытку позже'
                            });
                            this.$store.commit('set500Status', true)
                        } else {
                            errorHelper.errorHandler(this, error, `/image-buffer/`)
                        }
                    })
            },


            deleteImage(id){
                const conf = {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': VueCookie.get('csrftoken')
                    },
                };
                axios.delete(`/image-buffer/${id}/`,conf)
                    .then(() => {
                        this.$store.commit('setErrorsStore', {
                            type: 'success',
                            message: 'Изображение удалено'
                        });

                        for (let i = 0; this.images.length; i++) {
                            if (this.images[i].id === id) {
                                vue.delete(this.images, i);
                                this.$store.commit('userUploadsChanged');
                                break
                            }
                        }

                        if (this.images.length === 0)
                            this.$router.push({name: 'main-page'});
                    })
                    .catch(error => {
                        errorHelper.errorHandler(this, error, `/image-buffer/${id}/`)
                    })
            },

            multiEnds(number){
                let ends = {
                    '1': 'изображение',
                    '2_4': 'изображения',
                    '5_20': 'изображений',
                };
                return numberDependantEnd(number, ends)
            },
        },

        components: {
            uploadPopup,
            deleteImages,
            autofillInput,
            tagSelector,
            singleSelector,
            dateInput,
            exif,
            inputError,
            textareaWidget,
            tagsWidget,
            preloader,
        },

        beforeDestroy(){
            this.$store.commit('clearLocalErrors');
            this.$store.commit('setSyncImagesCount', 0);
        },
    }
</script>