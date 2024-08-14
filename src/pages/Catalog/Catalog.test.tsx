import { render, screen, waitFor } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import Catalog, { Item } from './Catalog';
import { MemoryRouter, Route, RouterProvider, createMemoryRouter, createRoutesFromElements } from 'react-router-dom';
import * as data from "../../__mocks__/data";
import { getCatalog } from '../../shoppingCartApi';

describe("Catalog", () => {
    it("renders correctly", async () => {
        const router = createMemoryRouter(
            createRoutesFromElements(
                <Route path='catalog/:sex' element={<Catalog />} 
                    loader={(() => { 
                        return {
                            returnCatalog: getCatalog("men", data.contents), 
                            gender: "men", 
                        }
                    })}
                />
            ), {initialEntries: ['/catalog/men']}   
        );
        render(<RouterProvider router={router}/>);
        await waitFor(() => expect(screen.getByRole("heading", {name: "Men"})));
        expect(screen.getAllByRole("region"));
    })
})

describe("Item", () => {
    const item = data.contents[0];

    it("renders correctly", () => {
        render(
            <MemoryRouter>
                <Item item={item}/>
            </MemoryRouter>
        );
        expect(screen.getByText(item.title));
        expect(screen.getByRole("img"))
        expect(screen.getByText(`$${item.price}`));
        expect(screen.getByRole('link'));
    })
})