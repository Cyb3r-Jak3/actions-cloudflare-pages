import * as cloudflare from '../src/cloudflare'
import * as config from '../src/config'

test('Failed Token Check', async () => {
  process.env['INPUT_ACCOUNT'] = '1'
  process.env['INPUT_PROJECT'] = 'test'
  process.env['INPUT_GLOBAL_TOKEN'] = '2'
  process.env['INPUT_EMAIL'] = 'cyberjake@pm.me'
  let conf = config.create_config()

  expect(cloudflare.check_auth(conf)).rejects.toThrow(
    'Error when checking token. Request failed with status code 400'
  )
})
