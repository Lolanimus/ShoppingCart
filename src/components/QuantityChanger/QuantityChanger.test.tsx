import { render, screen } from '@testing-library/react';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event'
import QuantityChanger from './QuantityChanger';
import data from "../../__mocks__/data";
import { incrementQuantityCart, CartObj, clearCart, addToCart, getCart } from '../../shoppingCartApi';
import { act, createContext } from 'react';


describe("QuantityChanger", () => {    
    const id = 0;

    beforeEach(() => {
        clearCart();
        addToCart(data[id]);
    })

    afterEach(() => {
        clearCart();
    })

    it("renders correctly", () => {
        render(<QuantityChanger id={id} />);
        expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
        expect(screen.getByTestId("quantity")).toBeInTheDocument();
        expect(screen.getByTestId("quantity").textContent).toBe("" + getCart()[id].quantity);
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    })

    it("increases/decreases quantity", async () => {
        const user = userEvent.setup();
        render(<QuantityChanger id={id} />);
        const increases = screen.getByRole('button', { name: "+" });
        const quantity = screen.getByTestId("quantity");
        await act(async () => {
            await user.click(increases);
        })
        expect(quantity.textContent).toBe("2");
    })
})