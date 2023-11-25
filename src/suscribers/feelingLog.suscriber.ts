import { EmotionalLog } from "src/entity/emotionalLog.entity";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";

@EventSubscriber()
export class FeelinLogSuscriber implements EntitySubscriberInterface<EmotionalLog> {

    listenTo() {
        return EmotionalLog;
    }

    async beforeInsert(event: InsertEvent<EmotionalLog>) {
        event.entity.fecha = new Date();
    }
    
}