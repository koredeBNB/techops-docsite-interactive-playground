import { useState } from 'react'
import { getValidatorStatus } from './validatorStatus'
import './App.css'

const PARAM = 'validator'

function initialValidatorId(): string {
  const fromUrl = new URLSearchParams(window.location.search).get(PARAM)
  return fromUrl?.trim() || 'validator-1'
}

function App() {
  const [validatorId, setValidatorId] = useState(initialValidatorId)
  const [submitted, setSubmitted] = useState(initialValidatorId)
  const [copied, setCopied] = useState(false)

  const id = submitted || 'validator-1'
  const response = getValidatorStatus(id)
  const snippet = `from mock_bsc_app.validators import get_validator_status\n\nstatus = get_validator_status(${JSON.stringify(id)})`
  const responseJson = JSON.stringify(response, null, 2)

  function run() {
    const next = validatorId.trim() || 'validator-1'
    setSubmitted(next)
    setCopied(false)
    // Keep the validator id in the URL so MkDocs pages can deep-link a state.
    const url = new URL(window.location.href)
    url.searchParams.set(PARAM, next)
    window.history.replaceState(null, '', url)
  }

  async function copySnippet() {
    await navigator.clipboard.writeText(snippet)
    setCopied(true)
  }

  return (
    <main>
      <header>
        <h1>Validator Status Playground</h1>
        <p className="lede">
          Try the <code>get_validator_status</code> API from the mock BSC app and
          see the response that the{' '}
          <a
            href="https://github.com/koredeBNB/mock-mkdocs-repo/blob/main/docs/validators.md"
            target="_blank"
            rel="noreferrer"
          >
            Validators guide
          </a>{' '}
          documents.
        </p>
      </header>

      <section className="card">
        <label htmlFor="validator-id">Validator ID</label>
        <div className="row">
          <input
            id="validator-id"
            value={validatorId}
            onChange={(e) => setValidatorId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && run()}
            placeholder="validator-1"
            spellCheck={false}
          />
          <button type="button" onClick={run}>
            Run request
          </button>
        </div>
      </section>

      <section className="card">
        <div className="card-head">
          <h2>Python</h2>
          <button type="button" className="ghost" onClick={copySnippet}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre>
          <code>{snippet}</code>
        </pre>
      </section>

      <section className="card">
        <h2>Response</h2>
        <pre>
          <code>{responseJson}</code>
        </pre>
      </section>

      <footer>
        Each field above maps to a bullet in the Validators guide. When a field
        is added or changed in the source API, the docs (and this playground)
        should be updated to match.
      </footer>
    </main>
  )
}

export default App
