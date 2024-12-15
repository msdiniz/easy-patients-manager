declare const useFormValidation: (options: any) => {
    errors: {
        [key: string]: string;
    };
    validateField: (name: string, value: string) => void;
};
export default useFormValidation;
