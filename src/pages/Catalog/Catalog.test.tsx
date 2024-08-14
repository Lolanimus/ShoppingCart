import { render, screen, waitFor } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import Catalog from './Catalog';
import { Route, RouterProvider, createMemoryRouter, createRoutesFromElements } from 'react-router-dom';
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