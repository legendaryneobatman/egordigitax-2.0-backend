import {IAttribute} from "../../resources/IAttribute";

export interface FindOneAttributeRequest {
    id: number;
}
export interface FindOneAttributeResponse {
    item: IAttribute;
}
