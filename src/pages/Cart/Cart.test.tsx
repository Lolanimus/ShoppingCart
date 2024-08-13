import { render, screen } from '@testing-library/react';
import { expect, describe, it, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import * as data from "../../__mocks__/data";
import Cart from '../Cart/Cart';
import { addToCart } from '../../shoppingCartApi';
import { getTotalPrice, clearCart } from '../../shoppingCartApi';

function renderCart<T extends CatalogObj>(items: T | T[]) {
    const user = userEvent.setup();
    const itemsArray: T[] = Array.isArray(items) ? items : [items];
    itemsArray.forEach((obj) => {
        addToCart(obj);
    })

    render(<Cart />);
    
    return {
        user
    }
}

describe("Cart", () => {
    beforeEach(() => {
        clearCart();
    })
    
    afterEach(() => {
        clearCart();
    })

    describe("renders correctly", () => {
        it("with total price", () => {
            renderCart(data.contents);
            const cartLegend = screen.getByRole("heading", {level: 1});
            const cartItems = screen.getByTestId("itemsList"); 
            const totalLabel = screen.getByText("Total");
            expect(cartLegend).toBeInTheDocument();
            expect(cartItems).toBeInTheDocument();
            expect(totalLabel).toBeInTheDocument();
            const total = screen.getByTestId("total");
            const buyBtn = screen.getByRole("button", {name: "Buy"});
            expect(total.textContent).toBe("" + getTotalPrice());
            expect(buyBtn).toBeEnabled();
        })

        it("without total price", () => {
            render(<Cart />);
            const total = screen.getByTestId("total");
            const buyBtn = screen.getByRole("button", {name: "Buy"});
            expect(total.textContent).toBe("N/A");
            expect(buyBtn).toBeDisabled();
        })
    })

    describe("functionality", () => {
        it("buy button works", async () => {
            const { user } = renderCart(data.contents);
            const buyBtn = screen.getByRole("button", {name: "Buy"});
            await user.click(buyBtn);
            const dialog = screen.getByRole("dialog");
            expect(dialog).toBeInTheDocument();
            const closeDialogBtn = screen.getByRole("button", {name: "Close"});
            expect(closeDialogBtn).toBeInTheDocument();
            // await user.click(closeDialogBtn);
            // expect(dialog).not.toBeInTheDocument();
        })
    })
})