import * as core from '@actions/core'
import * as cloudflare from './cloudflare'
import {create_config} from './config'

export async function run(): Promise<void> {
  try {
    const config = create_config()
    core.debug('Starting run')
    core.startGroup('Auth Check')
    await cloudflare.check_auth(config)
    core.endGroup()
    await cloudflare.create_deployment(config)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
