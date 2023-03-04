import { JsonFormControlType } from "./json-form-control-type.type";
import { JsonFormValidatorsMessage } from "./json-form-validator-message.model";
import { JsonFormValidators } from "./json-form-validator.model";

export interface JsonFormControls {
    sortOrder: number;
    name: string;
    label: string;
    value: string | number | boolean | any;
    type: JsonFormControlType;
    validators: {
        type: JsonFormValidators;
        message: JsonFormValidatorsMessage;
    },
    mask: '';
}



