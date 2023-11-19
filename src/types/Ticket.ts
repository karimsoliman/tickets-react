import { TicketStatus } from "./TicketStatus";

export interface Ticket {
    id: number;
    phoneNumber: string;
    governorate: string;
    city: string;
    district: string;
    status: TicketStatus;
    color: string;
};