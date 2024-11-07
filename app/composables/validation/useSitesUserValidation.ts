import type {
  ApiResourceSitesUser,
  ApiResourceStratigraphicUnit,
} from '~~/types'
import { useAsyncValidator } from '~/composables/validation/useAsyncValidator'
import { required } from '~/utils/validations'

export default function <RT extends ApiResourceStratigraphicUnit>(
  item: Partial<ApiResourceSitesUser>,
) {
  const uniqueSitesUser = useAsyncValidator({
    prop: ['site.id', 'user.id'],
    message: 'Duplicate (site, user) pair',
    path: 'sites_users',
    item,
  })

  const rules = {
    site: [validateState<RT>('site', required), uniqueSitesUser],
    user: [validateState<RT>('user', required), uniqueSitesUser],
  }

  return (key: keyof typeof rules) => rules[key]
}
