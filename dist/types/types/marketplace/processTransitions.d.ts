import { ApiParameter, UUID } from '../sharetribe';
export type ProcessTransitionsEndpoints = 'query';
type Actors = 'customer' | 'provider' | 'operator' | 'system';
type RequestTypes = 'uuid' | 'string' | 'integer' | 'timestamp' | 'boolean' | 'object' | 'money' | ["lineItem"];
export interface ProcessTransition {
    id: UUID;
    type: 'processTransition';
    attributes: {
        name: string;
        actor: Actors[];
        actions: string[];
        params: {
            req: {
                [key: string]: RequestTypes;
            };
            opt: {
                [key: string]: RequestTypes;
            } | null;
        };
    };
}
export interface ProcessTransitionsParameter extends ApiParameter {
}
export interface ProcessTransitionsQueryParameter extends ProcessTransitionsParameter {
    processAlias?: string;
    lastTransition?: string;
    transactionId?: UUID | string;
}
type DataType<E extends ProcessTransitionsEndpoints> = E extends 'query' ? ProcessTransition : never;
export type ProcessTransitionsResponse<E extends ProcessTransitionsEndpoints> = {
    data: DataType<E>;
};
export {};
