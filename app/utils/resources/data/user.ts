import type { StaticResourceConfig } from '~~/types/api'

export default {
  appPath: '/admin/users',
  labels: ['User', 'Users'],
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
      key: 'email',
      value: 'email',
      title: 'email',
      width: '200',
    },
    {
      key: 'roles',
      value: 'roles',
      title: 'roles',
      sortable: false,
    },
  ],
} as Readonly<StaticResourceConfig>
