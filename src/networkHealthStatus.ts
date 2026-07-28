// Mirrors get_network_health() from
// mock-bsc-app/src/mock_bsc_app/network_health.py so the playground can simulate
// the API response entirely client-side (no backend needed for this prototype).
export type NetworkHealthStatus = {
  network: string
  status: string
  peer_count: number
  rpc_latency_ms: number
  latest_block: number
}

export function getNetworkHealth(network: string): NetworkHealthStatus {
  return {
    network: network,
    status: 'healthy',
    peer_count: 64,
    rpc_latency_ms: 42,
    latest_block: 39126100,
  }
}
