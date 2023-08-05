// https://uibakery.io/regex-library/phone-number
import {Form, redirect, useActionData, useNavigation} from "react-router-dom";
import {createOrder} from "../../services/apiRestouran.js";
import {useState} from "react";

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
    <div>
      <h2>Ready to order? Lets go!</h2>

      <Form method={'POST'}>
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input
                type="tel"
                name="phone"
                placeholder={'+998-xx-xxx-xxxx'}
                required
                value={num}
                onChange={(e) => formatPhoneNumber(e.target.value)}
            />
            {formErrors?.phone && <p>{formErrors.phone}</p>}
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type={'hidden'} name={'cart'} value={JSON.stringify(cart)} />
          <button disabled={isSubmitting}>{isSubmitting ? "Ordering..." : "Order now"}</button>
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