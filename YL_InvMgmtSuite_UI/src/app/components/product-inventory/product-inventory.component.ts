  // export type SortColumn = keyof ProductMaster | '';
  // export type SortDirection = 'asc' | 'desc' | '';
  // const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
  
  // const compare = (v1: string | number | Date | boolean, v2: string | number | Date | boolean) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  
  // export interface SortEvent {
  //   column: SortColumn;
  //   direction: SortDirection;
  // }
  
  // @Directive({
  //   selector: 'th[sortable]',
  //   host: {
  //     '[class.asc]': 'direction === "asc"',
  //     '[class.desc]': 'direction === "desc"',
  //     '(click)': 'rotate()'
  //   }
  // })
  // export class NgbdSortableHeader {
  
  //   @Input() sortable: SortColumn = '';
  //   @Input() direction: SortDirection = '';
  //   @Output() sort = new EventEmitter<SortEvent>();
  
  //   rotate() {
  //     this.direction = rotate[this.direction];
  //     this.sort.emit({column: this.sortable, direction: this.direction});
  //   }
  // }
  
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
  import { ProductInventory } from 'src/app/models/product-inventory';
import { ProductInventoryService } from 'src/app/services/product-inventory.service';
import { logging } from 'protractor';
import { LocationComponent } from '../location/location.component';
import { AuthService } from 'src/app/services/auth.service';
import { SearchComponent } from '../search/search.component';
import { NgbdSortableHeader, SortEvent } from '../product-master/product-master.component';
  
  
  @Component({
    selector: 'app-product-inventory',
    templateUrl: './product-inventory.component.html',
    styleUrls: ['./product-inventory.component.css']
  })
  export class ProductInventoryComponent implements OnInit {
    
    @ViewChild(MatMenuTrigger)
    contextMenu: MatMenuTrigger;
    compare = (v1: string | number | Date | boolean, v2: string | number | Date | boolean) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    contextMenuPosition = { x: '0px', y: '0px' };
  
    onContextMenu(event: MouseEvent,inventory: ProductInventory) {
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX + 'px';
      this.contextMenuPosition.y = event.clientY + 'px';
      this.contextMenu.menuData = {'inventory': inventory };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  
  
   
  
  productInventoryList: ProductInventory[];
  backupProductInventoryList: ProductInventory[];
  dataReady:boolean = true;
  searchString: string;
  sub:any;
  fromOperation:string;
  masterId: number;
  
  page:number = 1;
  pageSize: number = 20;
  fetchedCount: number = 1;
  loadCount: number = (this.pageSize * 4);
  collectionSize: number;
  fetchFlag: boolean = true;
  
    constructor(private productInventoryService: ProductInventoryService, 
      private router: Router,public dialog: MatDialog
      ,private _snackBar: MatSnackBar,
      private activatedRoute :ActivatedRoute,
      private authService : AuthService
      ) { 
  
        if(!this.authService.isUserLoggedIn()  )
        {
          this.router.navigate(['login']);
        }
        
  this.productInventoryList = new Array();
  this.backupProductInventoryList = new Array();

  this.sub = this.activatedRoute
  .queryParams
  .subscribe(params => {
    this.fromOperation = params['fromOperation'];
    this.masterId = params['masterId']
  });

 // if(this.fromOperation !='ProductMasterComponent' && this.systemId == undefined)
 //  this.ngOnDestroy();

  }
  
    ngOnInit(): void {
      this.fetchDataFromServer();
    }
    
    // ngOnDestroy() {
    //   this.sub.unsubscribe();
    // }
    openLocationModule(inventory: ProductInventory)
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = false;
    
      const dialogRef = this.dialog.open(LocationComponent,{
        data: {inventory: inventory},
        height: '100%',
        width:  '100%',
        
      });
    
      dialogRef.afterClosed().subscribe(result => {
       
        //     Update Inventory  
            if(result.responseMessage =='success' && result.inventory !=null &&  result.inventory != undefined)
            {
            
           let tempProduct =  this.productInventoryList.find(item => item.id == result.inventory.id);
           let index = this.productInventoryList.indexOf(tempProduct);
           this.productInventoryList[index]= result.inventory;
          }   
            console.log(`Dialog result: ${result}`);
      });
    

    }
  
    fetchDataFromServer()
  {
  
   this.productInventoryService.getPagedInventory((this.fetchedCount - 1),this.loadCount,this.masterId)
      .subscribe(data => {
        console.log(data); 
        
        if(data != null)
        { 
            data.forEach(element => {
            this.productInventoryList.push(element);
            this.backupProductInventoryList.push(element);
           
            this.dataReady = true;
            });
        }
         
      }, error => {
        console.log(error);
        this.router.navigate(['error'], { queryParams: { fromComponent: 'ProductInventory', 
        message: "While loading Inventory", code:error.status+"_"+error.statusText+"_"+error.message}  });

      });
  
  }
  
  
  viewDetails(product: ProductInventory)
  {
    const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = false;
  
  const dialogRef = this.dialog.open(SearchComponent,{
    data: { searchField: 'skuId', requestingComponent: 'ProductInvetoryComponent',id: product.skuId},
    height: '80%',
    width:  '80%',
  });
 dialogRef.afterClosed().subscribe(result => {
  console.log(result);  
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
      this.productInventoryService.searchString(this.searchString)
      .subscribe(data => {console.log(data); 
        if(data != null)
        { 
         this.productInventoryList = data;           
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
      this.productInventoryList = this.backupProductInventoryList;
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
     this.productInventoryList = this.productInventoryList; 
    } else {
      this.productInventoryList = [...this.productInventoryList].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
  
   
  
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  