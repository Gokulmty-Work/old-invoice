import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { GenerateBarcodeService } from 'src/app/services/generate-barcode.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

code: string;
message: string;
fromComponent: string;
sub: any;

  constructor(private barcodeService: GenerateBarcodeService,
    private router: Router,public dialog: MatDialog,
    private activatedRoute :ActivatedRoute,
     ) { 
      this.sub = this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.fromComponent = params['fromComponent'];
        this.code = params['code'];
        this.code = params['message'];
      });

     }

  ngOnInit(): void {
  }

}
