const AWS = require('aws-sdk')
const QR = require('qrcode')
AWS.config = require

const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'ap-southeast-1' })

const main = async (event) => {
    console.log('Event:', event)
    return getQRCode(event.AccessToken)
}

const getQRCode = async (AccessToken) =>
  await new Promise((resolve, reject) => {
    cognito.associateSoftwareToken(
      {
        AccessToken,
      },
      (err, result) => {
        if (err) {
          reject(err)
        } else {
          const name = 'ducvo'
          const uri = `otpauth://totp/${decodeURI(name)}?secret=${
            result.SecretCode
          }`

          QR.toDataURL(uri, (err, result) => {
            if (err) reject(err)
            else resolve(result)
          })
          resolve(result)
        }
      }
    )
  })

exports.handler = main