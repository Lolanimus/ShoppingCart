import { render, screen, waitFor } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import Catalog, { ReturnCatalog } from './Catalog';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { contents } from "../../__mocks__/data";
import userEvent from '@testing-library/user-event';
import { beforeEach } from 'node:test';

const catalog: CatalogArr = [contents[0].product, contents[1].product, contents[2].product];

const catalogLoader =  vi.fn((gender: "male" | "female") => ({
    returnCatalog: catalog,
    gender: gender
  } as ReturnCatalog));

function renderCatalog(gender: "male" | 'female') {
    const user = userEvent.setup();
    const router = createMemoryRouter([
        {
          path: `/product/all/:gender`,
          element: <Catalog />,
          loader: vi.fn().mockImplementation(() => catalogLoader(gender))
        }
      ], { initialEntries: ["/product/all/" + gender] });
    render(<RouterProvider router={router}/>);
    
    return {
      user
    }
  }

beforeEach(() => {
    vi.resetAllMocks();
})

describe("Catalog", () => {
    it("renders correctly", async () => {
        renderCatalog("male");
        await waitFor(() => expect(screen.getByRole("heading", {name: "• Men"})));
        expect(screen.getAllByRole("region"));
    })
})

describe("Item", () => {
    const item = catalog[2];

    it("renders correctly", async () => {
        renderCatalog("female");
        await waitFor(() => expect(screen.getByText(item.productName)));
        expect(screen.getAllByTestId("name")[2].textContent).toBe(item.productName);
        expect(screen.getByText(`$${item.productPrice}`));
        expect((screen.getAllByRole('button', {name: "See more"})).length).toBe(3);
    })
})