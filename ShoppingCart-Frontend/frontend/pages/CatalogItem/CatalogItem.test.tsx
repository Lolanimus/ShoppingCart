import { render, within, screen, waitFor } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import { contents } from "../../__mocks__/data";
import CatalogItem from './CatalogItem';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const catalogLoader = vi.fn((index: number) => contents[index].product);

describe("CatalogItem", () => {
    const id = 1;
    const gender = "men"
    it("renders correctly", async () => {
        const user = userEvent.setup();
        
        const router = createMemoryRouter([
            {
              path: "/product/all/:gender/:id",
              element: <CatalogItem />,
              loader: vi.fn().mockImplementation(() => catalogLoader(id))
            }
          ], { initialEntries: ["/product/all/" + gender + "/" + id] });
        render(<RouterProvider router={router}/>);

        await waitFor(() => expect(screen.getByRole("heading", {name: contents[id].product.productName})).toBeInTheDocument());
        expect(screen.getByRole("img", {name: contents[id].product.productName})).toBeInTheDocument();
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
