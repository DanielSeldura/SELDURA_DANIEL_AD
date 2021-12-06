import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  constructor(private storage: AngularFireStorage) {}
  uploadPercent!: Observable<number | undefined>;
  downloadURL!: Observable<string | undefined>;
  ngOnInit(): void {}

  async uploadFileSilent(event: any) {
    const file = event.target.files[0];
    const filePath = `uploads/${new Date().valueOf()}${this.isolateExtension(
      file.name
    )}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, file).then(async (data) => {
      var url = await fileRef.getDownloadURL().toPromise();
      //this is where you get the url and do whatever you want with it
      console.log(url);
    });
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = `uploads/${new Date().valueOf()}${this.isolateExtension(
      file.name
    )}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.downloadURL = fileRef.getDownloadURL())))
      .subscribe();
  }

  isolateExtension(fileName: string): string {
    var splitString = fileName.split('.');
    return '.' + splitString[splitString.length - 1];
  }
}
