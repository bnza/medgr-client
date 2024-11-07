import type { StaticResourceConfig } from '~~/types/api'

export default {
  appPath: '/admin/sites-users-privileges',
  labels: ['Sites/Users Privilege', 'Sites/Users Privileges'],
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
      width: '200',
    },
    {
      key: 'user.email',
      value: 'user.email',
      title: 'user',
    },
    {
      key: 'privileges',
      value: 'privileges',
      title: 'privileges',
    },
  ],
} as Readonly<StaticResourceConfig>
