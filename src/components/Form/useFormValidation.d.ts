declare const useFormValidation: (options: any) => {
    errors: {
        [key: string]: string;
    };
    validateField: (name: string, value: string) => void;
    validateEmail: (email: string) => "" | "Email is required" | "Invalid email address";
    validatePhone: (phone: string) => "" | "Phone number is required" | "Invalid phone number";
    validateAddress: (address: string) => "" | "Address is required";
};
export default useFormValidation;
