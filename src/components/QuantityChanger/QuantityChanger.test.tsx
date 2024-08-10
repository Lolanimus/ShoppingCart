import { render, screen } from '@testing-library/react';
import { expect, describe, it, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event'
import QuantityChanger from './QuantityChanger';
import * as data from "../../__mocks__/data";
import { clearCart, addToCart } from '../../shoppingCartApi';
import { getCart } from '../../cart';


describe("QuantityChanger", () => {    
    const id = 0;

    beforeEach(() => {
        clearCart();
        addToCart(data.contents[id]);
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
        const decreases = screen.getByRole('button', { name: "-" });
        const quantity = screen.getByTestId("quantity");
        await user.click(increases);
        expect(quantity.textContent).toBe("2");
        await user.click(decreases);
        expect(quantity.textContent).toBe("1");
    })

    it("doesn't crash when quantity < 1", async () => {
        const user = userEvent.setup();
        render(<QuantityChanger id={id} />);
        const decreases = screen.getByRole('button', { name: "-" });
        await user.click(decreases);
        expect(screen.queryByTestId("quantityDiv")).not.toBeInTheDocument();
    })
})