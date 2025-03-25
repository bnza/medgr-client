import type { StaticResourceConfig } from '~~/types/api'

export default {
  appPath: '/jobs',
  labels: ['Job', 'Jobs'],
  protectedFields: [],
  defaultHeaders: [
    {
      key: 'id',
      value: 'id',
      title: 'ID',
      align: 'center',
      width: '200',
      maxWidth: '200',
      sortable: false,
    },
    {
      key: 'name',
      value: 'name',
      title: 'name',
      sortable: false,
    },
    {
      key: 'class',
      value: 'class',
      title: 'class',
      sortable: false,
    },
    {
      key: 'service',
      value: 'service',
      title: 'Service',
      sortable: false,
    },
    {
      key: 'description',
      value: 'description',
      title: 'description',
      sortable: false,
    },
    {
      key: 'status',
      value: 'status',
      title: 'status',
      sortable: false,
    },
    {
      key: 'startedAt',
      value: 'startedAt',
      title: 'started at',
      sortable: false,
    },
    {
      key: 'terminatedAt',
      value: 'terminatedAt',
      title: 'terminated at',
      sortable: false,
    },
  ],
} as Readonly<StaticResourceConfig>
