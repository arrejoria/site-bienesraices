import { Dropzone } from "dropzone";

const token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");

Dropzone.options.propImages = {
  dictDefaultMessage: "Sube las imagenes de tu publicación aquí",
  dictRemoveFile: "Borrar Archivo",
  dictMaxFilesExceeded: "El limite es de 10 archivos",
  acceptedFiles: ".png,.jpg,.web,.jpeg",
  maxFilesize: 5,
  maxFiles: 10,
  parallelUploads: 10,
  autoProcessQueue: false,
  addRemoveLinks: true,
  headers: {
    "CSRF-Token": token,
  },
  init: function () {
    const dropzone = this;
    const dzSubmit = document.querySelector("#dzSubmit");
    
    dzSubmit.addEventListener("click", function () {
      dropzone.processQueue();
      console.log("dropzone queue processed");
    });

    dropzone.on("queuecomplete", function () {
        console.log('process queue complete');
        console.log(dropzone.getActiveFiles().length);
      if (dropzone.getActiveFiles().length == 0) {
        window.location.pathname = '/my-properties'
      }
    });
  },
  paramName: "images",
};
