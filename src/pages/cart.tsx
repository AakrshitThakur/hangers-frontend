"use client";
import { Plus, Minus, ShoppingCart, Trash2 } from "lucide-react";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  { _id: "1", title: "Wireless Headphones", price: 99.99, quantity: 1 },
  { _id: "2", title: "Mechanical Keyboard", price: 149.99, quantity: 2 },
  { _id: "3", title: "USB-C Hub", price: 49.99, quantity: 1 },
];

export default function Cart() {
  return (
    <div id="cart" className="w-full min-h-[85vh] flex flex-col justify-center items-center p-5 sm:p-7 md:p-9">
      <div className="color-base-200 color-base-content shrink-0 w-full max-w-5xl flex flex-col justify-center items-center gap-3 rounded-xl p-3 sm:p-5 md:p-7">
        <div className="flex items-center gap-2">
          <span className="color-primary color-primary-content shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full overflow-hidden p-1.5">
            <ShoppingCart strokeWidth={1.25} className="w-full h-full" />
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Your Cart</h2>
        </div>

        {initialCartItems.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <div className="color-base-300 color-base-content w-full max-w-3xl space-y-3 rounded-lg p-1">
            {/* Cart Items */}
            <div className="space-y-3 p-2 sm:p-3">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,150px))] justify-center gap-3 px-3 py-2 text-base font-medium rounded-lg">
                <div className="text-center">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-center">Total</div>
              </div>

              {initialCartItems.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-[repeat(auto-fit,minmax(100px,150px))] justify-center gap-3 color-info color-info-content box-content px-3 py-2 text-base font-medium rounded-lg"
                >
                  <div className="flex justify-center items-center text-center font-medium">{item.title}</div>

                  <div className="flex justify-center items-center text-center">${item.price.toFixed(2)}</div>

                  {/* add to shopping cart */}
                  <div className="flex items-center justify-center gap-2">
                    <div className="color-base-100 color-base-content flex justify-center items-center gap-1 rounded-md p-1">
                      <span className="color-success color-success-content inline-block w-5 h-5 rounded-full overflow-hidden cursor-pointer p-0.5">
                        <Plus className="w-full h-full" />
                      </span>
                      <span className="flex justify-center items-center text-base rounded-sm w-7 h-7">0</span>
                      <span className="color-error color-error-content inline-block w-5 h-5 rounded-full overflow-hidden cursor-pointer p-0.5">
                        <Minus className="w-full h-full" />
                      </span>
                    </div>
                    <span className="inline-block w-6 h-6 rounded-full overflow-hidden cursor-pointer p-0.5">
                      <Trash2 strokeWidth={1.25} className="w-full h-full" />
                    </span>
                  </div>

                  <div className="flex justify-center items-center font-medium text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="rounded-lg border border-border bg-card p-3">
              <div className="flex items-center justify-between p-3">
                <span className="text-lg text-muted-foreground">Subtotal</span>
                <span className="text-2xl font-bold text-foreground">$2569</span>
              </div>
              <button className="color-warning color-warning-content w-full text-base rounded-lg cursor-pointer px-3 py-3">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
