<template>
  <div class="flex flex-col shadow-2xl rounded-lg w-1/2 m-auto">
      <div class="">
          <h1 class="font-bold">Uploading...</h1>
      </div>
      <div>
          <p>{{progress}} %</p>
      </div>
  </div>
</template>

<script>
export default {
    name: "UploadingPage",
    props: ["progress"]
}
</script>

<style>

</style>