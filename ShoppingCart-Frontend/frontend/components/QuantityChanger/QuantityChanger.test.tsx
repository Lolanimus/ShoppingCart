import { render, screen, waitFor } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import userEvent from '@testing-library/user-event'
import QuantityChanger from './QuantityChanger';
import { server } from '../../__mocks__/node.ts';
import { contents } from '../../__mocks__/data.ts';
import { getWasDecremented, getWasIncremented } from '../../__mocks__/handlers';
const id = 0;

server.listen();

describe("QuantityChanger", () => {    
    it("renders correctly", () => {
        const item = contents[id];
        render(<QuantityChanger context={item} />);
        expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
        expect(screen.getByTestId("quantity")).toBeInTheDocument();
        expect(screen.getByTestId("quantity").textContent).toBe("" + contents[id].quantity);
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    })

    it("increases/decreases quantity", async () => {
        const item = contents[id];
        const user = userEvent.setup();
        render(<QuantityChanger context={item} />);
        const increases = screen.getByRole('button', { name: "+" });
        const decreases = screen.getByRole('button', { name: "-" });
        await user.click(increases);
        waitFor(() => {
            expect(getWasIncremented()).toBeTruthy();
        });
        await user.click(decreases);
        waitFor(() => {
            expect(getWasDecremented()).toBeTruthy();
        })
    })
})