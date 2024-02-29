const fs = require('fs')
const manifestPath = './src/manifest.json'
const chechManifest = fs.existsSync(manifestPath)
if (!chechManifest) fs.writeFileSync(manifestPath, '{}', { flag: 'w' })
