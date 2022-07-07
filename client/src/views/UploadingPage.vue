<template>
  <div class="flex flex-col shadow-2xl rounded-lg w-1/2 m-auto">
      <div class="">
          <h1 class="font-bold">Uploading...</h1>
      </div>
      <div>
          <p>{{getUploadProgress}} %</p>
      </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    name: "UploadingPage",
    computed: {
        ...mapGetters(["getUploadProgress"]),
    }
}
</script>

<style>

</style>