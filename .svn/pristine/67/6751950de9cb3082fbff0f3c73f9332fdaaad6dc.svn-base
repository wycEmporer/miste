<template>
	<div>
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	beforeRouteLeave (to, from, next) {
    sessionStorage.removeItem("tripId");
    next();
  }
}
</script>
