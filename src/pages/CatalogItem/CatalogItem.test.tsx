import { render, within, screen, waitFor } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import * as data from "../../__mocks__/data";
import CatalogItem from './CatalogItem';
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

describe("CatalogItem", () => {
    const item = data.contents[0];
    it("renders correctly", async () => {
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
        await waitFor(() => expect(screen.getByRole("banner", {name: item.title})).toBeInTheDocument());
        expect(screen.getByRole("img", {name: item.title})).toBeInTheDocument();
        const main = screen.getByRole("main");
        expect(main).toBeInTheDocument();
        // section
        expect(within(main).getByRole("region")).toBeInTheDocument();
        const formSection = within(main).getByRole("complementary");
        expect(formSection).toBeInTheDocument();
        expect(within(formSection).getAllByLabelText("").length).toBe(['S', 'M', 'L', 'XL']);
        expect(within(formSection).getByRole("button", {name: "Add to Cart"}));
    })
})
