import { render, screen, waitFor } from '@testing-library/react';
import { expect, describe, it, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event'
import QuantityChanger from './QuantityChanger';
import * as data from "../../__mocks__/data";
import { clearCart, addToCart } from '../../shoppingCartApi';
import { getCart } from '../../cart';
import { ItemInfo } from '../../routerMethods';

const id = 0;

beforeEach(() => {
    clearCart();
    addToCart(data.contents[id]);
})

afterEach(() => {
    clearCart();
})

describe("QuantityChanger", () => {    
    it("renders correctly", () => {
        const item = getCart()[0];
        const itemInfo: ItemInfo = {
            itemId: item.id,
            size: item.size
        }    
        render(<QuantityChanger item={item} itemInfo={itemInfo}/>);
        expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
        expect(screen.getByTestId("quantity")).toBeInTheDocument();
        expect(screen.getByTestId("quantity").textContent).toBe("" + getCart()[id].quantity);
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    })

    it("increases/decreases quantity", async () => {
        const item = getCart()[0];
        const itemInfo: ItemInfo = {
            itemId: item.id,
            size: item.size
        }    
        const user = userEvent.setup();
        render(<QuantityChanger item={item} itemInfo={itemInfo}/>);
        const increases = screen.getByRole('button', { name: "+" });
        const decreases = screen.getByRole('button', { name: "-" });
        const quantity = screen.getByTestId("quantity");
        await user.click(increases);
        waitFor(() => {
            expect(quantity.textContent).toBe("2");
        });
        await user.click(decreases);
        waitFor(() => {
            expect(quantity.textContent).toBe("1");
        })
    })
})