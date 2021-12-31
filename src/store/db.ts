import dbData from './db_data';
import _ar from '../_ar';
import { DBRow, Row, DBItem, Item, Receipt, Bill } from '../index';
import { deepCopy } from '@/helpers';
import moment from 'moment';

const TAG = 'DB';

// BILLS //
async function getBills() {
  const rows = await getRows(['bills']);
  return rows;
}

async function setBill(items: Item[]) {
  if (items.length == 0) throw new Error('Wrong Items');

  items.forEach((item) => correct(item));

  const rows = await getRows(
    ['items'],
    items.map((item) => item.key)
  );

  for (const row of rows) {
    for (const item of items) {
      if (item.key == row.key) {
        if (item.value.quantity! > row.value.count)
          throw new Error('No Enouph Count');
        row.value.count -= item.value.quantity!;
      }
    }
  }

  await setRows([
    {
      name: 'bills',
      rows: [
        {
          value: {
            items,
            d: moment().format('YYYY-MM-DD HH:mm:ss'),
          },
        },
      ],
    },
    { name: 'items', rows, update: true },
  ]);

  return rows;
}

// RECEIPTS //
async function getReceipts() {
  const rows = await getRows(['receipts']);
  return rows.filter((row) => row.value.x == false) as Receipt[];
}

async function setReceipt(items: Item[]) {
  if (!items || items.length <= 0) throw new Error('Wrong Items');

  items.forEach((item) => correct(item));

  const fee = await getFee();

  for (const item of items) {
    const price = item.value.price;
    const quantity = item.value.quantity;
    if (!price || !quantity) throw new Error('Wrong Price Or Count');
    const p1 = Math.round(price / quantity);
    const p2 = Math.round(p1 + p1 * (fee / 100));
    item.value.p1 = p1;
    item.value.p2 = p2;
  }
  setRows([
    {
      name: 'receipts',
      rows: [
        {
          value: {
            items,
            d: moment().format('YYYY-MM-DD HH:mm:ss'),
            x: false,
          },
        },
      ],
    },
  ]);
}

async function confirmReceipt(key: number) {
  const receipt = (await getRows(['receipts'], [key]))[0] as Receipt;

  const rows = (await getRows(
    ['items'],
    receipt.value.items.map((item) => item.key)
  )) as DBItem[];

  for (const row of rows) {
    for (const item of receipt.value.items) {
      if (item.key == row.key) {
        const quantity = item.value.quantity;
        const p1 = item.value.p1;
        const p2 = item.value.p2;
        if (!quantity || !p1 || !p2) throw new Error('Wrong Count Or P1 Or P2');
        row.value.count += quantity;
        row.value.p1 = p1;
        row.value.p2 = p2;
      }
    }
  }

  receipt.value.x = true;

  await setRows([
    { name: 'receipts', rows: [receipt], update: true },
    { name: 'items', rows, update: true },
  ]);

  return rows;
}

// UNITS //
async function getUnits() {
  const rows = await getRows(['units']);
  return rows;
}

async function setUnit(unit: Row, update = false) {
  setRows([{ name: 'units', rows: [unit], update }]);
}

async function deleteUnit(rowKey: string) {
  if (!rowKey) throw new Error('Wrong RowKey');
  deleteRow('units', rowKey);
}

// CATS //
async function getCats() {
  const rows = await getRows(['cats']);
  return rows;
}

async function setCat(cat: Row, update = false) {
  setRows([{ name: 'cats', rows: [cat], update }]);
}

async function deleteCat(rowKey: string) {
  if (!rowKey) throw new Error('Wrong RowKey');
  deleteRow('cats', rowKey);
}

// ITEMS //
async function getItems() {
  const rows = await getRows(['items']);
  return rows;
}

async function setItem(item: DBItem, update = false) {
  correct(item);
  setRows([{ name: 'items', rows: [item], update }]);
}

async function deleteItem(rowKey: string) {
  if (!rowKey) throw new Error('Wrong RowKey');
  deleteRow('items', rowKey);
}

// PINS //
async function getPins() {
  const rows = await getRows(
    ['settings'],
    ['pin:admin', 'pin:purchases', 'pin:stock', 'pin:sales']
  );
  return rows;
}

async function setPin(pin: Row, update = false) {
  setRows([{ name: 'settings', rows: [pin], update }]);
}

async function getIsShowPins() {
  const rows = await getRows(['settings'], ['show:pins']);
  const row = rows[0];
  return row ? (row.value as boolean) : undefined;
}

async function setShowPins(isShowPins: boolean, update = false) {
  setRows([
    {
      name: 'settings',
      rows: [{ key: 'show:pins', value: isShowPins }],
      update,
    },
  ]);
}

