<template>
  <view>
    <view class="top_text" v-if="value" @click="open">
      <text class="top_text_t">{{ value }}</text>
      <uni-icons class="i" type="forward" size="20" color="#ccc"></uni-icons>
    </view>
    <view class="top_text" v-else style="color: #aaaaaa" @click="open">
      <text class="top_text_t">{{ placeholder }}</text>
      <uni-icons class="i" type="forward" size="20" color="#ccc"></uni-icons
    ></view>
    <uni-popup ref="popup" background-color="#ffffff">
      <view class="stop">
        <uni-icons type="search" size="22"></uni-icons>
        <input
          :auto-blur="true"
          class="stop_input"
          placeholder="请输入关键字"
          @input="inputValue"
          :value="inputTxt"
        />
        <button class="stop_button" :disabled="isMoving" @click="setValue">确定</button>
      </view>
      <picker-view
        indicator-style="height: 70rpx;"
        @pickstart="pickstart"
        @pickend="pickend"
        @change="itemChange"
        :value="index"
      >
        <picker-view-column>
          <view class="item" v-for="(item, idx) in options" :key="idx">{{
            node == null ? item : item[node]
          }}</view>
        </picker-view-column>
      </picker-view>
    </uni-popup>
  </view>
</template>

<script>
/**
 *
 */
export default {
  name: 'pickerSelect',
  props: {
    /**
     * 要列举的集合,可以传递对象集合
     * @property {必填}
     */
    list: {
      type: Array,
      default: () => []
    },
    /**
     * 如果集合中的每一组都是对象,则指定对象中的某个节点属性
     */
    node: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: () => '请选择'
    },
    /**
     * 传过来的文本
     */
    valueTxt: {
      type: String,
      default: null
    },
    /**
     * 是否可自定义结果值
     */
    custom: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    list(newValue, oldValue) {
      this.options = newValue
      this.list = newValue
    }
  },
  created() {
    this.options = this.list
  },
  data() {
    return {
      index: [0],
      inputTxt: '',
      value: this.valueTxt,
      isMoving: false,
      options: []
    }
  },
  model: {
    prop: 'valueTxt',
    event: 'valueChange'
  },
  methods: {
    open() {
      this.$refs.popup.open('bottom')
    },
    itemChange(e) {
      this.index = e.detail.value
      // this.setValue(e.detail.value)
    },
    inputValue(e) {
      this.inputTxt = e.detail.value
      this.index = [0]
      if (this.inputTxt == '') {
        this.options = this.list
        return
      }
      this.options = this.list.filter((o) => {
        o = this.node == null ? o : o[this.node]
        return String(o).indexOf(e.detail.value) >= 0
      })
      // this.setValue(0)
    },

    pickstart() {
      this.isMoving = true
    },
    pickend() {
      this.isMoving = false
    },

    setValue() {
      if (this.index[0] <= 0 && this.options.length <= 0 && this.custom) {
        this.value = this.inputTxt
      } else {
        this.value =
          null == this.node ? this.options[this.index[0]] : this.options[this.index[0]][this.node]
      }
      this.$emit('valueChange', this.value)
      this.$emit('change', this.options[this.index[0]])
      this.$refs.popup.close()
    }
  }
}
</script>

<style lang="scss" scoped>
uni-popup {
  /* height: 400rpx; */
}
picker-view {
  height: 500rpx;
}
picker-view .item {
  height: 70rpx;
  line-height: 70rpx;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: block;
}
.top_text {
  position: relative;
  padding-right: 60rpx;
  color: #333333;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &_t {
  }
  .i {
    margin-left: 30rpx;
    position: absolute;
    right: 0;
  }
}
.stop {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-radius: 10px;
  margin: 25px auto;
  width: 90%;
  &_icon {
  }
  &_input {
    height: 60rpx;
    line-height: 60rpx;
    vertical-align: middle;
    margin-left: 20rpx;
    width: 60%;
    border-bottom: 2rpx solid #cccccc;
  }
  &_button {
    padding: 0 60rpx;
    line-height: 70rpx;
    color: #fff;
    border-radius: 50px;
    background-image: linear-gradient(180deg, #5f8aff, #3d55c3);
    &[disabled] {
      color: #fff;
      background-image: linear-gradient(180deg, #5f8aff, #3d55c3);
      opacity: 0.7;
    }
  }
}
</style>
