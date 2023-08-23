const REVIEW_KEY = "REVIEWS";

export const reviewsKey = {
  getReviewsById: (userId: string) => [REVIEW_KEY, "getReviewsById", userId] as const,
  getReviews: () => [REVIEW_KEY, "getReviews"] as const
} as const;
