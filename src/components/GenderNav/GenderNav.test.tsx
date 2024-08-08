import { render, screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import GenderNav from './GenderNav';
import userEvent from '@testing-library/user-event';

describe("GenderNav", () => {
    const user = userEvent.setup();

    it("renders the nav", () => {
        render(<GenderNav />);
        expect(screen.getByRole("navigation")).toBeInTheDocument();
        const genderNavLinks = screen.getAllByRole("link");
        expect(genderNavLinks.length).toBe(2);
        expect(genderNavLinks[0].textContent).toBe("Men");
        expect(genderNavLinks[1].textContent).toBe("Women");
    });

    it("links work when you click on them", async () => {
        const spy = vi.spyOn(history, "pushState");
        render(<GenderNav />);
        const genderNavLinks = screen.getAllByRole("link");
        await user.click(genderNavLinks[0]);
        expect(spy).toBeCalledTimes(1);
        await user.click(genderNavLinks[1]);
        expect(spy).toBeCalledTimes(2);
    })
});