<!-- TOC -->

- [前端框架及项目面试](#前端框架及项目面试)
  - [VUE的使用](#vue的使用)
    - [VUE基础知识](#vue基础知识)
    - [Vue高级特性](#vue高级特性)
    - [Vuex](#vuex)
    - [vue-router](#vue-router)
  - [VUE原理](#vue原理)
    - [组件化](#组件化)
    - [响应式](#响应式)
    - [vdom和diff](#vdom和diff)
    - [模版编译](#模版编译)
    - [渲染过程](#渲染过程)
    - [前端路由](#前端路由)
  - [VUE总结](#vue总结)
  - [VUE面试真题](#vue面试真题)
  - [VUE3](#vue3)
    - [Vue3升级了那些重要功能](#vue3升级了那些重要功能)
    - [如何理解ref toRef和toRefs](#如何理解ref-toref和torefs)
      - [vue3为什么会存在reactive和ref？](#vue3为什么会存在reactive和ref)
      - [Vue3 ref是否可以替代reactive？](#vue3-ref是否可以替代reactive)
    - [Composition API实现逻辑复用](#composition-api实现逻辑复用)
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
### Vue高级特性
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
### Vuex
- state
- getters
- actions
- mutations
- dispatch
- commit
- mapState
- mapGetters
- mapActions
- mapMutations
### vue-router
- 路由模式
  - hash
  - H5 history：需要server端支持，因此无特殊需求可选择前者
- 路由配置
  - 动态路由
  - 懒加载：import（）函数
## VUE原理
### 组件化
- 数据驱动视图（MVVM，setState）
  - 传统组件只是静态渲染，更新还要依赖于操作DOM
  - MVVM就是通过数据去驱动视图更新，不用去操作DOM更新视图
### 响应式
- 数据驱动视图的第一步：组件data的数据变化，立刻触发视图更新
  - 核心API-Object.defineProperty实现响应式
    - 如何实现？
      ```jsx
      const data = {};
      const name = 'zhangsan';
      Object.defineproperty(data, "name",{
        //获取旧数据
        get(){
          cosole.log('get');
          return name;
        },
        //更新新数据
        set(newVal){
          console.log('set');
          name = newVal;
        }
      })
      ```
    - 如何深度监听data变化（数组、深层对象）
      ```jsx
      //触发更新视图
      function updateView() {
        cosnole.log('视图更新');
      }
      // 重新定义数组原型
      const oldArrayProperty = Array.prototype;
      // 创建新对象，原型指向oldArrayProperty，在扩展新的方法不会影响原型
      const arrPro = Object.create(oldArrayProperty);
      ['push', 'pop', 'unshift'].forEach((item) => {
          arrPro[item] = function () { // 执行arrPro的内置属性方法的时候触发
            // oldArrayProperty数组的原型方法
            oldArrayProperty[item].call(this, ...arguments);
          }
      })
      //重新定义属性，监听起来
      function defineReactive(target,key,value) {
        //深度监听
        observer（value）;
        //核心API
        Object.defineReactive(target,key,{
          get() {
            return value;
          }，
          set(newValue) {
            if（newValue != value） {
              //深度监听
              observer(newValue);
              //设置新值
              //注意，value一直在闭包中，此处设置完之后，再get时也是会获取最新的值
              value = newValue;
              //触发更新视图
              updateView();
            }
          }
        },)
      }
      //监听对象属性
      function observer(target) {
        if(type of target !== 'object' || target === null) {
          //不是对象或数据
          return target;
        }
        //重新定义各个属性(for in 也可以遍历数组)
        for(let key in target) {
          defineReactive(target,key,target[key]);
        }
      }
      //准备数据
      const data = {
        name: 'zhangsan',
        age: 20,
        info: {
          address: '北京' //需要深度监听
        }
      };
      //监听数据
      observer（data）;
      //测试
      data.name = ‘lisi’;
      data.age = 21;
      data.info.address = ‘上海’;//深度监听
      ```
    - 缺点（Vue3改用proxy）：
      - 深度监听，需要递归到底，一次性计算量大
      - 无法监听新增属性、删除属性
      - 无法原生监听数组，需要特殊处理
### vdom和diff
DOM操作非常耗费性能
- Vue和React是数据驱动视图，如何有效控制DOM操作？
  - vdom：用js模拟DOM结构，计算出最小的变更，操作DOM
    - js模拟DOM结构
      - vnode——json树结构
    - diff算法计算出最小变更
      - 只比较同一层级，不跨级比较
      - tag不同，则直接删除重建，不再深度比较
      - tag和key两者都相同，则认为是相同节点，不再深度比较
### 模版编译
- 前置知识：JS的with语法
  - 改变{}内自由变量的查找规则，当作obj属性来查找
  - 如果找不到匹配的obj属性，就会报错
  - with要慎用，它打破了作用域的规则，导致可读性变差
- vue template complier将模版编译为render函数
- 执行render函数生成vnode
- 基于vnode在执行patch和diff
- 使用webpack vue-loader会在开发环境下编译模版
### 渲染过程
- 初次渲染过程
  - 解析模版为render函数（或在开发环境已完成，vue-loader）
  - 触发响应式，监听data属性getter setter
  - 执行render函数，生成vnode，patch（elem，vnode）
- 更新过程
  - 修改data，触发setter（此前在getter中已被监听）
  - 重新执行render函数，生成newVnode
  - patch（vnode，newVnode）
- 异步渲染
  - $nextTick：待DOM渲染完再回调
  - 汇总data的修改，减少DOM操作次数，一次性更新时图，提高性能
### 前端路由
- hash路由
  - window.onhashchange
  - hash变化会触发网页跳转
  - hash变化不会刷新页面，SPA必须的特点
  - hash永远不会提交到server端
- H5 history路由
  - history.pushState
  - window.onpopstate
## VUE总结
1. MVVM 模式最终实现了数据模型和视图的解耦，ViewModel 和 View 之间为双向绑定关系，以数据驱动视图。把开发者从传统的 DOM 操作中解放出来，更专注于业务开发。同时，这也让开发大型复杂项目得以实现。
2. Vue 2.x 中使用 Object.defineProperty 来实现数据响应化，通过遍历对象的每一个属性，设置他们的访问器属性，在其中进行依赖收集和更新操作。优点是兼容性好 IE 9+，缺点就是主动递归响应化的特性在数据量很大的场景下会造成性能急剧下降，且默认无法响应对象属性的新增和删除操作，需要额外调用 Vue.set 和 Vue.delete。同时无法响应数组中数据的变化，需要通过装饰数组原型方法实现。
3. Vnode 即虚拟的 DOM 节点。是使用 JS 对象描述的 DOM 结构，可以通过它渲染出真实 DOM。相比直接操作真实 DOM，它更加灵活和高效。一方面来说，对它的操作并不会立马触发页面重新渲染，充分利用了JS 的事件循环机制实现异步更新。另一方面，通过优化过的 Diff 算法以最小代价实现差量更新。
4. 组件化是由来已久的话题，通过它可以抽离公用模块，解耦业务逻辑，提升项目的可维护性、可扩展性、可复用性、可测试性，拥抱工程化的理念。
5. 一个完整的 Vue 文件由 template、script 和 style 组成。在开发环境中由 vue-loader 进行解析，内部涉及 sfc-template-compiler 对模板进行编译，生成 render 函数。babel -loader 对脚本进行处理，postcss 相关loader 对样式进行处理。
6. Vue 组件的渲染更新流程主要分初始渲染阶段、数据更新阶段以及 Patch 阶段。初始阶段根据现有的模板编译出 render 函数，并对模板中的依赖进行收集，生成 watcher，最后执行 Patch 渲染界面。数据更新阶段数据发生变化会触发访问器setter，并触发相应 watcher 重新执行，基于 template 生成新的 render 函数，最终通过 Patch 实现差量更新界面。Patch 中最核心的方法就是 patchVnode 和 updateChildren，patch 通过同层比较代替深度遍历，极大的降低了时间复杂度，patchVnode 中对比新老 vnode 的真实 DOM，对其做一些新增、删除、替换和复用操作，对于新老 vnode 同时存在子节点的情况，继续使用 updateChildren 更新子节点，在这个方法里，使用了经典的双指针算法进行双端对比，同时结合交叉采样比对，以最小代价找出差异并得出最终 DOM 结构。
7. Vue-router 为Vue 提供了单页面路由的支持，它支持 3 种模式，hash 模式、history 模式和abstract 模式。hash 模式通过监听 hashchange 事件更换页面内容，兼容性好。history 模式通过监听 popstate 事件替换页面内容，SEO 友好但兼容不佳，且需要后端配置兜底页面。abstract 是非浏览器环境（无头模式）下的模式，通常是服务端渲染场景使用，大部分人都用不到。
8. Vuex 是一个集中式的状态管理模块，它为 Vue 项目提供一个全局的可预测的状态管理能力。它和 Vue 一样都是遵循单向数据流的，一个基本的 vuex 模块（store）包含 state、getters、mutations 和 actions。其中 state 中为状态值，mutations 中为修改 state 的同步操作，actions 中为修改 state 的异步操作。vuex 本事也是一个响应式模型，所以可以和 Vue 完全配合起来。修改数据时，不是直接修改 state 中的值，而是通过 commit 或 dispatch 发送一条指令给 store，实现一种可预测的间接修改。这和 redux 中的reducer 是类似的。
## VUE面试真题

## VUE3
### Vue3升级了那些重要功能
- createApp
  ```jsx
  //vue2
  const app = new Vue({})
  //vue3
  const app = Vue.createApp({})
  //vue2
  Vue.use()
  Vue.mixin()
  Vue.component()
  //vue3
  app.use()
  app.mixin()
  app.component()
  ```
- emits属性
  ```jsx
  //父组件
  <SonDemo @onEventFn="onEventFn"></SonDemo>
  {
    emits:['onEventFn']
  }
  //子组件
  {
    emits:['onEventFn']
  }
  setup(props, {emit}){
    emit('onEventFn',)
  }
  ```
- 生命周期
  - Vue3生命周期
    - beforeDestroy和destory改为beforeUnmouted和mouted
    - setup相当于beforeCreate 和 created
    - 其他的 on + Vue2 的生命周期
- 多事件
  - 一个监听起立可以绑定多个事件函数
- Fragment
  - vue2模版中只能用一个div包裹
  - vue3可以有多个div块
- 移除.sync
- 异步组件的写法
  ```jsx
  //Vue2
  components:{
    'my-component':() => import(...)
  }
  //Vue3
  import { defineAsyncComponent } from 'vue';
  components:{
    AsyncComponent:defineAsyncComponent(() => import(...))
  }
  ```
- 移除filter
- Teleport
  - 它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。
  ```html
  <button @click="open = true">Open Modal</button>
  <!--<Teleport> 接收一个 to prop 来指定传送的目标。to 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。这段代码的作用就是告诉 Vue“把以下模板片段传送到 body 标签下”。-->
  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>
  ```
- Suspense
  - suspense 是一个内置组件，用来在组件树中协调对异步依赖的处理。它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态。
  ```html
  <Suspense>
    <!-- 具有深层异步依赖的组件 -->
    <AsyncComponent />
    <!-- 在 #fallback 插槽中显示 “正在加载中” -->
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  ```
- Composition API
  - Composition API对比Options API
    - 更好的代码组织
    - 更好的逻辑复用
    - 更好的类型推导
- Vue3对比Vue2的优势
  - 性能更好
  - 体积更小
  - 更好的ts支持
  - 更好的代码组织
  - 更好的逻辑抽离
  - 更多新功能
### 如何理解ref toRef和toRefs
- ref
  - 生成值类型的响应式数据，值类型命名变量的时候，建议是 xxxRef
  - 可用于模版和 reactive
  - 通过 .value 修改值
  - 为何需要.value？
    - ref是一个对象（不丢失响应式），value存储值
    - 所以ref虽然是值类型的响应式数据，但是是一个对象
    - 通过.value属性的get和set实现响应式
    - 用于模版、reactive时，不需要.value，其他情况都需要
- toRef
  - 针对一个响应式对象（reactive）的prop
  - 创建一个ref，具有响应式
  - 两者保持引用关系
  - toRef如果用于普通对象（非reactive），产出的结果就不具备响应式
- toRefs
  - 将响应式对象转换为普通对象
  - 对象的每个prop属性都是对应的ref响应式数据
  - 两者保持引用关系
- 为何需要toRef和toRefs
  - 初衷：不丢失响应式的情况下，把对象数据分解/扩散
  - 前提：针对的是响应式对象（reactive封装的），非普通对象
  - 注意：不创造响应式，而是延续响应式
- 最佳使用方式
  - 用reactive做对象的响应式，用ref做值类型的响应式
  - setup中返回toRefs（state），或者toRef（state, 'xxx'）
  - 合成函数返回响应式对象时，使用toRefs
#### vue3为什么会存在reactive和ref？
  reactive和ref都是 vue3 创建响应式对象的方式，相当于 vue2 的 data里面创建的数据，如果想要使用vue3 CompositionAPI的方式写程序，就必须用reactive和ref 创建响应式对象CompositionAPI的方式不支持vue2 的data，所以才会存在reactive和ref
#### Vue3 ref是否可以替代reactive？
  这样做，功能上是可以的。不过按照 vue3 的设计思路来看，目前不推荐这么做。还是尽量使用reactive ，然后值类型使用 ref 。 
### Composition API实现逻辑复用
- 抽离逻辑代码到一个函数
- 函数命名月定为useXxxx格式
- 在setup中引用useXxxx函数
### Vue3如何实现响应式
- 使用Reflect实现Proxy
  ```jsx
  const proxyData = new Proxy(data, {
    get(target, key, receiver){
      const result = Reflect.get(target, key, receiver);
      return result;//返回结果
    }
    set(target, key, val, receiver){
      const result = Reflect.set(target, key, val, receiver);
      return result;//是否设置成功
    }
    deleteProperty(target, key){
      const result = Reflect.deleteProperty(target, key);
      return result;//是否删除成功
    }
  })
  ```
  - Reflect作用：
    - 和Proxy作用一一对应
    - 函数式、规范化、标准化、函数式
  - 代替了Object上的工具函数
### 使用Proxy实现响应式
  - Proxy性能如何提升？
    - proxy只有在get的时候才做递归，获取到那一层，那一层才开始做响应式的处理
    - proxy可以监听到 新增/删除 属性
    - proxy可以监听到数组的变化
### v-model用法
  - 原父子组件传递值
  ```jsx
  //父组件
  <template>
    <div>
      {{myname}}
    </div>
    <Chlid :childname="myname" @onInputChange="handleChange" />
  </template>
  <script>
    import Child from 'Child.vue';
    import { ref } from 'vue';

    export default {
      setup() {
        const maname = ref("xiangying");
        function handleChange(val){
          myname.value = val;
        }
        return { myname, handleChange };
      }, 
      component: {
        Child
      }
    }
  </script>
  ```
  ```jsx
  //子组件
  <template>
    <div>
      <input type="text" :value="childname" @input="$emit("onInputChange", $event.currentTarget.value)" />
    </div>
  </template>
  <script>
    export default {
      proprs: {
        childname:String
      },
      methods: {}
    }
  </script>
  ```
  - v-model简化后
  ```jsx
  //父组件
  <template>
    <div>
      {{myname}}
    </div>
    <Chlid :childname="myname" />
  </template>
  <script>
    import Child from 'Child.vue';
    import { ref } from 'vue';

    export default {
      setup() {
        const maname = ref("xiangying");
        return { myname };
      }, 
      component: {
        Child
      }
    }
  </script>
  ```
  ```jsx
  //子组件
  <template>
    <div>
      <input type="text" :value="childname" @input="$emit("updata:childname", $event.currentTarget.value)" />
    </div>
  </template>
  <script>
    export default {
      proprs: {
        childname:String
      },
      methods: {}
    }
  </script>
  ```
### watch和watchEffect的区别
  - 两者都可以监听data的变化
  - watch需要明确监听哪个属性
  - watchEffect会根据其中属性，自动监听变化
  - 当需要深度监听对象或数组中的属性时，需要设置deep：true
  - 需要最初就开始执行监听时，需要配置immediate：true
### setup中如何获取组件实例
  - setup和其他Composition API中没有this
  - 通过getCurrentInstance来获取当前实例
  - 需要读取属性值的话，需要在setup中的onMounted函数中读取
### Vue3为何比Vue2快
- proxy
- PatchFlag静态标记
  - 编译模板时，标记动态属性
  - 标记区分不同的类型，如text、prop；
  - 在diff算法时，可以区分静态节点和不同类型的动态节点，增加效率
- Hoiststatic静态提升
  - 将静态节点的定义，提升到父作用域中缓存起来
  - 多个相邻的静态节点会被合并起来
  - 典型的拿空间换时间的优化策略
- CacheHandler缓存事件
  - 缓存事件
- SSR和Tree-shaking优化
  - SSR优化：静态节点直接输出，绕过了vdom
  - Tree-shaking：按需加载，编译时，根据不同情况，引入不同的API
### Vite为何启动快
- 开发环境使用ES6 module，无需打包——非常快
- 生产环境使用rollup——并不会快很多 
### Composition API和React Hooks对比
- 前者setup只会被调用一次，而后者函数会被多次调用
- 前者无需useMemo useCallback，因为setup只调用一次
- 前者无需顾虑调用顺序，而后者需要保证hooks的顺序一致
- 前者reactive + ref比后者useState要更难理解
### Vue3 script setup——v3.2
- 基本使用
  - 顶级变量、自定义组件可直接用于模板
  - defineProps
  - defineEmits
  - defineExpose
## REACT的使用

## REACT原理

## REACT hooks

## REACT面试真题

## webpack和babel
### webpack基本配置
#### 拆分配置和merge
- 一般分为webpack.common.js公共配置、webpack.dev.js生产环境配置、webpack.prod.js开发环境配置
- 生产与开发环境引入公共配置：
  ```jsx
  const { smart } = require('webpack-merge');
  const webpackCommonConf = require('./webpack.common.js');
  module.export = smart(webpackCommonConf，{

  })
  ```
#### 启动本地服务
```jsx
devServer: {
  port: 8080,
  progress: true,//显示打包进度条
  contentBase: disPath,//根目录
  open: true,//自动打开浏览器
  compress: true,//启动gzip压缩
  //设置代理
  proxy: {
    //将本地/api/xxx代理到localhost:3000/api/xxx
    '/api': 'http://localhost:3000',
    //将本地/api2/xxx代理到localhost:3000/xxx
    '/api2': {
      target:'http://localhost:3000',
      pathRewrite: {
        '/api2':''
      }
    }
  }
}
```
#### 处理ES6
- 通过babel将ES6转译为ES5语法
```jsx
{
  test: /\.js$/,
  loader: ['babel-loader'],
  includes: srcPath,
  exclude: /node_modules/
}
```
#### 处理样式
```jsx
{
test:/\.css$/,
//loader的执行顺序是：从后往前
loader：['style-loader','css-loader','postcss-loader']
}
```
#### 处理图片
```jsx
{
  test:/\.(png|jpg|jepg|gif)$/,
  use: {
    loader: 'url-loader',
    option: {
      //小于5kb的图片用base64格式产出
      //否则，依然沿用file-loader的形式，产出url格式
      limit: 5 * 1024,
      //打包到img1目录下
      outputPath: '/img1/'
    }
  }
}
```
### webpack高级配置
#### 多入口
```javascript
//webpack.common.js中
entry：{
  index: path.join(srcPath, 'index.js'),
  other: path.join(srcPath, 'other.js')
}
//每有一个html的入口文件，就需要设置一个HtmlWebpackPlugin
new HtmlWebpackPlugin({
  template: path.join(srcPath, 'index.html'),
  filename: 'index.html',
  //chunks表示该页面需要引用哪些chunk
  chunks: ['index']//只引用index.js
})
new HtmlWebpackPlugin({
  template: path.join(srcPath, 'other.html'),
  filename: 'other.html',
  //chunks表示该页面需要引用哪些chunk
  chunks: ['other']//只引用index.js
})
//webpack.prod.js中
output: {
  //name即多入口时，entry的
  filename: '[name].[contentHash:8].js',
  path: distPath
}
```
#### 抽离css文件
```jsx
//抽离css
{
  test: /\.css$/,
  loader: [
    MiniCssExtractPlugin.loader,//注意：这里不再使用style-css
    'css-loader',
    'postcss-loader'
  ]
},
//抽离less
{
  test: /\.less$/,
  loader: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'less-loader'
    'postcss-loader'
  ]
}
//抽离css文件
plugins: [
  new MiniCssExtractPlugin({
    filename: 'css/main.[contentHash:8'].css'
  })
]
//压缩css文件
optimization: {
  minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
}
```
#### 抽离公共代码
```jsx
//分割代码块
splitChunks: {
  chunks: 'all',
  //initial 入口 chunk,对于异步导入的文件不处理
  //async 异步 chunk，只对异步导入的文件处理
  //all 全部 chunk 处理
  //缓存分组
  cacheGroups: {
    //第三方模块
    vendor: {
      name: 'vendor',//chunk名称
      priority: 1,//权限更高，优先抽离，重要！！！
      test: /node_modules/,
      minSize: 0,//大小限制
      minChunks: 1//最少复用过几次
    }，
    //公共模块
    common: {
      name: 'common',
      priority: 0,
      minSize: 0,
      minChunks: 2
    }
  }
  //缓存分组

}
```
#### module chunk bundle的区别
- module：各个源码文件，webpack中一切皆模块
- chunk：多个模块的合成，生成的地方entry，import（），splitChunks
- bundle：最终输出的文件
### webpack性能优化
#### 优化打包构建速度——开发体验和效率
- 优化babel-loader
  ```jsx
  {
    test:/\.js$/,
    use: ['babel-loader?cacheDirectory'],//开启缓存
    include: path.resolve(__dirname, 'src'),//明确范围
    //exclude：path.resolve(__dirname, 'node_modules')//排除范围
    //include和exclude两者选一个即可
  }
  ```
- IgnorePlugin避免引入无用模块
  ```jsx
  //忽略 moment 下的 /locale 目录
  new webpack.IgnorePlugin(/\.\/locale/,/moment/)
  ```
- noParse避免重复打包
  ```jsx
  module: {
    //对完整的'react.min.js'文件就没有采用模块化
    //忽略对'react.min.js'文件的递归解析处理
    noParse: [/react\.min\.js$/],
  }
  ```
  IgnorePlugin vs noParse
  - IgnorePlugin直接不引入，代码中没有
  - noParse引入，但不打包
- happyPack多进程打包，提高构建速度（特别是多核CPU）
  ```jsx
  {
    test: /\.js$/,
    //把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
    use: ['happypack/loader?id=babel'],
    include: scrPath
  }
  plugins： {
    // happyPack 开启多进程打包
    new HappyPack({
      //用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'babel',
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: ['babel-loader?cacheDirectory']
    })
  }
  ```
- ParallelUglifyPlugin多进程压缩JS
  ```jsx
  plugins: {
    new ParallelUglifyPlugin({
      //传递给 UglifyJS 的参数
      uglifyJS: {
        output: {
          beautify: false,// 最紧凑的输出
          comments: false// 删除所有注释
        },
        compress: {
          drop_console: true,//删除所有`console`语句，可以兼容IE浏览器
          collapse_vars:true,//内嵌定义了，但是只用到一次的变量
          reduce_vars: true//提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    })
  }
  ```
- 自动刷新（基本无需主动使用）
  ```jsx
  module.export = {
    watch: true,//开启监听，默认为false
    //开启监听后，webpack-dev-server 会自动开启刷新浏览器
    //监听配置
    watchOptions: {
      ignored: /node_modules/,//忽略哪些
      aggregateTimeout: 300,//监听到变化发生后，等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
      //判断文件是否发生变化是通过不短的去询问系统指定文件有没有变化实现的
      poll: 1000//默认每个1000ms询问一次
    }
  }
  ```
- 热更新
  热更新 vs 自动刷新
  - 自动刷新：整个网页全部刷新，速度较慢，状态会丢失
  - 热更新：新代码生效，网页不刷新，状态不丢失
  ```jsx
  const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
  entry: {
    //index: path.join(srvPath, 'index.js')
    //热更新需要在原配置基础上，添加两行配置
    index: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      path.join(srvPath, 'index.js')
    ]
  }
  plugins: [
    //应用热更新
    new HotModuleReplacementPlugin()
  ]
  ```
  ```jsx
  //然后再index.js中增加开启热更新撞击后的代码逻辑
  if(module.hot) {
    // ['./math'] 监听的模块
    nodule.hot.accept(['./math'], () => {
      const sunRes = sun(10, 20);
      console.log('sunRes in hot', sunRes);
    })
  }
  ```
- DllPlugin动态链接库插件
  - 前端框架如Vue、React，体积大，构建慢，使用 DllPlugin 后，同一版本只构建一次即可，不用每次都重新构建
  - webpack 已内置 DllPlugin 支持
  - DllPlugin 打包出 dll 文件
  - DllReferncePlugin 使用 dll 文件
  ```jsx
  //第一步：配置一个webpack.dll.js文件
  const path = require('path');
  const DllPlugin = require('webpack/lib/DllPlugin');
  const { srcPath, distPath } = require('./paths');
  module.exports = {
    mode: 'development',
    //JS执行入口文件
    enrty: {
      //把 React 相关模块都放到一个单独的动态链接库
      react: ['react', 'react-dom']
    },
    output: {
      //输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称
      //也就是 entry 中 配置的 react 和 polyfill
      filename: '[name].dll.js',
      //输出的文件都放在 dist 目录下
      path: distPath,
      //存放动态链接库的全局变量名称，例如对应 react 来说就是 _dll_react
      //之所以在前面加上 _dll_ 是为了防止全局变量冲突
      library: '_dll_[name]'
    }，
    plugins: [
      //接入DllPlugin
      new DllPlugin({
        //动态链接库的全局变量名称，需要和 output.library 中保持一致
        //该字段的值也就是输出的 manifest.json 文件中 name 字段的值
        //例如 react.manifest.json 中就有 "name": "_dll_react"
        name: '_dll_[name]',
        //描述动态链接库的 manifest.json 文件输出时的文件名称
        path: path.join(distPath, '[name].manifest.json')
      })
    ]
  }
  ```
  ```jsx
  //第二步：在index.html中引入[name].dll.js
  //第三步：引入 DllReferncePlugin
  const DllReferncePlugin = require('webpack/lib/DllReferncePlugin');
  export module = smart(webpackCommonConf, {
    ......
    plugins: [
      new DllReferncePlugin({
        //描述 react 动态链接库的文件内容
        manifest: require(path.join(distPath, 'react.manifest.json'))
      })
    ]
  })
  ```
#### 优化产出代码——产品性能
好处：
  - 体积更小
  - 合理分包，不重复加载
  - 速度更快，内存使用更少
- 小图片 base64 编码
- bundle 加 hash
- 懒加载
- 提取公共代码
- IngorePlugin
- 使用 CDN 加速
- 使用 production
  - 自动开启代码压缩
  - Vue React等框架会自动删掉调试代码（如开发环境的warning）
  - 启动 Tree-Shacking：必须是ES module才能生效
    - ES module 和 Commonjs区别
      - ES module 是静态引用，编译时引用
      - Commonjs 是动态引用，执行时引入
      - 只有 ES module 才能静态分析，实现 Tree-Shacking
- 使用 Scope Hosting
  - 代码体积更小
  - 创建函数作用域更少
  - 代码可读性更好
  ```jsx
  resolve: {
    //针对 npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  plugins:[
    // 开启 Scope Hosting
    new ModuleConcatenationPlugin()
  ]
  ```
### babel
#### 环境搭建 & 基本配置
#### babel-polyfill（现已被弃用）

- 什么是polyfill？
    - 根据浏览器当前的情况，做出兼容
- core.js 和 regenerator
- babel-polyfill 即两者的集合
- 推荐直接使用core.js 和 regenerator

```json
{
	"presets": [
		[
			"@babel/preset-env",
			{
				//按需引入
				"useBuiltIns": "usage",
				//corejs版本
				"corejs": 3
			}
		]
	]
}
```

- babel-polyfill的问题
    - 会污染全局环境
    - 解决方法：babel-runtime
#### babel-runtime

```json
"plugins": [
	[
		"@babel/plugin-transform-runtime",
		{
			"absoluteRuntime": false,
			"corjs": 3,
			"helper": true,
			"regenerator": true,
			"useESModules": false
		}
	]
]
```
#### 前端为何进行打包和构建
- 代码方面
    - 代码体积更小
    - 编译高级语言
    - 兼容性和错误检查
- 研发方面
    - 统一高效的开发环境
    - 统一的构建流程和产出标准
    - 集成公司构建规范

#### module chunk bundle的区别

- module：各个源码文件
- chunk：多模块合并成的
- bundle：最终输出的文件

#### loader 和 plugin 的区别

loader模块转换器，如less→css

plugin扩展插件，如HtmlWebpackPlugin
## 项目设计

## 项目流程
需求分析->技术方案研设计->开发->联调->测试->上线
