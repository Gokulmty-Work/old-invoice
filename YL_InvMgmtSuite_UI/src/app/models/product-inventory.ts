import { NumericLiteral } from 'typescript';
import { ReEntryLogs } from './re-entry-logs';

export class ProductInventory {

    id: number;
    masterId: string;
    skuId: string;
    checkInDate: Date;
    checkInType: string;
    checkOutDate: Date;
    checkOutType: string;
    entryCount: number;
    checkedIn: boolean;
    locationCode: string;
    entryType: string;
    user: string;
    reEntryLogs: ReEntryLogs[];

}