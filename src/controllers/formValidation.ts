interface Values {
    firstName?: string;
    lastName?: string;
    message?: string;
}

interface Errors {
    firstName: string;
    message: string;
    main: string;
}

const validateForm = (values: Values | Record<string, unknown>) => {
    const errors: Errors | Record<string, unknown> = {};
    const { firstName, message }: Values = values;

    if (!firstName) return { ...errors, firstName: `Please fill username` };
    if (!message) return { ...errors, message: `Please fill password` };

    return {};
};

export default validateForm;
