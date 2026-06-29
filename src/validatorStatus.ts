// Mirrors get_validator_status() from
// mock-bsc-app/src/mock_bsc_app/validators.py so the playground can simulate
// the API response entirely client-side (no backend needed for this prototype).
export type ValidatorStatus = {
  validator_id: string
  status: string
  commission_rate: number
  voting_power: number
  delegator_count: number
  uptime_percent: number
  jailed_bnb: boolean
  slashable: boolean
  reward_rate: number
}

export function getValidatorStatus(validatorId: string): ValidatorStatus {
  return {
    validator_id: validatorId,
    status: 'active',
    commission_rate: 0.05,
    voting_power: 1000,
    delegator_count: 25,
    uptime_percent: 99.9,
    jailed_bnb: false,
    slashable: false,
    reward_rate: 0.12,
  }
}
