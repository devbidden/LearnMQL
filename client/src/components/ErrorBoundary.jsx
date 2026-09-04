import { Component } from 'react'
import StatusPage from './ui/StatusPage'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('App error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-page text-fg">
          <StatusPage
            code="Error"
            title="Something went wrong"
            message={this.state.error.message || 'The app hit an unexpected error. Reload the page to continue.'}
            primaryTo="/"
            primaryLabel="Back home"
            onRetry={() => {
              this.setState({ error: null })
              window.location.reload()
            }}
            useAnchors
          />
        </div>
      )
    }

    return this.props.children
  }
}
