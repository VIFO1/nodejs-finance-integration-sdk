import HeaderInterface from "../Interfaces/HeaderInterface";

function validateCreateOrder(headers: HeaderInterface, body: object): string[] {
    const errors = [];

    if (typeof headers !== 'object') {
        errors.push('headers must be a non-empty object');
    }
    if (typeof body !== 'object') {
        errors.push('body must be a non-empty object');
    }

    const requiredFields = [
        'product_code',
        'phone',
        'fullname',
        'final_amount',
        'distributor_order_number',
        'benefiary_account_no',
        'benefiary_bank_code',
        'comment',
    ];

    requiredFields.forEach((field) => {
        if (!(field in body)) {
            errors.push(`${field} is required.`);
        }
    });

    return errors;
}

export default validateCreateOrder;
