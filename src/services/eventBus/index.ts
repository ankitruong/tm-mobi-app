import { EventBusEvents } from "@/interfaces/eventBus";
import { EventEmitter } from "expo";

const eventBus = new EventEmitter<EventBusEvents>();

export default eventBus;
