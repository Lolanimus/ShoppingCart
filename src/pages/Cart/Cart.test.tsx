import { render, screen, waitFor } from '@testing-library/react';
import { expect, describe, it, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import * as data from "../../__mocks__/data";
import Cart from '../Cart/Cart';
import { getTotalPrice, clearCart, addToCart } from '../../shoppingCartApi';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import CartItems from '../CartItems/CartItems';
import { cartItemsLoader, cartLoader } from '../../routerMethods';


function renderCart() {
    const user = userEvent.setup();
    const router = createMemoryRouter([
        {
            path: "/cart",
            element: <Cart />,
            loader: cartLoader,
            children: [
                {
                    path: '/cart',
                    element: <CartItems />,
                    loader: cartItemsLoader
                }
            ]
        }
    ], { initialEntries: ["/cart"] });

    const { container } = render(<RouterProvider router={router}/>);
    
    return {
        container,
        user
    }
}


describe("Cart", () => {
    beforeEach(() => {
        clearCart();
        addToCart(data.contents[0]);
    })
    
    afterEach(() => {
        clearCart();
    })

    describe("renders correctly", () => {
        it("with total price", async () => {
            renderCart();
            await waitFor(() => expect(screen.getByRole("heading", {level: 1})).toBeInTheDocument());
            const cartItems = screen.getByTestId("itemsList"); 
            const totalLabel = screen.getByText("Total");
            expect(cartItems).toBeInTheDocument();
            expect(totalLabel).toBeInTheDocument();
            const total = screen.getByTestId("total");
            const buyBtn = screen.getByRole("button", {name: "Buy"});
            expect(total.textContent).toBe("$" + getTotalPrice());
            expect(buyBtn).toBeEnabled();
            
        })

        it("without total price", async () => {
            clearCart();
            renderCart();
            await waitFor(() => screen.getByTestId("total"));
            const buyBtn = screen.getByRole("button", {name: "Buy"});
            expect(screen.getByTestId("total").textContent).toBe("N/A");
            expect(buyBtn).toBeDisabled();
        })
    })

    describe("functionality", () => {
        it("buy button works", async () => {
            const { user } = renderCart();
            await waitFor(() => screen.getByRole("button", {name: "Buy"}));
            const buyBtn = screen.getByRole("button", {name: "Buy"});
            await user.click(buyBtn);
            expect(screen.getByTestId("dialog-true")).toBeInTheDocument();
            const closeDialogBtn = screen.getByRole("button", {name: "Close"});
            expect(closeDialogBtn).toBeInTheDocument();
            await user.click(closeDialogBtn);
            expect(screen.getByTestId("dialog-false")).toBeInTheDocument();
            expect(screen.getByText("There are no items in your cart yet...")).toBeInTheDocument();
        })
    })
})