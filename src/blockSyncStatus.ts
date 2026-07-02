// Mirrors get_block_sync_status() from
// mock-bsc-app/src/mock_bsc_app/block_sync.py so the playground can simulate
// the API response entirely client-side (no backend needed for this prototype).
export type BlockSyncStatus = {
  network: string
  latest_block: number
  safe_block: number
  finalized_block: number
  sync_lag_blocks: number
  is_syncing: boolean
}

export function getBlockSyncStatus(network: string): BlockSyncStatus {
  return {
    network: network,
    latest_block: 39126000,
    safe_block: 39125920,
    finalized_block: 39125810,
    sync_lag_blocks: 80,
    is_syncing: false,
  }
}
