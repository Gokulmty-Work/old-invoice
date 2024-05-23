
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatFormFieldControl, MatFormField} from '@angular/material/form-field';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatCardModule,} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { ErrorComponent } from './components/error/error.component';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { OrderModule } from 'ngx-order-pipe';
import { LoginComponent } from './components/login/login.component';
import { HttpInterceptorService } from './http-interceptor.service';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  MatInputModule } from '@angular/material/input';
import { Ng2OdometerModule } from 'ng2-odometer';
import { ApplicationParametersComponent } from './components/application-parameters/application-parameters.component';
import { DialogCommentsComponent } from './components/dialog-comments/dialog-comments.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import {MatSelectModule} from '@angular/material/select';
import { ProductMasterComponent } from './components/product-master/product-master.component';
import { AddProductMasterComponent } from './components/add-product-master/add-product-master.component';
import { ProductInventoryComponent } from './components/product-inventory/product-inventory.component';
import { CheckInProductComponent } from './components/check-in-product/check-in-product.component';
import { CheckOutProductComponent } from './components/check-out-product/check-out-product.component';
import { DisplayProductReportComponent } from './components/display-product-report/display-product-report.component';
import{FilterPipe} from './filter';
import{FilterArrayPipe} from './filterArray';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { NgbdSortableHeader } from './components/product-master/product-master.component';
import { BarecodeScannerLivestreamModule } from "ngx-barcode-scanner";
import { ScannerComponent } from './components/scanner/scanner.component';
import { LocationComponent } from './components/location/location.component';
import { LocationMasterComponent } from './components/location-master/location-master.component';
import { ExcelImportExportComponent } from './components/excel-import-export/excel-import-export.component';
import { TransactionReportComponent } from './components/transaction-report/transaction-report.component';
import { GenerateBarcodesComponent } from './components/generate-barcodes/generate-barcodes.component';
import { GenerateLocCodesComponent } from './components/generate-loc-codes/generate-loc-codes.component';
import { SearchComponent } from './components/search/search.component';
import { APP_INITIALIZER } from '@angular/core';

import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import {ScannerDetectionModule} from 'ngx-scanner-detection';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export function ConfigLoader(configService: AuthService) {
  //Note: this factory need to return a function (that return a promise)
  console.log("I am Here");
  console.log(environment.configFile);
    return () => configService.load(environment.configFile); 
  }

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    ConfirmationDialogComponent,
    DialogCommentsComponent,
    LoginComponent,
    ManageUserComponent,
    ChangePasswordComponent,
    FilterPipe,
    FilterArrayPipe,
    ApplicationParametersComponent,
    ProductMasterComponent,
    AddProductMasterComponent,
    ProductInventoryComponent,
    CheckInProductComponent,
    CheckOutProductComponent,
    DisplayProductReportComponent,
    DashboardComponent,
    NgbdSortableHeader,
    ScannerComponent,
    LocationComponent,
    LocationMasterComponent,
    ExcelImportExportComponent,
    TransactionReportComponent,
    GenerateBarcodesComponent,
    GenerateLocCodesComponent,
    SearchComponent,
    ForgotPasswordComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatSlideToggleModule,
    ChartsModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatSnackBarModule,
    OrderModule,
    NgbModule,BrowserAnimationsModule, 
    ReactiveFormsModule, 
    BrowserModule, 
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
   Ng2OdometerModule,
   MatExpansionModule,
   MatToolbarModule,
   MatSidenavModule,
   MatListModule,
   MatProgressBarModule,
   DragDropModule,
   MatPaginatorModule,
   AngularMultiSelectModule,
   MatSelectModule,
   MatProgressSpinnerModule,
   MatMenuModule,
   BarecodeScannerLivestreamModule,
   ScannerDetectionModule,
      
  ],
  exports: [
    FilterPipe,FilterArrayPipe,ProductMasterComponent,NgbdSortableHeader
  ],
  providers: [
    AuthService,
        {
            provide: APP_INITIALIZER,
            useFactory: ConfigLoader,
            deps: [AuthService],
            multi:true
        },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
        { provide: MAT_DIALOG_DATA, useValue: [] },{provide: MatDialogRef, useValue: {}},
      {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
      ],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmationDialogComponent, DialogCommentsComponent, AddProductMasterComponent, CheckInProductComponent, SearchComponent,
    CheckOutProductComponent,ScannerComponent,LocationComponent,ForgotPasswordComponent]

})
export class AppModule { }
