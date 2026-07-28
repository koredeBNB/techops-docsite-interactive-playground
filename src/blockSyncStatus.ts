// Mirrors get_block_sync_status() from
// mock-bsc-app/src/mock_bsc_app/block_sync.py so the playground can simulate
// the API response entirely client-side (no backend needed for this prototype).
export type BlockSyncStatus = {
  network: string
  latest_block: number
  sync_lag_blocks: number
  is_syncing: boolean
  sync_mode: string
  checkpoint_verification: boolean
}

export function getBlockSyncStatus(network: string): BlockSyncStatus {
  return {
    network: network,
    latest_block: 39124800,
    sync_lag_blocks: 80,
    is_syncing: false,
    sync_mode: 'full',
    checkpoint_verification: true,
  }
}
