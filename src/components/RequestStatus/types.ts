export interface FeaturingItemRequest {
    id: number;
    isApproved: boolean;
    from: number;
    to: number;
}

export interface RequestStatusParams extends FeaturingItemRequest {
    key: number;
    getOnRemoveHandler: (requestId: number) => () => void;
}
