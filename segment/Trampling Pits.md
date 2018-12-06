# 踩过的坑 Trampling Pits

### 小程序
* import 不能使用绝对路径，只能使用相对路径。但components内可以。如import { config } from '../config.js'
* thirdScriptError: code.startsWith is not a function，(定位代码，查看文档是否支持ES6)，说明code不是字符串，先用toString()处理下。如果是报undefied，说明code不存在。