import {IAttribute} from "../../resources/IAttribute";
import {SearchRequest, SearchResponse} from "@repo/schemas";

export interface FindManyAttributeRequest extends SearchRequest<IAttribute> {}
export interface FindManyAttributeResponse extends SearchResponse<IAttribute>{}
