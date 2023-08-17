import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";
import cartEmpty from "/public/cart-empty.png";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CheckoutSummary } from "@/components/Payment/Summary/checkout-summary";

export default function Checkout() {
  const { subTotal, shipping, totalQuantity, checkoutItems } = useSelector(
    (state) => state.checkout
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

  return (
    <section className="container mx-auto max-w-[1000px] mt-5 px-3">
      <Navbar />
      <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center md:items-start bg-white mt-8 min-h-[600px] rounded-xl shadow-lg">
        <div className="p-5 md:pr-0">
          <ul className="steps md:w-[570px] text-slate-500 mb-1">
            <li className="step step-primary">Choose Items</li>
            <li className="step step-primary">Add to Cart</li>
            <li className="step step-primary">Checkout</li>
            <li className="step">Payment</li>
          </ul>
          <h2 className="text-slate-800 title-font text-2xl font-bold">
            Checkout
          </h2>
          <p className="text-slate-800 title-font text-md font-semibold py-3 border-b-[1px] border-slate-300">
            Shipping Address
          </p>
          <div className="border-b-[1px] border-slate-300 pb-3">
            <p className="text-slate-800 title-font text-md font-semibold py-2 flex items-center gap-2">
              Rachmat Ghaly{" "}
              <span className="px-2 py-[1px] bg-purple-200 text-purple-600 rounded-md">
                main
              </span>
            </p>
            <p className="text-slate-800 title-font text-md font-normal">
              081234567812
            </p>
            <p className="text-slate-600 title-font text-sm font-normal">
              Wisma Nusantara, Gang Baru, Rt.003 Rw.002, Dramaga, Bogor, Jawa
              Barat. Kecamatan Dramaga, Kab. Bogor Provinsi Jawa Barat Kode Pos
              16680 Bogor Barat
            </p>
          </div>
          <div className="overflow-y-auto max-h-[300px]">
            {totalQuantity > 0 ? (
              checkoutItems?.map((item) => {
                return <CheckoutSummary key={item?.Id} data={item} />;
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
                  Oops! You haven't checkout yet!
                </h3>
                <p className="text-base-100">Let's make some checkout</p>
              </div>
            )}
          </div>
        </div>
        <div className="w-96 p-6">
          {/* Checkout SUMMARY */}
          <div className="card w-80 bg-[rgb(42,48,60)] shadow-xl h-[400px] p-5 flex flex-col justify-between">
            <h2 className="text-white title-font text-xl font-medium">
              Checkout Summary
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
              <Link href={"/payment"} className="w-full">
                <button className="btn btn-primary btn-block">
                  Payment (<span className="text-lg px-1">{totalQuantity}</span>
                  )
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
