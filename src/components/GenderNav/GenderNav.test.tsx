import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import userEvent from '@testing-library/user-event'
import GenderNav from './GenderNav';

describe("GenderNav", () => {
    const user = userEvent.setup();

    it("renders the nav", () => {
        render(<GenderNav />);
        const nav = screen.getByRole("navigation") as HTMLElement;
        expect(nav).toBeInTheDocument();
        expect(screen.getByTestId("navLinkMen")).toBeInTheDocument();
        expect(screen.getByTestId("navLinkWomen")).toBeInTheDocument();
    });

    it("clicking links works", async () => {
        render(<GenderNav />);
        await user.click(screen.getByTestId("navLinkMen"));
        await user.click(screen.getByTestId("navLinkWomen"));

    });
});