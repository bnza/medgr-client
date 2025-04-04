export default function () {
  const { showError, showSuccess } = useAppSnackbarStore()
  return function (value: string) {
    {
      if (!navigator.clipboard) {
        showError("Browser don't have support for native clipboard.")
        return
      }
      navigator.clipboard
        .writeText(value)
        .then(() => {
          showSuccess('Copied!')
        })
        .catch((error) => {
          showError(
            `Your browser doesn't support copy to clipboard command. Please do it manually. ${error.message}`,
          )
        })
    }
  }
}
