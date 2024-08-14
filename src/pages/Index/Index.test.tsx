import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import Index from './Index';
import { MemoryRouter } from 'react-router-dom';

function renderRouter() {
    render(
        <MemoryRouter>
            <Index />
        </MemoryRouter>
    )
}

describe("Index", () => {
    it("renders correctly", () => {
        renderRouter();
        const name = screen.getByRole("heading", {level: 1});
        const descr = screen.getByRole("heading", {level: 2});
        const logo = screen.getByRole("img", {name: "Lolan Logo"});
        const genderNav = screen.getByRole("navigation");
        expect(name).toBeInTheDocument();
        expect(descr).toBeInTheDocument();
        expect(logo).toBeInTheDocument();
        expect(genderNav).toBeInTheDocument();
    })
})