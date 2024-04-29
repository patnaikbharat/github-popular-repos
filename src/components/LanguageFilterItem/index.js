import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isActive, onClickLanguage} = props
  const {id, language} = languageDetails
  const style = isActive ? 'language-name selected' : 'language-name'

  const onClickLanguageButton = () => {
    onClickLanguage(id)
  }

  return (
    <button
      className="language-button"
      type="button"
      onClick={onClickLanguageButton}
    >
      <li className={style}>{language}</li>
    </button>
  )
}

export default LanguageFilterItem
