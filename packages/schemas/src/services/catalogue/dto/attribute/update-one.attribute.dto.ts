import {IAttributeType} from "../../resources/IAttribute";

export interface UpdateOneAttributeRequest {
    id: number;
    name: string;
    description: string;
    type: IAttributeType;
    unit: string;
}
export interface UpdateOneAttributeResponse {
    id: number;
    name: string;
    description: string;
    type: IAttributeType;
    unit: string;
}
