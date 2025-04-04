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
      key: 'code',
      value: 'code',
      title: 'code',
      width: '200',
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
      key: 'stratigraphicUnits',
      value: 'stratigraphicUnits',
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
      key: 'collector',
      value: 'collector',
      title: 'collector',
      sortable: true,
    },
    {
      key: 'takingDate',
      value: 'takingDate',
      title: 'date taken',
      sortable: true,
    },
    {
      key: 'description',
      value: 'description',
      title: 'description',
      sortable: false,
    },
  ],
} as Readonly<StaticResourceConfig>
