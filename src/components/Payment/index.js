import React from "react";
import Summary from "./Summary";
import { useSelector } from "react-redux";

export default function Payment() {
  const { subTotal, shipping } = useSelector((state) => state.cart);
  const totals = parseFloat(subTotal) + shipping;
  return (
    <section class="h-screen py-12 sm:py-16 lg:py-20 mb-10">
      <div class="mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div class="flex items-center justify-center">
          <h1 class="text-2xl font-semibold text-gray-900">Your Cart</h1>
        </div>

        <div class="mx-auto mt-8 max-w-2xl md:mt-12">
          <div class=" shadow">
            <div class="px-4 py-6 sm:px-8 sm:py-10 bg-gray-700">
              <Summary />

              <div class="mt-6 border-t border-b py-2">
                <div class="flex items-center justify-between">
                  <p class="text-sm text-gray-400">Subtotal</p>
                  <p class="text-lg font-semibold text-gray-900">
                    $ {subTotal.toFixed(2)}
                  </p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-sm text-gray-400">Shipping</p>
                  <p class="text-lg font-semibold text-gray-900">{shipping}</p>
                </div>
              </div>
              <div class="mt-6 flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Total</p>
                <p class="text-2xl font-semibold text-gray-900">
                  <span class="text-xs font-normal text-gray-400">USD</span>{" "}
                  {totals.toFixed(2)}
                </p>
              </div>

              <div class="mt-6 text-center">
                <button
                  type="button"
                  class="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                >
                  Checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
