const ci = require('miniprogram-ci')

module.exports = ({ appid = 'wxb2ba91dff6e5755e', robot = 3, desc = '版本更新' } = {}) => {
  const project = new ci.Project({
    appid: appid,
    type: 'miniProgram',
    projectPath: 'dist/build/mp-weixin',
    privateKeyPath: './private.' + appid + '.key'
  })

  ci.upload({
    project,
    version: '1.2.0',
    desc,
    setting: {
      es6: true,
      es7: true,
      minify: true,
      codeProtect: false,
      minifyJS: true,
      minifyWXML: true,
      minifyWXSS: true,
      autoPrefixWXSS: true,
      disableUseStrict: true
    },
    // onProgressUpdate: console.log,
    robot,
    allowIgnoreUnusedFiles: true
  })
}
