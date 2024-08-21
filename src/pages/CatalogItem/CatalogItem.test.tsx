import { render, within, screen, waitFor } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import * as data from "../../__mocks__/data";
import CatalogItem from './CatalogItem';
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { writeHeapSnapshot } from 'v8';

describe("CatalogItem", () => {
    const item = data.contents[0];
    it("renders correctly", async () => {
        const user = userEvent.setup();
        const router = createMemoryRouter(
            createRoutesFromElements(
                <Route path='/catalog/:sex/:itemId' element={<CatalogItem />} 
                    loader={
                        () => item
                    }
                />
            ), { initialEntries: ['/catalog/men/1']}
        )
        render(<RouterProvider router={router} />);
        await waitFor(() => expect(screen.getByRole("heading", {name: item.title})).toBeInTheDocument());
        expect(screen.getByRole("img", {name: item.title})).toBeInTheDocument();
        const main = screen.getByRole("main");
        expect(main).toBeInTheDocument();
        // section
        expect(within(main).getByRole("region")).toBeInTheDocument();
        const formSection = within(main).getByRole("complementary");
        expect(formSection).toBeInTheDocument();
        expect(within(formSection).getByLabelText("S")).toBeInTheDocument();
        expect(within(formSection).getByRole("radio", {checked: true})).toBeInTheDocument();
        expect(within(formSection).getByLabelText("L")).toBeInTheDocument();
        expect(within(formSection).getByLabelText("M")).toBeInTheDocument();
        expect(within(formSection).getByLabelText("XL")).toBeInTheDocument();
        await user.click(within(formSection).getByLabelText("L"));
        expect(within(formSection).getByRole("radio", {name: "L"})).toBeChecked();
        expect(within(formSection).getByRole("button", {name: "Add to Cart"}));
    })
})
