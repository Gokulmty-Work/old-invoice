import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthorizationGuard } from './authorization.guard';
import { ApplicationParametersComponent } from './components/application-parameters/application-parameters.component';
import { ProductMasterComponent } from './components/product-master/product-master.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductMasterComponent } from './components/add-product-master/add-product-master.component';
import { CheckOutProductComponent } from './components/check-out-product/check-out-product.component';
import { ProductInventoryComponent } from './components/product-inventory/product-inventory.component';
import { LocationMasterComponent } from './components/location-master/location-master.component';
import { ExcelImportExportComponent } from './components/excel-import-export/excel-import-export.component';
import { TransactionReportComponent } from './components/transaction-report/transaction-report.component';
import { GenerateBarcodeService } from './services/generate-barcode.service';
import { GenerateBarcodesComponent } from './components/generate-barcodes/generate-barcodes.component';
import { GenerateLocCodesComponent } from './components/generate-loc-codes/generate-loc-codes.component';
import { CheckInProductComponent } from './components/check-in-product/check-in-product.component';


const routes: Routes = [
     { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'error', component: ErrorComponent },

      {path: 'login', component: LoginComponent},

      {path: 'users', component: ManageUserComponent,canActivate:[AuthorizationGuard],
      data: { roles: ['ADMIN'] } },

     {path: 'changePassword', component: ChangePasswordComponent,canActivate:[AuthorizationGuard]
     , data: { roles: ['ADMIN', 'LEVEL_1','LEVEL_2'] } },
     
     {path: 'applicationParameters', component: ApplicationParametersComponent,canActivate:[AuthorizationGuard]
     , data: { roles: ['ADMIN'] } },
     
     {path: 'productMasterList', component: ProductMasterComponent,
     canActivate:[AuthorizationGuard],data: { roles: ['ADMIN', 'LEVEL_1'] } },

     {path: 'dashboard', component: DashboardComponent,canActivate:[AuthorizationGuard]
     ,data: { roles: ['ADMIN', 'LEVEL_1','LEVEL_2'] } },

     {path: 'addProductMaster', component: AddProductMasterComponent,
     canActivate:[AuthorizationGuard],data: { roles: ['ADMIN'] } },

     {path: 'checkout', component: CheckOutProductComponent,canActivate:[AuthorizationGuard]
     ,data: { roles: ['ADMIN', 'LEVEL_1','LEVEL_2'] }},

     {path: 'checkin', component: CheckInProductComponent,
     canActivate:[AuthorizationGuard],data: { roles: ['ADMIN', 'LEVEL_1'] } },

     {path: 'productInventory', component: ProductInventoryComponent,
     canActivate:[AuthorizationGuard],data: { roles: ['ADMIN', 'LEVEL_1'] }},

     {path: 'locationMaster', component: LocationMasterComponent,
     canActivate:[AuthorizationGuard],data: { roles: ['ADMIN', 'LEVEL_1'] }},

     {path: 'excelModule', component: ExcelImportExportComponent,
     canActivate:[AuthorizationGuard],data: { roles: ['ADMIN'] }},

     {path: 'transactionReport', component: TransactionReportComponent,
     canActivate:[AuthorizationGuard],data: { roles: ['ADMIN'] }},

     {path: 'barcodes', component: GenerateBarcodesComponent,
     canActivate:[AuthorizationGuard],data: { roles: ['ADMIN'] }},
 
     {path: 'locationCodes', component: GenerateLocCodesComponent,
     canActivate:[AuthorizationGuard],data: { roles: ['ADMIN'] }},
          
     ];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})


export class AppRoutingModule { }
