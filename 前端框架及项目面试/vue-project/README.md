npm create vue@3
创建vue3项目
cd vue-project
进入项目目录
npm install
安装相关依赖
npm run dev
启动服务
npm install elementui-plus --save
安装elementui-plus库
npm install echarts --save
安装echarts库
#elementUI使用
```html
<template>
  <el-card class="box-card" shadow="hover">
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
</template>

<script>
import { ElCard } from 'element-plus'

export default ({
  components: {
    ElCard,
  },
  setup() {
    return {
      o: [1,2,3,4]
    }
  },
})
</script>
```