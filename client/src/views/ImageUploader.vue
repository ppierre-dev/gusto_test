<template>
  <div id="main" class="flex flex-col shadow-2xl rounded-lg w-1/4 m-auto" v-if="!isUploading && !uploadEnded">
      <div id="header">
          <h1 class="font-bold text-2xl my-6">Upload your image</h1>
          <h3 class="text-md my-6">File should be Jpeg, Png, ...</h3>
      </div>
      <div id="upload" @click="openFileDialog" @drop.prevent="addFile" class="hover:cursor-pointer bg-gray-100 border-2 border-dashed border-blue-300 mx-6 rounded-lg">
            <img class="m-auto my-6" width="200" src="@/assets/image.svg" alt="upload-img">
            <p class="text-gray-400 my-12">Drag & Drop your image here</p>
      </div>
      <div id="footer">
          <p class="text-gray-400 mt-6">Or</p>
          <input @click="openFileDialog" type="button" value="Choose a file" class="hover:cursor-pointer bg-blue-600 text-white my-6 rounded-lg py-2 px-4">
          <input @change="addFile" type="file" class="hidden" id="hiddenFileButton">
      </div>
  </div>
    <UploadingPage v-if="isUploading" />
    <UploadEnded v-if="uploadEnded" />
</template>

<script>
import axios from "axios";
import {mapGetters, mapActions} from "vuex";
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
            isUploading: false,
            uploadEnded: false,
        }
    },
    mounted() {
        const events = ['dragenter', 'dragover', 'dragleave', 'drop'];
        events.forEach((event) => { // Retirer le comportement par défaut qui fait qu'on copie l'image sur le navigateur.
            document.addEventListener(event, (e) => {
                e.preventDefault();
            })
        })
    },
    computed: {
        ...mapGetters(["getFile"]),
    },
    methods: {
        ...mapActions(["setFile", "setUploadProgress"]),
        openFileDialog() { // Ouvrir le gestionnaire de fichier pour séléctionner une image
            const fileButton = document.getElementById("hiddenFileButton");
            fileButton.click();
        },
        addFile(event) {
            if (event.dataTransfer) { // Si c'est par drag'n drop
                this.setFile(event.dataTransfer.files[0])
            } else { // Si c'est par le biais des boutons
                const fileButton = document.getElementById("hiddenFileButton");
                this.setFile(fileButton.files[0])
            }
            this.isUploading = true;
            const formData = new FormData();
            formData.append("file", this.getFile);
            axios.post("http://localhost:4000/upload", formData, {
                onUploadProgress: Progress => {
                    let progress = Math.round((Progress.loaded / Progress.total) * 100); // Etat de l'upload, ici quasi instantané car en local
                    this.setUploadProgress(progress);
                }
            }).then(() => { // réussite
                this.isUploading = false;
                this.uploadEnded = true;
            }).catch(err => { // Erreur
                console.log(err);
            })
        },
    }
}
</script>

<style scoped>
h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', 'Sans-serif';
}
</style>