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
- Vue组件使用
  - props和$emit
    - props：父组件向子组件传递所需变量信息
    - $emit：子组件向父组件触发绑定事件
  - 组件间通讯-自定义事件
    - 自定义组件使用event.$emit实现的是任意组件通讯,父子组件通讯使用this.$emit
    - 定义绑定事件：event.$on
    - 调用触发事件：event.$emit能够实现组件间通讯
    - 销毁触发事件event.$off:自定义事件需要在beforeDestroy中及时销毁,防止内存泄漏
  - 组件生命周期
    - 挂载阶段
      - beforeCreate：执行时，data和methods中的数据都还没有初始化
      - created：data和methods都已经初始化好了,此函数可以操作data数据和methods方法
      - beforeMount：此函数执行的时候，模板已经在内存中编译好了，但是尚未挂载到页面中去，此时，页面还是旧页面
      - mounted：经将编译好的模板，挂载到了页面指定的容器中显示
    - 更新阶段
      - beforeUpdate：状态更新之前执行此函数， 此时 data 中的状态值是最新的，但是界面上显示的 数据还是旧的，因为此时还没有开始重新渲染DOM节点
      - updated：实例更新完毕之后调用此函数，此时 data 中的状态值 和 界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了！
    - 销毁阶段
      - beforeDestory：实例销毁之前调用。在这一步，实例仍然完全可用。
      - destoryed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
- Vue高级特性
  - 自定义v-model
    - 在自定义组件内用model选项来指定prop和event，
    - 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件
    ```html
    <input :value="text" @input="$emit('input', $event.target.value)" />
    ```
    ```jsx
    model: {
      prop: 'text', //对应 props text
      event: 'change' //对应@input
    }
    props:{
      text: String,
      default() {
        return ''
      }
    }
    ```
  - $nextTick
    - Vue是异步渲染
    - data改变后，DOM不会立刻渲染
    - $nextTick会在DOM渲染后被触发，以获得最新的DOM节点
  - refs
    - 如何获取 dom?
      - ref="domName" 用法：this.$refs.domName
  - slot插槽
    - 基本使用
      - 父组件向子组件中插入子节点
      ```html
      <SlotDemo>{{子节点}}</SlotDemo>
      ```
      - 子组件在模版中使用
      ```html
      <slot></slot>
      ```
    - 作用域插槽
      - 子组件向父组件传递自身data属性
      ```html
      <slot :slotData="data"></slot>
      ```
      - 父组件在子组件中通过v-slot属性接受data并使用
      ```html
      <SlotDemo>
        <template v-slot="slotProps">
          {{slotProps.slotData}}
        </template>
      </SlotDemo>
      ```
    - 具名插槽
      - 需要使用多个slot插槽时，通过设置name属性来使用指定插槽
      - 父组件使用
      ```html
      <SlotDemo>
        <template v-slot:slotname>
          {{插槽内容}}
        </template>
      </SlotDemo>
      ```
      - 子组件接收
      ```html
      <slot name="slotname"></slot>
      ```
  - 动态组件
    - 父组件想要动态的切换使用子组件时使用component
    - 切换的组件不会被缓存，通常配合keep-alive来使用
    ```html
    <div v-for="(item, index) of arr" :key="index">
      <component :is="item" />
    </div>
    ```
    ```jsx
    import text from 'xxx/text'
    import image from 'xxx/image'
    data() {
      return {
        arr: ['text', 'image'] // 根据数据的值进行不同组件不同顺序渲染
      }
    }
    ```
  - 异步组件
    - import（）函数
    ```jsx
    components: {
      compName: ()=>import('./compName.vue')
    }
    ```
    - 按需加载，异步加载大型组件
  - keep-alive缓存
    - 在keep-alive中的组件不会被销毁
  - mixin
    - 多个组件有相同逻辑的时候，抽离出一个mixin.js
    - 在组件中使用mixin：[mixin]
    - mixin并不是完美的解决方案，会有问题
      - 变量来源不明确，不利于阅读。
      - 多mixin可能会造成命名冲突。
      - 多mixin和组件可能会出现多对多的关系，复杂度较高。
    - Vue3提出的Composition API旨在解决这些问题
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