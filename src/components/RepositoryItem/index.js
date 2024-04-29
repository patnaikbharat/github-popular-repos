import './index.css'

const RepositoryItem = props => {
  const {dataDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = dataDetails

  return (
    <li className="repo-card">
      <img src={avatarUrl} className="repo-image" alt={name} />
      <h1 className="repo-name">{name}</h1>
      <div className="flex-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="icon"
          alt="stars"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="flex-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="icon"
          alt="forks"
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="flex-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="icon"
          alt="open issues"
        />
        <p className="count">{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
