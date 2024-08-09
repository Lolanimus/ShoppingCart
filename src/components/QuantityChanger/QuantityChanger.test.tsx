import { render, screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event'
import QuantityChanger from './QuantityChanger';
import data from "../../__mocks__/data";
import { incrementQuantityCart, CartObj } from '../../shoppingCartApi';
import { createContext } from 'react';

const Cart = createContext({});

type CartChangerContext = {
    state: CartObj, 
    setState: typeof incrementQuantityCart
};

describe("QuantityChanger", () => {
    function renderQuantityChanger(context: CartChangerContext) {
        return render(
            <Cart.Provider value={context}>
                <QuantityChanger />
            </Cart.Provider>
        );
    }
    const context = {state: data[0], setState: incrementQuantityCart};
    // const user = userEvent.setup();

    it("renders correctly", () => {
        renderQuantityChanger(context);
        expect(screen.getByRole('button', { name: '-' }));
        expect(screen.getByRole('span', { name: context.state.title }));
        expect(screen.getByRole('button', { name: '+' }));
    })
})