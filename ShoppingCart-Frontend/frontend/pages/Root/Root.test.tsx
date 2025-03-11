import { render, screen, within } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import Root from './Root';
import { MemoryRouter } from 'react-router-dom';

function renderRouter() {
    render(
        <MemoryRouter>
            <Root />
        </MemoryRouter>
    )
}

describe("Root", () => {
    it("renders ccorrectly", () => {
        renderRouter();

        // Header
        const header = screen.getByRole("banner");
        const genderNav = within(header).getByRole("navigation");
        const logo = within(header).getByRole("img", {name: "Lolan Logo"});
        const cart = within(header).getByRole("presentation");
        expect(header).toBeInTheDocument();
        expect(genderNav).toBeInTheDocument();
        expect(logo).toBeInTheDocument();
        expect(cart).toBeInTheDocument();

        // Footer
        const footer = screen.getByRole("contentinfo");
        expect(footer).toBeInTheDocument();
    })
})