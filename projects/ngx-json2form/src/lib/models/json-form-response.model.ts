import { JsonFormControls } from "./json-form-control.model";
import { JsonFormDictionary } from "./json-form-dictionary.model";

export interface JsonFormResponse {
    controls: JsonFormControls[];
    dictionaries: JsonFormDictionary;
    api?: string;
}