### h5或小程序无感知刷新token

#### h5   
1. 把用户的账号密码保存在缓存里，从缓存中读取账号密码获取token

2. access_token和refresh_token双令牌
如果access_token过期，用refresh_token重新获取access_token。
如果refresh_token也过期的情况下，每次获取access_token,同时刷新refresh_token,解决refresh_token过期时间

### 小程序
1. 小程序启动时，验证令牌是否合法，合法不做任何处理，不合法发放新的令牌

2. 正常情况下，正常携带令牌。令牌无效，返回code值进行判断处理，重新获取令牌，接口请求进行二次重发
