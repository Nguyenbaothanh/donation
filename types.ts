export enum DonationStatus {
    PENDING = 'Pending',
    APPROVED = 'Approved',
    REJECTED = 'Rejected',
    DELIVERED = 'Delivered',
}

export interface DonationItem {
    id: string;
    itemName: string;
    description: string;
    quantity: number;
    category: string;
    imageUrl: string;
    donorName: string;
    donorId: string;
    donorPhoneNumber: string;
    donorAddress: string;
    status: DonationStatus;
    submittedAt: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    role: 'donor' | 'admin';
}
