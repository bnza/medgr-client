import { describe, it, expect } from 'vitest'
import generatePassword from '~/utils/generatePassword'

describe('generatePassword', () => {
  it('generates unique identifiable keys', () => {
    const password = generatePassword()
    expect(password.length).toBe(10)
  })
})
