import { EventEmitter } from "events";

class EventBus extends EventEmitter {}

export const eventBus = new EventBus();

// Optionally, define strongly typed event payloads if necessary
// interface EventMap {
//   'user.created': (user: any) => void;
//   'property.updated': (property: any) => void;
// }
