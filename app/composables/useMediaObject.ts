import type { ApiResourceMediaObject } from '~~/types'

export function useMediaObject(
  mediaObject: ApiResourceMediaObject,
  apiBaseUrl: string,
) {
  const mediaUrl = apiBaseUrl + mediaObject.contentUrl
  const hasThumbnail = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
  ].includes(mediaObject.mimeType)
  const thumbnail = hasThumbnail
    ? mediaUrl.replace(/\.(\w+)$/, '.thumb.jpeg')
    : ''
  const fileName = mediaObject.originalFilename.replace(/\.(\w+)$/, '')
  const extension = mediaObject.originalFilename.slice(fileName.length + 1)
  const icons: Record<string, string> = {
    'application/vnd.oasis.opendocument.spreadsheet': 'far fa-file-excel',
    'application/vnd.ms-excel': 'far fa-file-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      'far fa-file-excel',
  }
  const icon = icons[mediaObject.mimeType] || 'fa fa-file'

  const iconColors: Record<string, string> = {
    'application/vnd.oasis.opendocument.spreadsheet': 'green-darken-3',
    'application/vnd.ms-excel': 'green-darken-3',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      'green-darken-3',
  }
  const iconColor = iconColors[mediaObject.mimeType] || ''

  return {
    mediaUrl,
    hasThumbnail,
    thumbnail,
    fileName,
    extension,
    icons,
    icon,
    iconColors,
    iconColor,
  }
}
