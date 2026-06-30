import { useState } from 'react'
import { getValidatorStatus } from './validatorStatus'
import { getGasFeeStatus } from './gasFeeStatus'
import './App.css'

const PARAM_VALIDATOR = 'validator'
const PARAM_GAS_FEE = 'gas-fee'

function initialValidatorId(): string {
  const fromUrl = new URLSearchParams(window.location.search).get(PARAM_VALIDATOR)
  return fromUrl?.trim() || 'validator-1'
}

function initialNetwork(): string {
  const fromUrl = new URLSearchParams(window.location.search).get(PARAM_GAS_FEE)
  return fromUrl?.trim() || 'bnb-smart-chain'
}

type Tab = 'validator' | 'gas-fee'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('validator')
  const [validatorId, setValidatorId] = useState(initialValidatorId)
  const [submittedValidator, setSubmittedValidator] = useState(initialValidatorId)
  const [network, setNetwork] = useState(initialNetwork)
  const [submittedNetwork, setSubmittedNetwork] = useState(initialNetwork)
  const [copied, setCopied] = useState(false)

  const validator = submittedValidator || 'validator-1'
  const validatorResponse = getValidatorStatus(validator)
  const validatorSnippet = `from mock_bsc_app.validators import get_validator_status\n\nstatus = get_validator_status(${JSON.stringify(validator)})`
  const validatorJson = JSON.stringify(validatorResponse, null, 2)

  const gasFeeNetwork = submittedNetwork || 'bnb-smart-chain'
  const gasFeeResponse = getGasFeeStatus(gasFeeNetwork)
  const gasFeeSnippet = `from mock_bsc_app.gas_fees import get_gas_fee_status\n\nstatus = get_gas_fee_status(${JSON.stringify(gasFeeNetwork)})`
  const gasFeeJson = JSON.stringify(gasFeeResponse, null, 2)

  function runValidator() {
    const next = validatorId.trim() || 'validator-1'
    setSubmittedValidator(next)
    setCopied(false)
    const url = new URL(window.location.href)
    url.searchParams.set(PARAM_VALIDATOR, next)
    window.history.replaceState(null, '', url)
  }

  function runGasFee() {
    const next = network.trim() || 'bnb-smart-chain'
    setSubmittedNetwork(next)
    setCopied(false)
    const url = new URL(window.location.href)
    url.searchParams.set(PARAM_GAS_FEE, next)
    window.history.replaceState(null, '', url)
  }

  async function copySnippet() {
    const snippet = activeTab === 'validator' ? validatorSnippet : gasFeeSnippet
    await navigator.clipboard.writeText(snippet)
    setCopied(true)
  }

  return (
    <main>
      <header>
        <h1>Mock BSC App Playground</h1>
        <p className="lede">
          Try the mock BSC app APIs and see the responses that the{' '}
          <a
            href="https://github.com/koredeBNB/mock-mkdocs-repo/blob/main/docs/"
            target="_blank"
            rel="noreferrer"
          >
            documentation
          </a>{' '}
          describes.
        </p>
      </header>

      <div className="tab-row">
        <button
          type="button"
          className={`tab ${activeTab === 'validator' ? 'active' : ''}`}
          onClick={() => setActiveTab('validator')}
        >
          Validator Status
        </button>
        <button
          type="button"
          className={`tab ${activeTab === 'gas-fee' ? 'active' : ''}`}
          onClick={() => setActiveTab('gas-fee')}
        >
          Gas Fee Status
        </button>
      </div>

      {activeTab === 'validator' ? (
        <>
          <section className="card">
            <label htmlFor="validator-id">Validator ID</label>
            <div className="row">
              <input
                id="validator-id"
                value={validatorId}
                onChange={(e) => setValidatorId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && runValidator()}
                placeholder="validator-1"
                spellCheck={false}
              />
              <button type="button" onClick={runValidator}>
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
              <code>{validatorSnippet}</code>
            </pre>
          </section>

          <section className="card">
            <h2>Response</h2>
            <pre>
              <code>{validatorJson}</code>
            </pre>
          </section>

          <footer>
            Each field above maps to a bullet in the Validators guide. When a field
            is added or changed in the source API, the docs (and this playground)
            should be updated to match.
          </footer>
        </>
      ) : (
        <>
          <section className="card">
            <label htmlFor="network">Network</label>
            <div className="row">
              <input
                id="network"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && runGasFee()}
                placeholder="bnb-smart-chain"
                spellCheck={false}
              />
              <button type="button" onClick={runGasFee}>
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
              <code>{gasFeeSnippet}</code>
            </pre>
          </section>

          <section className="card">
            <h2>Response</h2>
            <pre>
              <code>{gasFeeJson}</code>
            </pre>
          </section>

          <footer>
            Each field above maps to a bullet in the Gas Fees guide. When a field
            is added or changed in the source API, the docs (and this playground)
            should be updated to match.
          </footer>
        </>
      )}
    </main>
  )
}

export default App
