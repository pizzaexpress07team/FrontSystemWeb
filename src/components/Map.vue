<template>
<div class="map">
  <baidu-map class="map-content"></baidu-map>
</div>
</template>

<script>
export default {
  name: 'Map',
};
</script>

<style scoped lang="less">
.map {
  width: 100%;
  .map-content {
    width: 100%;
    height: 400px;
  }
}
</style>
