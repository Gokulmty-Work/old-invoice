export class LocationMap {
  static generateLocationCode(locationRef_1: string, locationRef_2: string, locationRef_3: string): string {
    return "LC_"+locationRef_1+"_"+locationRef_2+"_"+locationRef_3;
  }

    id: number;
    locationCode: string;
    locationRef_1: string;
    locationRef_2: string;
    locationRef_3: string;
    skuIds: string[];

    constructor(locationRef_1?:string, locationRef_2?: string, locationRef_3?: string)
    {
        if(locationRef_1 && locationRef_2 && locationRef_3)
        {
        this.locationCode = LocationMap.generateLocationCode(locationRef_1,locationRef_2,locationRef_3);
        this.locationRef_1 = locationRef_1;
        this.locationRef_2 = locationRef_2;
        this.locationRef_3 = locationRef_3;
    }   
}

//  public generateLocationCode(locationRef_1:string, locationRef_2: string, locationRef_3: string)
//   {
//     return "LC_"+locationRef_1+"_"+locationRef_2+"_"+locationRef_3;
//   }

}