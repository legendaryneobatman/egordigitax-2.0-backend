import {IAttributeType} from "../../resources/IAttribute";

export interface CreateOneAttributeRequest {
    name: string;
    description: string;
    type: IAttributeType;
    unit: string;
}
export interface CreateOneAttributeResponse {
    id: number;
    name: string;
    description: string;
    type: IAttributeType;
    unit: string;
}
