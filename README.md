// 模板引擎部分
HTML直接渲染数据 使用一个js数据渲染模板。
dist文件夹中的template是必须有的模板引擎的JS，
用$.getJSON 读取 后台传过来的json串，以我demo中的例子的形式，将这些json以script形式直接插入到html中


//类库选择部分
我们基础类库选择用JQ 一些常用api可以上网搜索

//编码规范
编码时，注意要面向对象编程。具体的简单例子在js/baselib.js中，尽量避免设置太多全局变量，不要直接用function定义函数

注意，我这边由于跨域问题，用node做的服务器，所以你在看demo的时候 直接看webapp内的内容，不用管其他的。。