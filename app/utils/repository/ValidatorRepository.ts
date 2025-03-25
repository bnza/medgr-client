import AbstractRepository from './AbstractRepository'

class ValidatorRepository extends AbstractRepository {
  validate = async (
    type = 'unique',
    path: string,
    value: string | string[],
  ) => {
    value = Array.isArray(value) ? value.join('/') : value
    return this.$fetch(`/api/validator/${type}/${path}/${value}`).then((r) =>
      Boolean(r),
    )
  }
}

export default ValidatorRepository
