<template>
  <div class="flex flex-col shadow-2xl rounded-lg w-1/2 m-auto">
        <span class="material-symbols-outlined text-6xl text-green-700">
            check_circle
        </span>
      <h1 class="font-bold text-2xl">Uploaded Successfully !</h1>
      <img class="m-auto rounded my-6" :src="imageUrl + getFile.name" alt="uploaded-img" width="200">
      <div class="flex flex-row m-auto my-6">
          <div class="border-2 rounded-lg p-1 bg-gray-100">
                <input id="inputImageLink" type="text" :value="imageUrl + getFile.name" class="bg-gray-100" readonly>
                <input @click="copyImageLink" type="button" value="Copy Link" class="hover:cursor-pointer bg-blue-600 text-white rounded-lg py-2 px-4 ml-6">
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "UploadEnded",
    data() {
        return {
            imageUrl: "http://localhost:4000/",
        }
    },
    computed: {
        ...mapGetters(["getFile"]),
    },
    methods: {
        copyImageLink() {
            const imageLinkButton = document.getElementById("inputImageLink");
            imageLinkButton.select();
            navigator.clipboard.writeText(imageLinkButton.value);
        }
    }
}
</script>

<style>

</style>