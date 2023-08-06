// https://uibakery.io/regex-library/phone-number
import {Form, redirect, useActionData, useNavigation} from "react-router-dom";
import {createOrder} from "../../services/apiRestouran.js";
import {useState} from "react";
import Button from "../../ui/Button.jsx";

const isValidPhone = (str) => {
    const phoneRegex = /^\+998-\d{2}-\d{3}-\d{4}$/;
    return phoneRegex.test(str);
}

const fakeCart = [
    {
        pizzaId: 12,
        name: "Mediterranean",
        quantity: 2,
        unitPrice: 16,
        totalPrice: 32,
    },
    {
        pizzaId: 6,
        name: "Vegetale",
        quantity: 1,
        unitPrice: 13,
        totalPrice: 13,
    },
    {
        pizzaId: 11,
        name: "Spinach and Mushroom",
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
    },
];

function CreateOrder() {
    const navigation = useNavigation();
    const [num, setNum] = useState('+998');
    const isSubmitting = navigation.state === 'submitting'
    const formErrors = useActionData();
    // const [withPriority, setWithPriority] = useState(false);
    const cart = fakeCart;

    function formatPhoneNumber(input) {
        const cleanedNumber = input.replace(/\D/g, '');
        const countryCode = cleanedNumber.substring(0, 3);
        const group1 = cleanedNumber.substring(3, 5);
        const group2 = cleanedNumber.substring(5, 8);
        const group3 = cleanedNumber.substring(8, 12);

        let formattedNumber = `+${countryCode}`;
        if (group1) formattedNumber += `-${group1}`;
        if (group2) formattedNumber += `-${group2}`;
        if (group3) formattedNumber += `-${group3}`;

        setNum(formattedNumber);
    }

    return (
        <div className={'px-4 py-6'}>
            <h2 className={"mb-8 text-xl font-semibold"}>Ready to order? Lets go!</h2>

            <Form method={'POST'}>
                <div className={"mb-5 flex flex-col gap-2 sm:flex-row sm:items-center"}>
                    <label className={'sm:basis-40'}>First Name</label>
                    <input className={'input grow'} type="text" name="customer" required/>
                </div>

                <div className={'mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'}>
                    <label className={'sm:basis-40'}>Phone number</label>
                    <div className={'grow'}>
                        <input
                            type="tel"
                            name="phone"
                            placeholder={'+998-xx-xxx-xxxx'}
                            required
                            className={'input w-full'}
                            value={num}
                            onChange={(e) => formatPhoneNumber(e.target.value)}
                        />
                        {formErrors?.phone &&
                            <p className={"mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700"}>{formErrors.phone}</p>}
                    </div>
                </div>

                <div className={"mb-5 flex flex-col gap-2 sm:flex-row sm:items-center"}>
                    <label className={'sm:basis-40'}>Address</label>
                    <div className={'grow'}>
                        <input className={'input w-full'} type="text" name="address" required/>
                    </div>
                </div>

                <div className={"mb-12 flex items-center gap-5"}>
                    <input
                        className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                        type="checkbox"
                        name="priority"
                        id="priority"
                        // value={withPriority}
                        // onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
                </div>

                <div>
                    <input type={'hidden'} name={'cart'} value={JSON.stringify(cart)}/>
                    <Button disabled={isSubmitting} type="primary">
                        {isSubmitting ? "Ordering..." : "Order now"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export async function action({request}) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === "on"
    }
    // console.log(order)
    const errors = {}
    if (!isValidPhone(data.phone)) errors.phone = "Pls, give us ur correct phone number, we might contact with u!";
    if (Object.keys(errors).length > 0) return errors;
    const newOrder = await createOrder(order)
    return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;