// FEE //
async function getFee() {
  const rows = await getRows(['settings'], ['fee']);
  return rows[0].value as number;
}

async function setFee(fee: number) {
  const rows = await getRows(['items']);

  for (const row of rows) {
    const p1 = row.value.p1;
    row.value.p2 = Math.round(p1 + p1 * (fee / 100));
  }

  setRows([
    {
      name: 'settings',
      rows: [{ key: 'fee', value: parseInt(fee.toString()) }],
      update: true,
    },
    {
      name: 'items',
      rows,
      update: true,
    },
  ]);
}

// ROWS //
async function getRows(
  stores: string[],
  keys: (string | number)[] | undefined = undefined
) {
  const data: DBRow[] = [];
  const db = await getDB();
  return new Promise<DBRow[]>((resolve, reject) => {
    const trans = db.transaction(stores, 'readonly');
    trans.oncomplete = function() {
      resolve(data);
    };
    stores.forEach((name) => {
      const store = trans.objectStore(name);
      const req = store.openCursor();
      req.onerror = function(ev) {
        reject(this.error);
      };
      req.onsuccess = function() {
        const cursor = this.result;
        if (cursor) {
          const key = cursor.key as string | number;
          const value = cursor.value;
          if (keys) {
            if (keys.includes(key)) data.push({ key, value });
          } else {
            data.push({ key, value });
          }
          cursor.continue();
        }
      };
    });
  });
}

async function setRows(
  stores: {
    name: string;
    rows: Row[];
    update?: boolean;
  }[]
) {
  const db = await getDB();
  const storesNames = stores.map((store) => store.name);
  return new Promise<any[]>((resolve, reject) => {
    const trans = db.transaction(storesNames, 'readwrite');
    stores.forEach((s) => {
      const store = trans.objectStore(s.name);
      s.rows.forEach((row) => {
        let req;
        if (s.update == true) {
          req = store.put(row.value, row.key);
        } else {
          if (store.autoIncrement) row.key = undefined;
          req = store.add(row.value, row.key);
        }
        req.onerror = function(ev) {
          reject(this.error);
        };
        req.onsuccess = function() {
          resolve([this.result]);
        };
      });
    });
  });
}

async function deleteRow(storeName: string, rowKey: string) {
  const db = await getDB();

  return new Promise<any[]>((resolve, reject) => {
    const trans = db.transaction(storeName, 'readwrite');
    const store = trans.objectStore(storeName);
    const req = store.delete(rowKey);
    req.onerror = function(ev) {
      reject(this.error);
    };
    req.onsuccess = function() {
      resolve([this.result]);
    };
  });
}

// DB //
async function initialDB() {
  const stores = [];
  const storesNames = Object.keys(dbData.stores);
  for (const sn of storesNames) {
    const store = dbData.stores[sn];
    const rows = [];
    for (const key of Object.keys(store)) {
      rows.push({ key, value: store[key] });
    }
    stores.push({ name: sn, rows });
  }
  try {
    await setRows(stores);
    return 'DB Initialized';
  } catch (error) {
    throw error.message;
  }
}

function getDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const dbOpenReq = indexedDB.open(dbData.db_name, dbData.db_version);

    dbOpenReq.onerror = function(ev) {
      console.log(TAG, ev);
      reject(TAG + 'Error');
    };

    dbOpenReq.onsuccess = function() {
      resolve(this.result);
    };

    dbOpenReq.onupgradeneeded = function(ev) {
      console.log(TAG, `Version ${ev.newVersion} Created`);
      for (const key in dbData.stores) {
        if (Array.isArray(dbData.stores[key])) {
          this.result.createObjectStore(key, { autoIncrement: true });
        } else {
          this.result.createObjectStore(key);
        }
      }
    };
  });
}

export {
  getUnits,
  setUnit,
  deleteUnit,
  getCats,
  setCat,
  deleteCat,
  getItems,
  setItem,
  deleteItem,
  getPins,
  setPin,
  getIsShowPins,
  setShowPins,
  getFee,
  setFee,
  getReceipts,
  setReceipt,
  confirmReceipt,
  getBills,
  setBill,
  initialDB,
};

function correct(item: Record<string, any>) {
  const count = item.value.count;
  const quantity = item.value.quantity;
  const price = item.value.price;
  const p1 = item.value.p1;
  const p2 = item.value.p2;

  if (count) item.value.count = parseInt(count.toString());
  if (quantity) item.value.quantity = parseInt(quantity.toString());
  if (price) item.value.price = parseInt(price.toString());
  if (p1) item.value.p1 = parseInt(p1.toString());
  if (p2) item.value.p2 = parseInt(p2.toString());
}
