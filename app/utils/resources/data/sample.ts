import type { StaticResourceConfig } from '~~/types/api'

export default {
  appPath: '/data/samples',
  labels: ['Sample', 'Samples'],
  defaultHeaders: [
    {
      key: 'id',
      value: 'id',
      title: 'ID',
      align: 'center',
      width: '200',
      maxWidth: '200',
    },
    {
      key: 'stratigraphicUnit.site.code',
      value: 'stratigraphicUnit.site.code',
      title: 'site',
      width: '200',
    },
    {
      key: 'stratigraphicUnit.year',
      value: 'stratigraphicUnit.year',
      title: 'year',
      width: '200',
    },
    {
      key: 'stratigraphicUnit.number',
      value: 'stratigraphicUnit.code',
      title: 'SU',
      width: '200',
      sortable: false,
    },
    {
      key: 'number',
      value: 'number',
      title: 'number',
    },
    {
      key: 'description',
      value: 'description',
      title: 'description',
      sortable: false,
    },
  ],
} as Readonly<StaticResourceConfig>
