import * as core from '@actions/core'
import {Config} from './config'

export async function check_auth(config: Config): Promise<void> {
  try {
    let resp
    if (config.token_method === 'legacy') {
      resp = await config.instance.get('user')
    } else {
      resp = await config.instance.get('user/tokens/verify')
    }
    if (resp.status === 200) {
      core.info('✔️ Auth is good')
      return
    } else {
      throw new Error(`Checking token returned status code: ${resp.status}`)
    }
  } catch (error) {
    throw new Error(`Error when checking token. ${error.message}`)
  }
}

export async function create_deployment(config: Config): Promise<void> {
  core.debug('Starting deployment')
  let res
  try {
    res = await config.instance.post(
      `accounts/${config.account_id}/pages/projects/${config.project_name}/deployments`
    )
  } catch (error) {
    throw new Error(
      `Error making purge request. ${error.message} ${JSON.stringify(
        error.response.data
      )}`
    )
  }
  if (res.status !== 200) {
    throw new Error(`Purge cache request did not get 200. ${res.data}`)
  } else {
    core.info('Deployment has been created')
  }
}
