/*
    Пример конфига по которому генерируются формы
    -------------------------------------------------
    Sample of a config file which used to render forms
*/


const state = {
    formsOptions: {
        warehouses: [
            {
                id: 1,
                title: 'ИНФОРМАЦИЯ',
                blocks: [
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        hasWideLabel: true,
                        invalid: false,
                        modClass: 'marginBottom50',
                        elements: [
                            {
                                label: 'Пункт выдачи',
                                expected_value: 'id',
                                required: false,
                                width: 12,
                                codename: 'delivery_point',
                                widget: 'singleSelector',
                                invalid: false,
                                api_route: 'delivery-points',
                                sortFlag: {
                                    value: 'name',
                                    direction: 'asc'
                                },
                                view_structure: [
                                    {
                                        value: 'name',
                                        flex: .9 , /*Так как контейнер будет флексовым, стоит ввести отдельное значение flex*/
                                        // modClass: 'none'
                                    },
                                    {
                                        value: 'address',
                                        flex: 1, /*Так как контейнер будет флексовым, стоит ввести отдельное значение flex*/
                                        modClass: 'halfTransparent'
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
                                label: 'Комментарий',
                                required: false,
                                invalid: false,
                                height: 60,
                                width: 12,
                                codename: 'comment',
                                widget: 'textarea',
                                hint: ''
                            },
                        ]
                    },
                ],
            },
            {
                id: 2,
                title: 'СИНХРОНИЗАЦИЯ C 1С',
                blocks: [
                    {
                        labelPosition: 'left',
                        direction: 'row',
                        modClass: 'marginBottom22',
                        elements: [
                            {
                                label: 'Наименования в 1С',
                                isActive: false,
                                required: false,
                                invalid: false,
                                width: 8,
                                codename: 'external_name',
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
                                label: '1C ID',
                                isActive: false,
                                required: false,
                                invalid: false,
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
                                invalid: false,
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
};

export default {
    state
}