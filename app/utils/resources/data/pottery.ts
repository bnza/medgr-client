import type { StaticResourceConfig } from '~~/types/api'

export default {
  appPath: '/data/potteries',
  labels: ['Pottery', 'Potteries'],
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
      sortable: false,
    },
    {
      key: 'number',
      value: 'number',
      title: 'number',
    },
    {
      key: 'projectIdentifier',
      value: 'projectIdentifier',
      title: 'project identifier',
      sortable: false,
    },
    {
      key: 'fragmentsNumber',
      value: 'fragmentsNumber',
      title: 'fragments (num.)',
    },
    {
      key: 'chronologyLower',
      value: 'chronologyLower',
      title: 'chronology (lower)',
    },
    {
      key: 'chronologyUpper',
      value: 'chronologyUpper',
      title: 'chronology (upper)',
    },
    {
      key: 'functionalGroup',
      value: 'functionalGroup',
      title: 'functional group',
    },
    {
      key: 'typology',
      value: 'typology',
      title: 'typology',
    },
    {
      key: 'part',
      value: 'part',
      title: 'part',
    },
    {
      key: 'description',
      value: 'description',
      title: 'description',
      sortable: false,
    },
  ],
} as Readonly<StaticResourceConfig>
