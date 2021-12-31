export interface RootState {
  pins: DBRow[];
  isShowPins: boolean | undefined;
  dbReady: boolean;
}

export interface AdminState {
  items: Item[];
  cats: DBRow[];
  pins: DBRow[];
  fee?: number;
  units: DBRow[];
}

export interface PurchasesState {
  receiptItems: Item[];
  items: Item[];
  cats: DBRow[];
  units: DBRow[];
}

export interface SalesState {
  items: Item[];
  cats: DBRow[];
  billItems: Item[];
}

export interface StockState {
  receipts: Receipt[];
  items: Item[];
  cats: DBRow[];
  units: DBRow[];
}

export interface Item {
  key: number;
  value: {
    name: string;
    count?: number;
    quantity?: number;
    price?: number;
    p1?: number;
    p2?: number;
    unit: string;
    cat: string;
    uid: number;
    cid: number;
  };
}

export interface Row {
  key?: number | string;
  value: any;
}

export interface DBRow {
  key: number | string;
  value: any;
}

export interface DBItem {
  key: number;
  value: {
    name: string;
    count: number;
    p1: number;
    p2: number;
    uid: number;
    cid: number;
  };
}

export interface Receipt {
  key: number;
  value: {
    items: Item[];
    d: string;
    x: boolean;
  };
}

export interface Bill {
  key: number;
  value: {
    items: Item[];
    d: string;
  };
}
