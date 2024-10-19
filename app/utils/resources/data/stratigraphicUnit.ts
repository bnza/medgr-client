import type { StaticResourceConfig } from '~~/types/api'

export default {
  appPath: '/data/stratigraphic-units',
  labels: ['Stratigraphic Unit', 'Stratigraphic Units'],
  protectedFields: ['public'],
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
      key: 'site.code',
      value: 'site.code',
      title: 'site',
      width: '80',
    },
    {
      key: 'code',
      value: 'code',
      title: 'code',
      width: '200',
      sortable: false,
    },
    {
      key: 'number',
      value: 'number',
      title: 'number',
    },
    {
      key: 'year',
      value: 'year',
      title: 'year',
    },
    {
      key: 'interpretation',
      value: 'interpretation',
      title: 'interpretation',
      sortable: false,
    },
    {
      key: 'description',
      value: 'description',
      title: 'description',
      sortable: false,
    },
    {
      key: 'public',
      value: 'public',
      title: 'public',
      sortable: false,
    },
  ],
} as Readonly<StaticResourceConfig>
