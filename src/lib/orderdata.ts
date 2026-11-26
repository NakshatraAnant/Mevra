import 'server-only'; import { live } from './db';
export const orderItems = async (id: string) => [...await live()`SELECT i.*, (SELECT json_agg(l.lot_number) FROM order_lots ol JOIN lots l ON l.id = ol.lot_id WHERE ol.order_item_id = i.id AND l.published) AS lots FROM order_items i WHERE order_id = ${id} ORDER BY name`];
export const orderEvents = async (id: string) => [...await live()`SELECT kind, to_status, at FROM order_events WHERE order_id = ${id} AND kind = 'status' ORDER BY at`];
