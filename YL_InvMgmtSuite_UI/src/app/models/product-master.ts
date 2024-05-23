export class ProductMaster {

    id: number;
    parentId: string;
    name: string;
    description: string;
    skuId : string;
    category: string;
    initDate: Date = new Date();
    active: boolean = false;
    inventory: number =0;
    reorderThreshold: number = 0;
        
    // For Reference
    checked: boolean;   
    
    // static generateSkuId(id: number): string {
    //     return id.toString();
    //   }


}