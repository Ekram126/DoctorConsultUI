import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})


export class ValidationService {
    static validateIdentityNumber(identityNumber: string, lang: string): { isValid: boolean; errorMessage?: string } {
        if (!identityNumber) {
            return { isValid: true }; // Consider returning 'true' for empty strings
        }
        const identityNumberRegex = /^[0-9]{14}$/; // Adjust regex as needed
        const valid = identityNumberRegex.test(identityNumber);
        return {
            isValid: valid,
            errorMessage: valid ? undefined : lang == "en" ? 'Invalid identity number' : "الرقم القومي غير صحيح"
        };
    }
    static validatePhoneNumber(phoneNumber: string, lang: string): { isValid: boolean; errorMessage?: string } {
        // if (!phoneNumber) {
        //     return { isValid: true }; // Consider returning 'true' for empty strings
        // }

        if (!phoneNumber) {
            return { isValid: false, errorMessage: lang == "en" ? 'Insert phone number' : "ادخل رقم الهاتف" }; 
        }

        const phoneNumberRegex = /^[0-9]{9,20}$/; // Adjust regex as needed
        const valid = phoneNumberRegex.test(phoneNumber);
        return {
            isValid: valid,
            errorMessage: valid ? undefined : lang == "en" ? 'Invalid phone number' : "رقم الهاتف غير صحيح"
        };
    }
    static validateName(name: string, lang: string): { isValid: boolean; errorMessage?: string } {
        if (!name) {
            return { isValid: false, errorMessage: lang == "en" ? 'Name is required' : 'لابد من كتابة الاسم' }; // Return an error for empty strings
        }

        return { isValid: true };

        // const nameRegex = /^[a-zA-Z0-9\s]+$/; // Adjust regex as needed for name validation
        // const valid = nameRegex.test(name);

        // return {
        //     isValid: valid,
        //     errorMessage: valid ? undefined : lang == "en" ? 'Invalid name format' : "الاسم غير صحيح"
        // };
    }
    // static validateUserName(username: string, lang: string): { isValid: boolean; errorMessage?: string } {
    //     if (!username) {
    //         return { isValid: false, errorMessage: lang === 'en' ? 'Username is required' : 'لابد من كتابة اسم المستخدم' }; // Return an error for empty strings
    //     }

    //     // Remove spaces from the username
    //     username = username.replace(/\s/g, '');

    //     const nameRegex = /^[a-zA-Z0-9]+$/; // Adjust regex as needed for name validation without spaces
    //     const valid = nameRegex.test(username);

    //     return {
    //         isValid: valid,
    //         errorMessage: valid ? undefined : lang === 'en' ? 'Invalid username format (spaces not allowed)' : 'الاسم غير صحيح (لا يسمح بالمسافات)'
    //     };
    // }

    static validateUserName(username: string, lang: string): { isValid: boolean; errorMessage?: string } {
        // Check if the username is empty
        if (!username || username.trim() === '') {
            return {
                isValid: false,
                errorMessage: lang === 'en' ? 'Username is required' : 'لابد من كتابة اسم المستخدم'
            };
        }
    
        // If username is non-empty, it's valid
        return { isValid: true };
    }
    static validatePassword(password: string, lang: string): { isValid: boolean; errorMessage?: string } {
        if (!password) {
            return { isValid: false, errorMessage: lang === 'en' ? 'Password is required' : 'لابد من كتابة كلمة المرور' }; // Return an error for empty strings
        }
        return {
            isValid: true, // Assuming password is valid if not empty
            errorMessage: undefined
        };
    }
    static validateEmail(email: string, lang: string): { isValid: boolean; errorMessage?: string } {
        if (!email) {
            return { isValid: false,errorMessage: lang === 'en' ? 'email is required' : 'لابد من كتابة  البريد الإلكتروني'  }; // Consider returning 'true' for empty strings
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Adjust regex as needed
        const valid = emailRegex.test(email);
        return {
            isValid: valid,
            errorMessage: valid ? undefined : lang == "en" ? 'Invalid email' : "البريد الإلكتروني غير صحيح"
        };
    }


    static validateGender(number: any, lang: string): { isValid: boolean; errorMessage?: string } {
        // Check if the input is a valid number and greater than 0
        const isValid = number > 0;
        return {
            isValid,
            errorMessage: isValid ? undefined : (lang === "en" ? 'Gender is required' : 'اختر الجنس')
        };
    }

    
    static validateCountry(number: any, lang: string): { isValid: boolean; errorMessage?: string } {
        // Check if the input is a valid number and greater than 0
        const isValid = number > 0;
        return {
            isValid,
            errorMessage: isValid ? undefined : (lang === "en" ? 'Country is required' : 'اختر المدينة')
        };
    }
}
