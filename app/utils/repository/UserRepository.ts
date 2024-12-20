import ResourceRepository from './ResourceRepository'
import type { ApiResourceUser } from '~~/types'
import type { $Fetch } from 'nitropack'

class UserRepository extends ResourceRepository<ApiResourceUser> {
  constructor(baseUrl: string, $fetch: $Fetch) {
    super(baseUrl, $fetch)
  }
  async changeUserPassword(body: Record<string, string>) {
    return this.$fetch('/api/users/me/change-password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    })
  }
}

export default UserRepository
