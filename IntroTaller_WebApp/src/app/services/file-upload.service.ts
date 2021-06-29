import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
  storageRef: firebase.storage.Reference;
  metadata: { contentType: string; };

  constructor(private angularFirebaseStorage: AngularFireStorage) {
    const storage = this.angularFirebaseStorage.storage;
    this.storageRef = storage.ref();
    this.metadata= {
      contentType: 'text/plain'
    };
   }


   uploadFile(file:File, code:string){
    console.log(file.text);
    var uploadTask = this.storageRef.child('codes/'+file.name+'_'+code).put(file,this.metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: 
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        console.log(error.code);
      }, function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
      });
    });
   }

  
}
