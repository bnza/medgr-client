import type { StaticResourceConfig } from '~~/types/api'

export default {
  appPath: '/jobs/imported_files',
  labels: ['Imported File', 'Imported Files'],
  protectedFields: [],
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
      key: 'userId',
      value: 'userId',
      title: 'user',
      width: '200',
    },
    {
      key: 'service',
      value: 'service',
      title: 'service',
    },
    {
      key: 'mediaObject.originalFilename',
      value: 'mediaObject.originalFilename',
      title: 'file name',
    },
    {
      key: 'mediaObject.mimeType',
      value: 'mediaObject.mimeType',
      title: 'type',
    },
    {
      key: 'uploadDate',
      value: 'uploadDate',
      title: 'upload date',
    },
  ],
} as Readonly<StaticResourceConfig>
