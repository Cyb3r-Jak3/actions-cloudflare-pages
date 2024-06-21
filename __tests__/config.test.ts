import * as config from '../src/config'



describe('Config', () => {

test('No Auth', async () => {
  expect(() => config.create_config()).toThrow(
    'Need to have either an api_token or global_token with email set'
  )
})

test('Half Legacy Auth', async () => {
  process.env['INPUT_GLOBAL_TOKEN'] = '4'
  expect(() => config.create_config()).toThrow(
    'Need email set when using global token'
  )
})

test('Legacy Auth', async () => {
  process.env['INPUT_ACCOUNT'] = '1'
  process.env['INPUT_PROJECT'] = 'test'
  process.env['INPUT_GLOBAL_TOKEN'] = '2'
  process.env['INPUT_EMAIL'] = 'cyberjake@pm.me'
  let conf = config.create_config()
  expect(conf.token_method).toEqual('legacy')
  expect(conf.instance.defaults.headers['X-Auth-Key']).toEqual('2')
  expect(conf.instance.defaults.headers['X-Auth-Email']).toEqual(
    'cyberjake@pm.me'
  )
  expect(conf.project_name).toEqual('test')
  expect(conf.account_id).toEqual('1')
})
})