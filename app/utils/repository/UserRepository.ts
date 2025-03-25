import ResourceRepository from './ResourceRepository'
import type { ApiResourceUser } from '~~/types'

class UserRepository extends ResourceRepository<ApiResourceUser> {
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
