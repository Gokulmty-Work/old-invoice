export type SortColumn = keyof ProductMaster | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number | Date | boolean, v2: string | number | Date | boolean) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}





import { Component, Directive, EventEmitter, Input, OnInit,Output,QueryList,ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import {ProductMaster} from '../../models/product-master';
import { ProductMasterService } from '../../services/product-master.service';
import { AddProductMasterComponent } from '../add-product-master/add-product-master.component';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { CheckInProductComponent } from '../check-in-product/check-in-product.component';
import { AuthService } from 'src/app/services/auth.service';
import { AppConstants } from 'src/app/AppConstants';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent,product: ProductMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {'product': product };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }


 

productMasterList: ProductMaster[];
backupProductMasterList: ProductMaster[];
dataReady:boolean = true;
searchString: string;

page:number = 1;
pageSize: number = 12;
fetchedCount: number = 1;
loadCount: number = (this.pageSize * 4);
collectionSize: number;
fetchFlag: boolean = true;
sub:any;
fromComponent:string;
message:string;

  constructor(private productMasterService: ProductMasterService, 
    private router: Router,public dialog: MatDialog
    ,private _snackBar: MatSnackBar,
    private authService: AuthService,
    private activatedRoute :ActivatedRoute,
    private excelService: ExcelService
    ) { 
      
      if(!this.authService.isUserLoggedIn())
      {
        this.router.navigate(['login']);
      }

      this.sub = this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.fromComponent = params['fromComponent'];
        this.message = params['message'];
      });
      
this.productMasterList = new Array();
this.backupProductMasterList = new Array();

if(this.fromComponent=='home' && this.message=='showNotifications')
{
  
  if(AppConstants.notificationProducts != null)
  { 
    AppConstants.notificationProducts.forEach(element => {
      this.productMasterList.push(element);
      this.backupProductMasterList.push(element);
      console.log(this.productMasterList);
      
      });
      this.dataReady = true;
  }
 
}
else
this.fetchDataFromServer();


  }

  ngOnInit(): void {

  
  }
  

  fetchDataFromServer()
{

 this.productMasterService.getPagedList((this.fetchedCount - 1),this.loadCount)
    .subscribe(data => {
      console.log(data); 
      
      if(data != null)
      { 
          data.forEach(element => {
          this.productMasterList.push(element);
          this.backupProductMasterList.push(element);
         
          
          });
          this.dataReady = true;
      }
       
    }, error => {
      console.log(error);
      this.router.navigate(['error'], { queryParams: { fromComponent: 'ProductMaster', 
      message: "While loading products", code:error.status+"_"+error.statusText+"_"+error.message}  });

    });

}
  

openAddProdMastComp(operation: String,product: ProductMaster)
{
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = false;

  const dialogRef = this.dialog.open(AddProductMasterComponent,{
    data: {product: product, operation: operation},
    height: '100%',
    width:  '100%',
    
  });

  dialogRef.afterClosed().subscribe(result => {

    //   If a task has been deleted  
       if(result.responseMessage!=null &&  result.responseMessage == "deleted")
       {
          this.productMasterList = this.productMasterList.filter(item => item.id !=result.status);
          this.backupProductMasterList = this.backupProductMasterList.filter(item => item.id !=result.status);
       }   

       
       if(result.responseMessage!=null && result.responseMessage == 'new' && result.status =='success')
       {
        this.productMasterList.push(result.product);
        this.backupProductMasterList.push(result.product);
        let snackBarRef = this._snackBar.open("Success", "OK", {duration: 1000,});
        snackBarRef.onAction().subscribe(() => {
           this._snackBar.dismiss();
       });
       }

       if(result.responseMessage!=null && result.responseMessage == 'edit' && result.status =='success')
       {
       let tempProduct =  this.productMasterList.find(item => item.id == result.product.id);
       let index = this.productMasterList.indexOf(tempProduct);
       this.productMasterList[index] = result.product;

        tempProduct =  this.backupProductMasterList.find(item => item.id == result.product.id);
        index = this.productMasterList.indexOf(tempProduct);
        this.backupProductMasterList[index] = result.product;

        this.backupProductMasterList.push(result.product);
        let snackBarRef = this._snackBar.open("Success", "OK", {duration: 1000,});
        snackBarRef.onAction().subscribe(() => {
           this._snackBar.dismiss();
       });
       }


        console.log(`Dialog result: ${result}`);
  });
}



onChangePage(currentPage, lastPage) {

 if(this.fetchFlag)
 {
 if(currentPage>lastPage)
 {
    if(currentPage>=(this.fetchedCount*3))
    {
       this.fetchedCount = this.fetchedCount + 1;
       this.fetchDataFromServer();
    }
 }
 }
}


search()
{
  this.dataReady = false;
 
 if(this.searchString != null && this.searchString != "")
 {
    this.productMasterService.searchString(this.searchString)
    .subscribe(data => {console.log(data); 
      if(data != null)
      { 
       this.productMasterList = data;           
      }
      this.page = 1;
      this.fetchFlag = false;
      this.dataReady = true;
  
     }, error => {
      console.log(error);
      this.router.navigateByUrl('error');
    });

 }
 else
 {
    this.productMasterList = this.backupProductMasterList;
    this.page = 1;
    this.fetchFlag = true;
    this.dataReady = true;

 }



}  
@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

onSort({column, direction}: SortEvent) {

 // resetting other headers
  this.headers.forEach(header => {
    if (header.sortable !== column) {
      header.direction = '';
    }
  });
 
  // sorting 
  if (direction === '' || column === '') {
   this.productMasterList = this.productMasterList; 
  } else {
    this.productMasterList = [...this.productMasterList].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}


checkIn(productMaster: ProductMaster) {
  
  
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = false;

  const dialogRef = this.dialog.open(CheckInProductComponent,{
    data: {productMaster: productMaster},
    height: '100%',
    width:  '100%',
    
  });

  dialogRef.afterClosed().subscribe(result => {
   
    //     Update Inventory  
        if(result.masterId !=null &&  result.masterId != undefined)
        {
        
       let tempProduct =  this.productMasterList.find(item => item.skuId == result.skuId);
       let index = this.productMasterList.indexOf(tempProduct);
       this.productMasterList[index].inventory = result.inventory;
        }   
        console.log(`Dialog result: ${result}`);
  });



}

showInventory(product: ProductMaster) {

this.router.navigate(['productInventory'], { queryParams: { fromComponent: 'ProductMasterComponent', masterId: product.skuId} });
 
}


generateBarcodes(product: ProductMaster){
  this.router.navigate(['barcodes'], { queryParams: { fromComponent: 'ProductMasterComponent', masterId: product.skuId, systemId: product.id} });
}

}













