import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { expect, describe, it, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event'
import QuantityChanger from './QuantityChanger';
import * as data from "../../__mocks__/data";
import { clearCart, addToCart } from '../../shoppingCartApi';
import { getCart } from '../../cart';
import { useSyncExternalStore } from 'react';
import store from '../../store';

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
        const { result } = renderHook(() => useSyncExternalStore(store.subscribe, store.getSnapshot));
        const storeHook = result.current;
        render(<QuantityChanger storeHook={storeHook[id]} key={storeHook[id].id}/>);
        expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
        expect(screen.getByTestId("quantity")).toBeInTheDocument();
        expect(screen.getByTestId("quantity").textContent).toBe("" + getCart()[id].quantity);
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    })

    it("increases/decreases quantity", async () => {
        const user = userEvent.setup();
        const { result } = renderHook(() => useSyncExternalStore(store.subscribe, store.getSnapshot));
        const storeHook = result.current;
        render(<QuantityChanger storeHook={storeHook[id]} key={storeHook[id].id}/>);
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