let MyPlugin = {};
// 定义全局指令
export default MyPlugin.install = function(vue, options) {
  // loadmore 是定义的指令 名称 ， 使用时 用 v-loadmore = "dosomethingFun or data"
  Vue.directive('loadmore', {
    // bind只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
    bind(el, binding) {
      // 获取element-ui定义好的scroll盒子  Select 选择器的下拉盒子
      const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
      SELECTWRAP_DOM.addEventListener('scroll', function() {
        // 判断滚动到底部
        const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;
        if (CONDITION) {
          // binding.value 是指令的绑定值，该值可能是字符串，数字、函数
          // binding.value() 表示执行 v-loadmore 绑定的函数
          binding.value();
        }
      });
    }
  });
  Vue.directive('focuss', {
    // bind只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
    bind(el, binding, vnode) {
      el.addEventListener('keyup', val => {
        // 上下不需要很多判断直接 执行事件就好了
        if ([38, 40].includes(val.which)) {
          document.dispatchEvent(
            new CustomEvent(binding.value.name, {
              detail: {
                value: binding.value.index,
                which: val.which
              }
            })
          );
        }
        // 左右需要单独判读。 arr 参数是重点
        if ([37, 39].includes(val.which) && binding.value.arr != null) {
          let len = binding.value.arr.findIndex(r => r === binding.value.name);
          let str = binding.value.arr[len + { 37: -1, 39: 1 }[val.which]];
          document.dispatchEvent(
            new CustomEvent(str, {
              detail: {
                value: binding.value.index,
                which: val.which
              }
            })
          );
        }
      });
      document.addEventListener(binding.value.name, val => {
        let obj = { 38: 1, 40: -1 };
        // 如果是左右 直接focus就好了。 如果是上下 需要进行判断上下是哪一位
        if (val.detail.value === binding.value.index + ([38, 40].includes(val.detail.which) ? obj[val.detail.which] : 0)) {
          if (vnode.elm && vnode.elm.lastElementChild) {
            vnode.elm.lastElementChild.focus();
            // 这个是为了让focus 之后光标是在最后一个。
            vnode.elm.lastElementChild.setSelectionRange(999, 999);
          }
        }
      });
    }
  });
};
