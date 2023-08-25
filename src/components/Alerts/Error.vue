<template>
  <div class="alert-box">
    <strong>Error!</strong>
    <br/>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  color: red;
}
  
strong {
	color: red;    
}
</style>