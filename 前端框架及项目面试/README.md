<!-- TOC -->

- [前端框架及项目面试](#前端框架及项目面试)
  - [VUE的使用](#vue的使用)
    - [VUE基础知识](#vue基础知识)
  - [VUE原理](#vue原理)
  - [VUE面试真题](#vue面试真题)
  - [VUE3](#vue3)
  - [REACT的使用](#react的使用)
  - [REACT原理](#react原理)
  - [REACT面试真题](#react面试真题)
  - [webpack和babel](#webpack和babel)
  - [项目设计](#项目设计)
  - [项目流程](#项目流程)
  - [REACT hooks](#react-hooks)

<!-- /TOC -->
# 前端框架及项目面试
## VUE的使用
### VUE基础知识
- 指令、插值
  - computed和watch
    - computed:计算data中的变量，并将结果赋值给computed中定义的变量。
    - watch:监听data中变量的改变，改变就有输出，不改变就无输出。
    - computed有缓存，data不变则不会重新计算
    - watch如何深度监听(对象多层级)？
      - deep: true
    - watch监听引用类型，因为指针指向同一地址，oldVal和newVal相同，所以也就拿不到oldVal
  - class和style
    - 使用动态属性
      - :class="..."
      - :style="..."
- 条件渲染
  - v-if和v-show的区别？
    - v-if：条件为假，则不会在DOM结构中渲染
    - v-show：条件成真与否都会在DOM结构中渲染，通过添加属性display：none来控制显示与否
- 循环渲染
  - v-for
    - key：一定要使用，不能乱用，如：index或random
    - v-for和v-if不能（不建议）一起使用，因为v-for的优先级比v-if高，会导致循环多次后，多次判断
- 绑定事件  @或v-on：
  - $event：在绑定事件监听的函数中，通过传入参数$event来传递。如： @change="hangleChange('2', $event)"
  - event是原生的
  - 事件被挂载到当前元素
- 事件修饰符
  - .stop 阻止事件冒泡
  - .prevent 阻止默认行为
  - .capture 事件捕获
  - .self 自身触发
  - .once 只触发一次
  - self和stop的区别？
    - self 是阻止自身不执行冒泡触发，不会阻止冒泡继续向外触发；所以self 一般用在父元素上。
    - stop 是从自身开始阻止冒泡不向外触发，stop 一般用在子元素上。
- 表单  v-model
  - 常见表单项
    - 多行文本
    - 复选框：单一的复选框，绑定布尔类型值
    - 单选框
    - 下拉选项
  - 表单修饰符
    - v-model.lazy:光标离开标签时，才会将值赋给value
    - v-model.trim:过滤用户输入的首尾空格
    - v-model.number:自动将用户的输入值转化为数字类型
## VUE原理

## VUE面试真题

## VUE3

## REACT的使用

## REACT原理

## REACT面试真题

## webpack和babel

## 项目设计

## 项目流程

## REACT hooks