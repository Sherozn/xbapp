// 域名，通过域名来找到服务器，在这里我们将本地电脑当成服务器
// 所以现在配置的域名是本地的，当项目实际上线，这里需要换成实际的已备案的域名
const host = 'http://lgshuolicai.com:3303'
// const host = 'http://localhost:3303'
const appid = 'wxb44fa1b82a595928'

const config = {
  host,
  appid:{
  	"xly": {
        token: 'xznggdx',
        appid: 'wxb44fa1b82a595928',
        secret: 'b1040503e5cff79921c1a00cf6bbda98',
        encodingAESKey: '0ufXMXYkXlXx6QPznAygYp7YR1TCCTuJZsoEfKrWAoF',
        serverUrl: 'http://lgshuolicai.com/'
    },
    "test": {
        token: 'xznggdx',
        appid: 'wx8128ba79f71cdcbb',
        secret: '0f88bd96ee80773941881ade9affcc05',
        encodingAESKey: '0ufXMXYkXlXx6QPznAygYp7YR1TCCTuJZsoEfKrWAoF',
        serverUrl: 'http://lgshuolicai.com/'
    }
  }
}

export default config
