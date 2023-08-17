import { CartSummary } from "@/components/Payment/Summary/cart-summary";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import cartEmpty from "/public/cart-empty.png";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { addItemCheckout } from "@/redux/slice/slice-checkout";
import { clearItem } from "@/redux/slice/slice-cart";

export default function Cart() {
  const dispatch = useDispatch();
  const { subTotal, shipping, totalQuantity, items } = useSelector(
    (state) => state.cart
  );
  const router = useRouter();
  const { token, role } = useSelector((state) => state.users);
  const totals = parseFloat(subTotal) + shipping;

  useEffect(() => {
    if (!token) {
      router.push("/signin");
    } else if (role != "user") {
      router.push("/");
    }
  }, [token, router, role]);

  const handleCheckout = () => {
    dispatch(addItemCheckout({ subTotal, shipping, totalQuantity, items }));
    dispatch(clearItem());
  };

  return (
    <section className="container mx-auto max-w-[1000px] mt-5 px-3">
      <Navbar />
      <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center md:items-start bg-white mt-8 min-h-[600px] rounded-xl shadow-lg">
        <div className="p-5 md:pr-0">
          <ul className="steps md:w-[570px] text-slate-500 mb-1">
            <li className="step step-primary">Choose Items</li>
            <li className="step step-primary">Add to Cart</li>
            <li className="step">Checkout</li>
            <li className="step">Payment</li>
          </ul>
          <h2 className="text-slate-800 title-font text-2xl font-bold">Cart</h2>

          {totalQuantity > 0 ? (
            items.map((item) => {
              return <CartSummary key={item.id} item={item} />;
            })
          ) : (
            <div className="flex flex-col items-center">
              <Image
                src={cartEmpty}
                width={250}
                height={250}
                priority={true}
                alt={`Cart is Empty`}
              />
              <h3 className="text-lg text-base-100 font-bold">
                Oops! Your Cart is Empty!
              </h3>
              <p className="text-base-100">
                Looks like you haven't added anything to your cart yet
              </p>
            </div>
          )}
        </div>
        <div className="w-96 p-6">
          {/* CART SUMMARY */}
          <div className="card sticky top-20 w-80 bg-[rgb(42,48,60)] shadow-xl h-[400px] p-5 flex flex-col justify-between">
            <h2 className="text-white title-font text-xl font-medium">
              Cart Summary
            </h2>
            <div>
              <p className="flex justify-between text-slate-200 title-font text-md font-semibold py-3 border-b-[1px] border-slate-300">
                Subtotal Price ({totalQuantity} Items){" "}
                <p>$ {subTotal.toFixed(2)} </p>
              </p>
              <p className="flex justify-between text-slate-200 title-font text-md font-semibold py-3 border-b-[1px] border-slate-300">
                Shipping <p>$ {shipping}</p>
              </p>
            </div>

            <div>
              <p className="flex justify-between text-slate-200 title-font text-xl font-semibold py-4">
                Total Price{" "}
                <p>
                  <span className=" text-green-500">USD </span> ${" "}
                  {totals.toFixed(2)}
                </p>
              </p>
              <Link href={"/checkout"} className="w-full">
                <button
                  className="btn btn-primary btn-block"
                  onClick={handleCheckout}
                >
                  Checkout (
                  <span className="text-lg px-1">{totalQuantity}</span>)
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
