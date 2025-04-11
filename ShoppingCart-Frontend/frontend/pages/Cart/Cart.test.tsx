import { render, screen, waitFor } from '@testing-library/react';
import { expect, describe, it, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { contents } from "../../__mocks__/data";
import Cart from '../Cart/Cart';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { cartLoader } from '../../routerMethods';
import { getTotalPrice } from '../../shoppingCartApi';

let cart: CartArr = [contents[0], contents[1]];

vi.mock("../../routerMethods.ts", () => ({
    cartLoader: vi.fn(() => cart)
}));

function renderCart(clear: boolean = false) {
    if(clear)
        cart = [];
    const user = userEvent.setup();
    const router = createMemoryRouter([
        {
            path: "/cart",
            element: <Cart />,
            loader: () => cartLoader(``)
        }
    ], { initialEntries: ["/cart"] });

    const { container } = render(<RouterProvider router={router}/>);
    
    return {
        container,
        user
    }
}


describe("Cart", () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe("renders correctly", () => {
        it("with total price", async () => {
            renderCart();
            await waitFor(() => expect(screen.getByRole("heading", {level: 1, name: "Cart"})).toBeInTheDocument());
            const cartItems = screen.getByTestId("itemsList"); 
            const totalLabel = screen.getByText("Total");
            expect(cartItems).toBeInTheDocument();
            expect(totalLabel).toBeInTheDocument();
            const total = screen.getByTestId("total");
            const buyBtn = screen.getByRole("button", {name: "Buy"});
            expect(total.textContent).toBe("$" + getTotalPrice(await cartLoader(``)));
            expect(buyBtn).toBeEnabled();
        })

        it("without total price", async () => {
            renderCart(true);
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
            expect(screen.getByText("There are no items in your cart yet...")).toBeInTheDocument();
        })
    })
})