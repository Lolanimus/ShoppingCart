import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import userEvent from '@testing-library/user-event'
import QuantityChanger from './QuantityChanger';
import Cart from "../../cart";
import { addToCart } from '../../shoppingCartApi';

describe("QuantityChanger", () => {
    it("renders correctly", () => {
        render(<QuantityChanger />);
        expect(screen.getByRole('button', { name: '-' }));
        expect(screen.getByRole('span', { name: {3} }));
        expect(screen.getByRole('button', { name: '+' }));
    })
})