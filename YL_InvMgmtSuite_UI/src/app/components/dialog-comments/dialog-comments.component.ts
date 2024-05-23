import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-comments',
  templateUrl: './dialog-comments.component.html',
  styleUrls: ['./dialog-comments.component.css']
})
export class DialogCommentsComponent implements OnInit {

    constructor(
    public dialogRef: MatDialogRef<DialogCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
 
    ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

   onNoClick(): void {
    this.dialogRef.close();
  }




}


