import * as core from '@actions/core'
import axios from 'axios'
import type {AxiosInstance} from 'axios'

export interface Config {
  token_method: string
  account_id: string
  project_name: string
  instance: AxiosInstance
}

export function create_config(): Config {
  let api_method
  if (core.getInput('api_token') !== '') {
    api_method = 'token'
  } else if (core.getInput('global_token') !== '') {
    if (core.getInput('email') === '') {
      throw new Error('Need email set when using global token')
    }
    api_method = 'legacy'
  } else {
    throw new Error(
      'Need to have either an api_token or global_token with email set'
    )
  }
  let request_instance
  if (api_method === 'token') {
    request_instance = axios.create({
      baseURL: 'https://api.cloudflare.com/client/v4/',
      headers: {Authorization: `Bearer ${core.getInput('api_token')}`}
    })
  } else {
    request_instance = axios.create({
      baseURL: 'https://api.cloudflare.com/client/v4/',
      headers: {
        'X-Auth-Key': core.getInput('global_token'),
        'X-Auth-Email': core.getInput('email')
      }
    })
  }
  return {
    account_id: core.getInput('account', {required: true}),
    project_name: core.getInput('project', {required: true}),
    token_method: api_method,
    instance: request_instance
  }
}
