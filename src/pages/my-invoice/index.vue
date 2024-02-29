<template>
  <bc-navbar
    title="捐赠发票"
    :type="4"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <tc-image src="!@/user/my-invoice.png" width="100%" height="100%" mode="widthFix" />
</template>
<script setup></script>
<style lang="scss" scoped>
image {
  display: block;
}
</style>
