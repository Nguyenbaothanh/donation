import { DonationItem, DonationStatus, User } from '../types';

let mockDonations: DonationItem[] = [
    {
        id: 'd1',
        itemName: 'Winter Coats',
        description: 'A collection of 10 gently used winter coats for adults.',
        quantity: 10,
        category: 'Clothing',
        imageUrl: 'https://picsum.photos/seed/coats/400/300',
        donorName: 'Jane Donor',
        donorId: 'user-123',
        donorPhoneNumber: '555-0101',
        donorAddress: '123 Charity Lane, Kindness City, KS 12345',
        status: DonationStatus.APPROVED,
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
        id: 'd2',
        itemName: 'Canned Goods',
        description: 'A box of assorted canned vegetables and soups.',
        quantity: 24,
        category: 'Food',
        imageUrl: 'https://picsum.photos/seed/canned/400/300',
        donorName: 'John Smith',
        donorId: 'user-789',
        donorPhoneNumber: '555-0102',
        donorAddress: '456 Giving St, Hopeville, CA 98765',
        status: DonationStatus.PENDING,
        submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
        id: 'd3',
        itemName: 'Children\'s Books',
        description: '50 books for ages 5-10.',
        quantity: 50,
        category: 'Education',
        imageUrl: 'https://picsum.photos/seed/books/400/300',
        donorName: 'Jane Donor',
        donorId: 'user-123',
        donorPhoneNumber: '555-0101',
        donorAddress: '123 Charity Lane, Kindness City, KS 12345',
        status: DonationStatus.DELIVERED,
        submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
    {
        id: 'd4',
        itemName: 'First Aid Kits',
        description: '20 new first aid kits.',
        quantity: 20,
        category: 'Medical',
        imageUrl: 'https://picsum.photos/seed/aid/400/300',
        donorName: 'Helping Hands Org',
        donorId: 'org-111',
        donorPhoneNumber: '555-0103',
        donorAddress: '789 Support Ave, Compassion Town, TX 54321',
        status: DonationStatus.REJECTED,
        submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getDonations = async (): Promise<DonationItem[]> => {
    await delay(500);
    return [...mockDonations].sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
};

export const getDonationsByUserId = async (userId: string): Promise<DonationItem[]> => {
    await delay(500);
    return mockDonations
        .filter(d => d.donorId === userId)
        .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
};

export const addDonation = async (item: Omit<DonationItem, 'id' | 'status' | 'submittedAt'>): Promise<DonationItem> => {
    await delay(1000);
    const newDonation: DonationItem = {
        ...item,
        id: `d${Date.now()}`,
        status: DonationStatus.PENDING,
        submittedAt: new Date(),
    };
    mockDonations.unshift(newDonation);
    return newDonation;
};

export const updateDonationStatus = async (id: string, status: DonationStatus): Promise<DonationItem> => {
    await delay(500);
    const donationIndex = mockDonations.findIndex(d => d.id === id);
    if (donationIndex === -1) {
        throw new Error('Donation not found');
    }
    mockDonations[donationIndex].status = status;
    return mockDonations[donationIndex];
};

export const updateDonationQuantity = async (id: string, newQuantity: number): Promise<DonationItem> => {
    await delay(500);
    const donationIndex = mockDonations.findIndex(d => d.id === id);
    if (donationIndex === -1) {
        throw new Error('Donation not found');
    }
    mockDonations[donationIndex].quantity = newQuantity;
    return mockDonations[donationIndex];
};
