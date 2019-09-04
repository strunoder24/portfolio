/*
    Пример конфига по которому генерируются списки
    --------------------------------------------------
    Sample of a config file which used to render lists
*/

const state = {
    columnsConfig: {
        warehouses: [
            {
                name: '#',
                type: 'int',
                is_sortable: true,
                width: 100,
                fixed: true,
                codename: 'id',
                sort: {
                    direction: 'DESC',
                    order_by: 'id'
                }
            },
            {
                name: 'Наименование в 1С',
                type: 'text',
                is_sortable: true,
                width: 180,
                codename: 'c_name',
                isMain: true,
            },
            {
                name: 'Пункт выдачи',
                type: 'text',
                is_sortable: false,
                width: 180,
                codename: 'delivery_point',
                isMain: true,
            },
            {
                name: 'Комментарий',
                type: 'comment',
                is_sortable: false,
                align_text: 'center',
                width: 160,
                codename: 'comment',
            },
            {
                name: '1C ID',
                type: 'text',
                fixed: true,
                is_sortable: false,
                align_text: 'left',
                width: 120,
                codename: 'c_id',
            },
            {
                name: 'Дата посл. синхр. с 1С',
                type: 'date',
                is_sortable: true,
                align_text: 'left',
                width: 180,
                codename: 'last_sync_dt',
            },
            {
                name: 'Дата создания',
                type: 'date',
                is_sortable: true,
                align_text: 'left',
                width: 180,
                codename: 'create_date',
            },
            {
                name: 'Дата изменения',
                type: 'date',
                is_sortable: true,
                align_text: 'left',
                width: 180,
                codename: 'edit_date',
            },
        ],
    },
    actionsConfig: {
        warehouses: {
            addButton: false,
            activationButtons: false,
            deleteButton: false,
        }
    },
    filterConfig: {
        warehouses: [
            {
                filterTitle: 'Пункты выдачи',
                queryName: 'delivery_point_id__in',
                viewValue: 'name',
                input_type: 'CheckboxList',
                api_route: 'delivery-points',
                callbackValue: 'id'
            },
            {
                filterTitle: 'Дата посл. синхр. с 1С',
                minMaxCodename: 'last_sync_dt',
                queryName: {
                    min: 'last_sync_dt__gte',
                    max: 'last_sync_dt__lte'
                },
                input_type: 'toFromDate',
                type: 'date_time',
            },
            {
                filterTitle: 'Дата создания',
                queryName: {
                    min: 'create_date__gte',
                    max: 'create_date__lte'
                },
                input_type: 'toFromDate',
                type: 'date_time'
            },
            {
                filterTitle: 'Дата изменения',
                queryName: {
                    min: 'edit_date__gte',
                    max: 'edit_date__lte'
                },
                input_type: 'toFromDate',
                type: 'date_time'
            },
        ],
    }
};

export default {
    state
}