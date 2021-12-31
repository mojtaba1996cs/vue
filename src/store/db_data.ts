export default {
  db_name: 'selco',
  db_version: 1,
  stores: {
    settings: {
      fee: 30,
      'show:pins': true,
      'pin:admin': '0000',
      'pin:purchases': '0001',
      'pin:sales': '0002',
      'pin:stock': '0003',
    },
    units: ['متر', 'كيلو', 'حبة', 'جوال'],
    cats: ['بناء', 'كهرباء', 'سباكة', 'أدوات', 'اخرى'],
    items: [
      { name: 'سيخ اﻷسعد', count: 0, p1: 0, p2: 0, cid: 1, uid: 3 },
      { name: 'سيخ ابانوب', count: 0, p1: 0, p2: 0, cid: 1, uid: 3 },
      { name: 'اسمنت عطبرة', count: 0, p1: 0, p2: 0, cid: 1, uid: 4 },
      { name: 'اسمنت صخر السودان', count: 0, p1: 0, p2: 0, cid: 1, uid: 4 },
      { name: 'بلك واحد خط', count: 0, p1: 0, p2: 0, cid: 3, uid: 3 },
      { name: 'موتور موية واحد حصان', count: 0, p1: 0, p2: 0, cid: 3, uid: 3 },
    ],
    receipts: [],
    bills: [],
  },
} as Record<string, any>;
