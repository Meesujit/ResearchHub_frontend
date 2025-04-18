// src/dto/event.dto.ts
export class EventDto {
    _id?: string;
    name: string;
    description?: string;
    date: string;
    location?: string;
    image?: string;
    createdBy?: {
        _id: string;
        name: string;
        email: string;
    };
    participants?: string[] | undefined;
    isPublic?: boolean;

    constructor() {
        this.name = '';
        this.description = '';
        this.date = '';
        this.location = '';
        this.image = '';
        this.isPublic = false;
    }
}
