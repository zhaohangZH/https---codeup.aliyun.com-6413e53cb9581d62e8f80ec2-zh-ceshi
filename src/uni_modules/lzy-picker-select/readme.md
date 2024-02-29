# 可搜索的滚动选择框
> **组件名：lzy-picker-select**
> 代码块： `pickerSelect`

引用插件后,可以在弹出的选择框中进行查询

### 基本用法 

- 对 `list` 属性赋值，{Array} 可以进行数据渲染
- 设置 `node` 属性，{String} 可以指定集合中的对象属性进行渲染
- 设置 `valueTxt` 属性，{String} 可以显示默认数据
- 设置 `custom` 属性，{Boolean} 是否可自定义结果值

```html
<picker-select style="width:100%;" v-model="赋值" :list="集合数据(必填)" node="指定属性" placeholder=""></picker-select>
			 
```
### 事件

事件称名			|说明									|返回参数			
:-:				|:-:									|:-:				
change			|点击切换 属性 时触发						| value	(选中元素对象)		

	

