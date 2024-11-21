export type CreateReviewData = {
    eventId: number;
    userId: number;
    score: number;
    title: string;
    description?: string | null;
};
