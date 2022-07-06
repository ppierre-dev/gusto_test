<template>
  <div id="main" class="flex flex-col shadow-2xl rounded-lg w-1/4 m-auto" v-if="!isUploading && !uploadEnded">
      <div id="header">
          <h1 class="font-bold text-2xl my-6">Upload your image</h1>
          <h3 class="text-md my-6">File should be Jpeg, Png, ...</h3>
      </div>
      <div id="upload" @click="openFileDialog" @drop.prevent="addDragNDropFile" class="hover:cursor-pointer bg-gray-100 border-2 border-dashed border-blue-300 mx-6 rounded-lg">
            <img class="m-auto my-6" width="200" src="@/assets/image.svg" alt="upload-img">
            <p class="text-gray-400 my-12">Drag & Drop your image here</p>
      </div>
      <div id="footer">
          <p class="text-gray-400 mt-6">Or</p>
          <input @click="openFileDialog" type="button" value="Choose a file" class="hover:cursor-pointer bg-blue-600 text-white my-6 rounded-lg py-2 px-4">
          <input @change="newFile" type="file" class="hidden" id="hiddenFileButton">
      </div>
  </div>
    <UploadingPage v-if="isUploading" :progress="uploadProgess" />
    <UploadEnded v-if="uploadEnded" :uploadedImg="file"/>
</template>

<script>
import axios from "axios";
import UploadingPage from "@/views/UploadingPage.vue";
import UploadEnded from "@/views/UploadEnded.vue";

export default {
    name: "ImageUploader",
    components: {
        UploadingPage,
        UploadEnded
    }, 
    data() {
        return {
            file: null,
            isUploading: false,
            uploadEnded: false,
            uploadProgess: 0
        }
    },
    mounted() {
        const events = ['dragenter', 'dragover', 'dragleave', 'drop'];
        events.forEach((event) => {
            document.addEventListener(event, (e) => {
                e.preventDefault();
            })
        })
    },
    methods: {
        openFileDialog() {
            const fileButton = document.getElementById("hiddenFileButton");
            fileButton.click();
        },
        newFile() {
            this.isUploading = true;
            const fileButton = document.getElementById("hiddenFileButton");
            const formData = new FormData();
            formData.append("file", fileButton.files[0]);
            this.file = fileButton.files[0];
            console.log(this.file);
            axios.post("http://localhost:4000/upload", formData, {
                onUploadProgress: Progess => {
                    let progess = Math.round((Progess.loaded / Progess.total) * 100);
                    this.uploadProgess = progess;
                }
            }).then( res => {
                console.log(res);
                this.isUploading = false;
                this.uploadEnded = true;
            }).catch(err => {
                console.log(err);
            })
        },
        addDragNDropFile(e) {
            const file = e.dataTransfer.files[0];
            this.isUploading = true;
            const formData = new FormData();
            formData.append("file", file);
            this.file = file;
            axios.post("http://localhost:4000/upload", formData, {
                onUploadProgress: Progess => {
                    let progess = Math.round((Progess.loaded / Progess.total) * 100);
                    this.uploadProgess = progess;
                }
            }).then( res => {
                console.log(res);
                this.isUploading = false;
                this.uploadEnded = true;
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', 'Sans-serif';
}
</style>