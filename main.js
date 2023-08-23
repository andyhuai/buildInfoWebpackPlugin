
/**
 * 获取git信息
 * @returns {{commitMessage: *, buildTime: Date, commitAuthor: *, branch: *, hash: *, commitDate}}
 */
function gitVersion() {
  try {
    const execSync = require('child_process').execSync
    const dayjs = require('dayjs')
    const vName = execSync('git name-rev --name-only HEAD').toString().trim()
    const commitHash = execSync('git show -s --format=%H').toString().trim()
    const name = execSync('git show -s --format=%cn').toString().trim()
    const date = dayjs(execSync('git show -s --format=%cd').toString()).format('YYYY-MM-DD HH:mm:ss')
    const message = execSync('git show -s --format=%s').toString().trim()
    const buildUserName = execSync('git config user.name').toString().trim()
    const buildUserEmail = execSync('git config user.email').toString().trim()
    const gitUrl = execSync('git config --get remote.origin.url').toString().trim()
    return {
      gitUrl: gitUrl,
      branch: vName,
      commitHash: commitHash,
      commitAuthor: name,
      commitTime: date,
      commitMessage: message,
      buildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      buildUserName: buildUserName,
      buildUserEmail: buildUserEmail
    }
  } catch (e) {
    return {
      error: '获取git信息错误',
      message: e && e.message || ''
    }
  }
}

// const fs = require('fs')

class PackInfoWebpackPlugin {
  apply(compiler) {
    // const outPath = compiler.options.output.path
    // compiler.hooks.done.tap('BuildVersionPlugin', compilation => {
    //   const version = gitVersion()
    //   fs.writeFileSync(outPath + '/gitInfo.json', JSON.stringify(version))
    // })
    compiler.hooks.emit.tapAsync('BuildVersionPlugin', (compilation, cb) => {
      const version = JSON.stringify(gitVersion())
      compilation.assets['buildInfo.json'] = {
        source: function() {
          return version
        },
        size: function() {
          return version.length
        }
      }
      cb()
    })
  }
}

module.exports = PackInfoWebpackPlugin