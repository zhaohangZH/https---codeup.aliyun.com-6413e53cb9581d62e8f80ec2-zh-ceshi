import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

const fs = require('fs')

const manifestPath = 'manifest.json'
let Manifest = fs.readFileSync(manifestPath, { encoding: 'utf-8' })
function replaceManifest(path, value) {
  const arr = path.split('.')
  const len = arr.length
  const lastItem = arr[len - 1]

  let i = 0
  let ManifestArr = Manifest.split(/\n/)

  for (let index = 0; index < ManifestArr.length; index++) {
    const item = ManifestArr[index]
    if (new RegExp(`"${arr[i]}"`).test(item)) ++i
    if (i === len) {
      const hasComma = /,/.test(item)
      ManifestArr[index] = item.replace(
        new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`),
        `"${lastItem}": ${value}${hasComma ? ',' : ''}`
      )
      break
    }
  }

  Manifest = ManifestArr.join('\n')
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  replaceManifest('mp-weixin.appid', `"${env.VITE_VUE_APP_APPID}"`)
  fs.writeFileSync(`./src/${manifestPath}`, Manifest, { flag: 'w' })

  return {
    plugins: [uni()]
    // build: {
    //   minify: 'terser',
    //   terserOptions: {
    //     ecma: 5,
    //     compress: {
    //       keep_infinity: true,
    //       drop_console: true,
    //       drop_debugger: true
    //     }
    //   }
    // }
  }
})
