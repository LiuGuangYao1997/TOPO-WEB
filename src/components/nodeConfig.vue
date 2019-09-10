<template>
  <div class="nodeConfig">
    <a-menu
            v-model="current"
            mode="horizontal"
    >
      <a-menu-item>
        <label class="menu-item">节点配置</label>
      </a-menu-item>
    </a-menu>
    <a-form layout="inline">
      <a-form-item>
        <label>节点名称: </label>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="模糊匹配"></a-input>
      </a-form-item>
      <a-form-item>
        <label>节点类型: </label>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="模糊匹配"></a-input>
      </a-form-item>
      <a-form-item>
        <label>xx: </label>
      </a-form-item>
      <a-form-item>
        <a-select defaultValue="" >
          <a-select-option value="">监控中</a-select-option>
          <a-select-option value="">已停卡</a-select-option>
          <a-select-option value="">已删除</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button class="formOptBut" size="large">查询</a-button>
      </a-form-item>
      <a-form-item>
        <a-button class="formOptBut" size="large">重置</a-button>
      </a-form-item>
      <a-form-item>
        <a-button class="formOptBut" size="large">新增</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";
    export default {
        name: "nodeConfig",
        components: {AFormItem}
    }
</script>

<style scoped>
  .nodeConfig {
    background-color: white;
    width: 60%;
    border: 2px solid darkgrey;
  }
  .formOptBut {
    background-color: #249aff;
  }
</style>