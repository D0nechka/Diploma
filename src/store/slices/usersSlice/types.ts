export type User = {
    id: number;
    email: string;
    banned: boolean;
    banReason: null | string;
    roles: {
        id: number;
        value: string;
        description: string;
    }[];
};
