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
  fee_trend: string
}

export function getGasFeeStatus(network: string): GasFeeStatus {
  return {
    network: network,
    base_fee_gwei: 3.5,
    priority_fee_gwei: 1.1,
    estimated_total_fee_gwei: 4.6,
    congestion_level: "medium",
    sample_block: 39126000,
    fee_trend: "rising",
  }
}
