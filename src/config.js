// 域名，通过域名来找到服务器，在这里我们将本地电脑当成服务器
// 所以现在配置的域名是本地的，当项目实际上线，这里需要换成实际的已备案的域名
const host = 'http://lgshuolicai.com'

const config = {
  host
}

// 我们在【ES6知识点详解】中讲过export的意思是向外暴露接口
// 这样在其他文件中可以通过import config from '@/config'引用
// 然后通过config.loginUrl就能得到在本文件中配置的值'http://localhost:5757/weapp/login'
export default config
