import { useState } from 'react'
import { getValidatorStatus } from './validatorStatus'
import { getGasFeeStatus } from './gasFeeStatus'
import { getBlockSyncStatus } from './blockSyncStatus'
import './App.css'

const VALIDATOR_PARAM = 'validator'
const NETWORK_PARAM = 'network'

type Tab = 'validator' | 'gas' | 'blocksync'

function initialValidatorId(): string {
  const fromUrl = new URLSearchParams(window.location.search).get(VALIDATOR_PARAM)
  return fromUrl?.trim() || 'validator-1'
}

function initialNetwork(): string {
  const fromUrl = new URLSearchParams(window.location.search).get(NETWORK_PARAM)
  return fromUrl?.trim() || 'bnb-smart-chain'
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('validator')
  const [validatorId, setValidatorId] = useState(initialValidatorId)
  const [submittedValidator, setSubmittedValidator] = useState(initialValidatorId)
  const [network, setNetwork] = useState(initialNetwork)
  const [submittedNetwork, setSubmittedNetwork] = useState(initialNetwork)
  const [blockNetwork, setBlockNetwork] = useState(initialNetwork)
  const [submittedBlockNetwork, setSubmittedBlockNetwork] = useState(initialNetwork)
  const [copied, setCopied] = useState(false)

  const validator = submittedValidator || 'validator-1'
  const currentNetwork = submittedNetwork || 'bnb-smart-chain'
  const currentBlockNetwork = submittedBlockNetwork || 'bnb-smart-chain'

  const validatorResponse = getValidatorStatus(validator)
  const gasResponse = getGasFeeStatus(currentNetwork)
  const blockSyncResponse = getBlockSyncStatus(currentBlockNetwork)

  const validatorSnippet = `from mock_bsc_app.validators import get_validator_status\n\nstatus = get_validator_status(${JSON.stringify(validator)})`
  const gasSnippet = `from mock_bsc_app.gas_fees import get_gas_fee_status\n\nstatus = get_gas_fee_status(${JSON.stringify(currentNetwork)})`
  const blockSyncSnippet = `from mock_bsc_app.block_sync import get_block_sync_status\n\nstatus = get_block_sync_status(${JSON.stringify(currentBlockNetwork)})`

  const snippet = activeTab === 'validator' ? validatorSnippet : activeTab === 'gas' ? gasSnippet : blockSyncSnippet
  const responseJson = activeTab === 'validator'
    ? JSON.stringify(validatorResponse, null, 2)
    : activeTab === 'gas'
    ? JSON.stringify(gasResponse, null, 2)
    : JSON.stringify(blockSyncResponse, null, 2)

  function runValidator() {
    const next = validatorId.trim() || 'validator-1'
    setSubmittedValidator(next)
    setCopied(false)
    const url = new URL(window.location.href)
    url.searchParams.set(VALIDATOR_PARAM, next)
    window.history.replaceState(null, '', url)
  }

  function runGas() {
    const next = network.trim() || 'bnb-smart-chain'
    setSubmittedNetwork(next)
    setCopied(false)
    const url = new URL(window.location.href)
    url.searchParams.set(NETWORK_PARAM, next)
    window.history.replaceState(null, '', url)
  }

  function runBlockSync() {
    const next = blockNetwork.trim() || 'bnb-smart-chain'
    setSubmittedBlockNetwork(next)
    setCopied(false)
    const url = new URL(window.location.href)
    url.searchParams.set(NETWORK_PARAM, next)
    window.history.replaceState(null, '', url)
  }

  async function copySnippet() {
    await navigator.clipboard.writeText(snippet)
    setCopied(true)
  }

  return (
    <main>
      <header>
        <h1>Mock BSC API Playground</h1>
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

      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'validator' ? 'active' : ''}`}
          onClick={() => setActiveTab('validator')}
        >
          Validator Status
        </button>
        <button
          className={`tab-button ${activeTab === 'gas' ? 'active' : ''}`}
          onClick={() => setActiveTab('gas')}
        >
          Gas Fee Status
        </button>
        <button
          className={`tab-button ${activeTab === 'blocksync' ? 'active' : ''}`}
          onClick={() => setActiveTab('blocksync')}
        >
          Block Sync Status
        </button>
      </div>

      {activeTab === 'validator' ? (
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
      ) : activeTab === 'gas' ? (
        <section className="card">
          <label htmlFor="network">Network</label>
          <div className="row">
            <input
              id="network"
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && runGas()}
              placeholder="bnb-smart-chain"
              spellCheck={false}
            />
            <button type="button" onClick={runGas}>
              Run request
            </button>
          </div>
        </section>
      ) : (
        <section className="card">
          <label htmlFor="block-network">Network</label>
          <div className="row">
            <input
              id="block-network"
              value={blockNetwork}
              onChange={(e) => setBlockNetwork(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && runBlockSync()}
              placeholder="bnb-smart-chain"
              spellCheck={false}
            />
            <button type="button" onClick={runBlockSync}>
              Run request
            </button>
          </div>
        </section>
      )}

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
        Each field above maps to a bullet in the documentation. When a field
        is added or changed in the source API, the docs (and this playground)
        should be updated to match.
      </footer>
    </main>
  )
}

export default App
