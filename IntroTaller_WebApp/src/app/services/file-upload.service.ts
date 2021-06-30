import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  storageRef: firebase.storage.Reference;
  metadata: { contentType: string };

  constructor(private angularFirebaseStorage: AngularFireStorage) {
    const storage = this.angularFirebaseStorage.storage;
    this.storageRef = storage.ref();
    this.metadata = {
      contentType: 'text/plain',
    };
  }

  async uploadFile(file: File, code: string):Promise<string> {
    console.log(file.text);
    var uploadTask = this.storageRef
      .child('codes/' + code + file.name+"_")
      .put(file, this.metadata);
    try {uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      function (error) {
        console.log(error.code);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL);
        });
      }
    );
      return "Exito";
    }
    catch{
      return "Error";
    }
  }

  async getFile(code: string):Promise<string> {
    let link:string;
    var starsRef = this.storageRef.child('codes/'+ code);

    // Get the download URL
    await starsRef.getDownloadURL().then(function(url) {
      link = url;
    }).catch(function(error) {

    })
    return link;
  }

  async deleteFile(params: string) {
    // Create a reference to the file to delete
    this.storageRef.child('codes/'+ params).delete()
    .then(res => {
      console.log('Success');
    })
    .catch((err) => {
      console.log('Error');
    })
  }
}
