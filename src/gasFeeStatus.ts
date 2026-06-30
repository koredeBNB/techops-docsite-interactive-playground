// Mirrors get_gas_fee_status() from
// mock-bsc-app/src/mock_bsc_app/gas_fees.py so the playground can simulate
// the API response entirely client-side (no backend needed for this prototype).
export type GasFeeStatus = {
  network: string
  base_fee_gwei: number
  priority_fee_gwei: number
  estimated_total_fee_gwei: number
  congestion_level: string
  sample_block: number
}

export function getGasFeeStatus(network: string): GasFeeStatus {
  return {
    network: network,
    base_fee_gwei: 3.2,
    priority_fee_gwei: 0.8,
    estimated_total_fee_gwei: 4.0,
    congestion_level: "low",
    sample_block: 39124801,
  }
}