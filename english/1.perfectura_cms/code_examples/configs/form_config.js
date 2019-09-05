/*
    Sample of a config file which used to render forms
*/

const state = {
    formsOptions: {
        goods: [
            {
                id: 1,
                title: 'ИНФОРМАЦИЯ',
                blocks: [
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        elements: [
                            {
                                type: 'field',
                                label: 'Название',
                                required: true,
                                width: 12,
                                codename: 'name',
                                modClass: 'marginBottom22',
                                widget: 'simpleInput',
                                hint: ''
                            },
                        ]
                    },
                    {
                        name: 'Категория',
                        direction: 'row',
                        labelPosition: 'left',
                        modClass: 'marginBottom28',
                        elements: [
                            {
                                type: 'field',
                                label: 'Бренд',
                                expected_value: 'id',
                                required: true,
                                width: 6,
                                codename: 'brand',
                                widget: 'singleSelector',
                                isBlocked: true,
                                api_route: 'brands',
                                sortFlag: {
                                    value: 'name',
                                    direction: 'asc'
                                },
                                view_structure: [
                                    {
                                        value: 'name',
                                        flex: 1.5,
                                    },
                                ],
                                hint: ''
                            },
                        ]
                    },
                    {
                        name: 'Категория',
                        direction: 'row',
                        labelPosition: 'top',
                        modClass: 'marginBottom28',
                        elements: [
                            {
                                type: 'field',
                                label: 'Категория товаров',
                                expected_value: 'id',
                                required: true,
                                width: 6,
                                codename: 'category',
                                widget: 'singleSelector',
                                api_route: 'categories',
                                sortFlag: {
                                    value: 'name',
                                    direction: 'asc'
                                },
                                params: {
                                    flag: 'product_card_id__in',
                                    requiredValue: 'product_card'
                                },
                                view_structure: [
                                    {
                                        value: 'name',
                                        flex: 1.5,
                                    },
                                ],
                                hint: ''
                            },
                            {
                                type: 'field',
                                label: 'Карточка товара',
                                expected_value: 'id',
                                isBlocked: true,
                                required: false,
                                width: 6,
                                codename: 'product_card',
                                widget: 'singleSelector',
                                api_route: 'categories',
                                sortFlag: {
                                    value: 'name',
                                    direction: 'asc'
                                },
                                view_structure: [
                                    {
                                        value: 'name',
                                        flex: 1.5,
                                    },
                                ],
                                hint: ''
                            },
                        ]
                    },
                    {
                        type: 'declarativeRenderer',
                        name: 'card_attributes',

                        labelPosition: 'left',
                        direction: 'column',
                        elements: []
                    },
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        modClass: ['marginBottom21', 'marginTop27'],
                        elements: [
                            {
                                label: 'Описание',
                                required: true,
                                widget: 'formatter',
                                codename: 'description',
                                width: 12,
                                hint: ''
                            }
                        ]
                    },
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        modClass: 'marginBottom50',
                        elements: [
                            {
                                type: 'field',
                                expected_value: 'id',
                                label: 'Гарантия',
                                required: false,
                                width: 8,
                                sortFlag: {
                                    value: 'name',
                                    direction: 'asc'
                                },
                                api_route: 'warranties',
                                codename: 'warranty',
                                widget: 'singleSelector',

                                view_structure: [
                                    {
                                        value: 'name',
                                        flex: 1.5,
                                    },
                                ],
                                hint: ''
                            },
                        ]
                    },
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        elements: [
                            {
                                type: 'field',
                                label: 'Комментарий',
                                required: false,
                                height: 60,
                                width: 12,
                                codename: 'comment',
                                widget: 'textarea',
                                hint: ''
                            },
                        ]
                    },
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        modClass: 'marginTop22',
                        elements: [
                            {
                                label: 'Хит продаж (у товара на сайте отображается плашка Хит)',
                                required: false,
                                codename: 'is_hit',
                                widget: 'singleCheckbox',
                                hint: ''
                            }
                        ]
                    },
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        modClass: 'marginTop22',
                        elements: [
                            {
                                label: 'Новый товар (у товара на сайте отображется плашка Новинка)',
                                required: false,
                                codename: 'is_new',
                                widget: 'singleCheckbox',
                                hint: ''
                            }
                        ]
                    },
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        elements: [
                            {
                                type: 'field',
                                label: 'Карточка товара',
                                renderFlag: 'noOneEverSawYou',
                                required: false,
                                width: 6,
                                widget: 'blockedInput',
                                common_value: 'product_card_name',

                                api_route: 'product-cards',
                                expected_value: 'attributes',
                                nested_data: 'attribute',

                                codename: 'name',
                                passedCodename: 'product_card',
                                hint: '',


                                renderController: {
                                    name: 'card_attributes',
                                    api_route: 'product-cards',
                                    header: 'Свойства товара',
                                    wayToID: ''
                                },
                            },
                        ]
                    },
                ],
            },
            {
                id: 2,
                title: 'ИЗОБРАЖЕНИЯ',
                blocks: [
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        elements: [
                            {
                                type: 'field',
                                inputID: 'MisterXren',
                                dragID: 'MisterNerx',
                                label: 'Основная обложка',
                                expected_value: 'medium_url',
                                required: true,
                                width: 6,
                                image: {
                                    width: 880,
                                    height: 880,
                                },
                                codename: 'cover',
                                widget: 'singleImageLoader',
                                modClass: 'marginBottom22',
                                requireSendId: true,
                                key_attr: 'id',
                                hint: ''
                            },
                        ]
                    },
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        elements: [
                            {
                                type: 'field',
                                inputID: 'Pupsen',
                                dragID: 'Vupsen',
                                label: 'Дополнительные фотографии',
                                expected_value: 'medium_crop_url',
                                codename: 'photo',
                                dndFlag: 'photo_order',
                                required: false,
                                widget: 'multipleImageLoader',
                                width: 12,
                                image_properties: {
                                    width: 880,
                                    height: 880,
                                },
                                hint: '',
                            }
                        ],
                    },
                ]
            },
            {
                id: 3,
                title: 'SEO и OG',
                blocks: [
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        modClass: 'marginBottom20',
                        elements: [
                            {
                                type: 'field',
                                label: 'Заголовок страницы (title/ og:title)',
                                required: false,
                                width: 12,
                                codename: 'meta_title',
                                widget: 'simpleInput',
                                hint: ''
                            },
                        ]
                    },
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        modClass: 'marginBottom20',
                        elements: [
                            {
                                type: 'field',
                                label: 'Описание страницы<br>(description / og:description)',
                                required: false,
                                width: 12,
                                codename: 'meta_description',
                                widget: 'textarea',

                                hint: ''
                            },
                        ]
                    },
                    {
                        labelPosition: 'left',
                        modClass: 'marginBottom20',
                        direction: 'row',
                        elements: [
                            {
                                type: 'field',
                                label: 'Ключевые слова, через<br>запятую (keywords)',
                                required: false,
                                width: 12,
                                codename: 'meta_keywords',
                                widget: 'textarea',

                                hint: ''
                            },
                        ]
                    },
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        elements: [
                            {
                                type: 'field',
                                inputID: 'popupGo123',
                                dragID: 'popupGo1231112',
                                label: '',
                                expected_value: 'medium_url',
                                required: false,
                                width: 12,
                                image: {
                                    width: 1200,
                                    height: 630,
                                },

                                codename: 'og_image',
                                widget: 'singleImageLoader',
                                requireSendId: true,
                                key_attr: 'id',
                                hint: ''
                            },
                        ]
                    },
                ]
            },
            {
                id: 4,
                title: 'СИНХРОНИЗАЦИЯ C 1С',
                blocks: [
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        modClass: 'marginBottom22',
                        elements: [
                            {
                                type: 'field',
                                label: 'Наименования в 1С',
                                isActive: false,
                                required: false,
                                width: 12,
                                codename: 'external_name',
                                widget: 'simpleInput',
                                hint: ''
                            },
                        ]
                    },
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        modClass: 'marginBottom22',
                        elements: [
                            {
                                type: 'field',
                                label: 'Код товара',
                                isActive: false,
                                required: false,
                                width: 4,
                                codename: 'product_code',
                                widget: 'simpleInput',
                                hint: ''
                            },
                        ]
                    },
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        modClass: 'marginBottom21',
                        elements: [
                            {
                                type: 'field',
                                label: '1C ID',
                                isActive: false,
                                required: false,
                                width: 8,
                                codename: 'c_id',
                                widget: 'simpleInput',
                                hint: ''
                            },
                        ]
                    },
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        modClass: 'marginBottom22',
                        elements: [
                            {
                                type: 'mask-datetime',
                                label: 'Дата и время посл. <br> синхронизации с 1С',
                                required: false,
                                isActive: false,
                                width: 4,
                                codename: 'last_sync_dt',
                                widget: 'simpleInput',
                                hint: ''
                            },
                        ]
                    },
                ]
            }
        ],
    },

    activeFlag: {
        goods: {
            title: 'Активный товар',
            hint: 'Неактивные товары не отображаются на сайте',
        }
    },
};

export default {
    state
}