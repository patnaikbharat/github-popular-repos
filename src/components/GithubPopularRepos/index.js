import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const constantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    selectedLanguageId: languageFiltersData[0].id,
    status: constantStatus.initial,
    repoList: [],
  }

  componentDidMount() {
    this.getRepoItems()
  }

  getRepoItems = async () => {
    const {selectedLanguageId} = this.state
    this.setState({status: constantStatus.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${selectedLanguageId}`
    console.log(url)
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        issuesCount: eachData.issues_count,
        forksCount: eachData.forks_count,
        starsCount: eachData.stars_count,
        avatarUrl: eachData.avatar_url,
      }))
      this.setState({status: constantStatus.success, repoList: updatedData})
    } else {
      this.setState({status: constantStatus.failure})
    }
  }

  onClickLanguage = uniqueId => {
    this.setState({selectedLanguageId: uniqueId}, this.getRepoItems)
  }

  onSuccess = () => {
    const {repoList} = this.state
    return (
      <ul className="repo-container">
        {repoList.map(eachData => (
          <RepositoryItem key={eachData.id} dataDetails={eachData} />
        ))}
      </ul>
    )
  }

  onLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  onFailure = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-image"
        alt="failure view"
      />
      <p className="failure-text">Something Went Wrong</p>
    </>
  )

  renderRepository = () => {
    const {status} = this.state

    switch (status) {
      case constantStatus.success:
        return this.onSuccess()
      case constantStatus.inProgress:
        return this.onLoading()
      case constantStatus.failure:
        return this.onFailure()
      default:
        return null
    }
  }

  render() {
    const {selectedLanguageId} = this.state

    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        <ul className="language-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              languageDetails={eachLanguage}
              isActive={eachLanguage.id === selectedLanguageId}
              onClickLanguage={this.onClickLanguage}
            />
          ))}
        </ul>
        {this.renderRepository()}
      </div>
    )
  }
}

export default GithubPopularRepos
