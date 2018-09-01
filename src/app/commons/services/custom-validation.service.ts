import { FormControl, FormGroup, NG_VALIDATORS } from '@angular/forms';
import { Component, Injectable, Inject, forwardRef, Directive } from '@angular/core';
// validation function

@Injectable()
export class CustomValidationService {
    MinLenghthValue(min: FormControl) {
            if(min && min.value >= 0 && min.value < 1000){
                return null;
            }
            else {
                return {minNumberValue : true};
            }

    }
    MaxLenghthValue(max: FormControl) {
            if(max && max.value < 1000){
                return null;
            }
            else {
                return {maxNumberValue : true};
            }

    }
     valueRelay(group: FormGroup) {
         let min = group.controls["meterMin"].value, max = group.controls["meterMax"].value, value = group.controls["meterValue"].value;
            if(value && min && max && value > min && value <= max){
                 return null;
            }
            else {
                if(max < min){
                    return {maxInValid : true};
                }else{
                    return {ValueInValid : true};
                }          
            }
    }
    validateConfirmPassword(group: FormGroup){
        let newPassword = group.controls["newPassword"].value, confirmPassword = group.controls["confirmPassword"].value;
        if(newPassword && confirmPassword && confirmPassword === newPassword){
            return null;
        }else{
            return {
                confirmPasswordInvalid : true
            }
        }
    }
     validateChangeConfirmPassword(group: FormGroup){
        let newPassword = group.controls["newPassword"].value, confirmPassword = group.controls["confirmPassword"].value, oldPassword = group.controls["oldPassword"].value;
         if(oldPassword != newPassword){
             if(newPassword && confirmPassword && confirmPassword === newPassword){
            return null;
        }
        else{
            return {
                confirmPasswordInvalid : true
            }
        }
        }else{
            return {
                oldNewPasswordSame : true
            }
        }
       
    }
}
