import { render, screen, within } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import GenderNav from './GenderNav';
import { MemoryRouter } from 'react-router-dom';

function renderRouter() {
    render(
        <MemoryRouter>
            <GenderNav />
        </MemoryRouter>
    )
}

describe("GenderNav", () => {
    it("renders the nav", () => {
        renderRouter();
        const nav = screen.getAllByRole("navigation")[0];
        expect(nav).toBeInTheDocument();
        const genderNavLinks = within(nav).getAllByRole("link");
        expect(genderNavLinks.length).toBe(2);
        expect(genderNavLinks[0].textContent).toBe("Men");
        expect(genderNavLinks[1].textContent).toBe("Women");
    });
});