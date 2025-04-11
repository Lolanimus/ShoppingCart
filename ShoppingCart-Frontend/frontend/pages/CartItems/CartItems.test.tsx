import { render, within, screen, waitFor } from '@testing-library/react';
import { expect, describe, it, afterEach, vi } from 'vitest';
import { contents } from "../../__mocks__/data"
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { cartLoader } from '../../routerMethods';
import Cart from '../Cart/Cart';

let cart: CartArr = [];

vi.mock("../../routerMethods.ts", () => ({
    cartLoader: vi.fn(() => cart)
}));

function renderCartItems(quantity: number) {
  cart = [];
  const user = userEvent.setup();
  for (let index = 0; index < quantity; index++) {
    cart.push(contents[index]);
  }
  const router = createMemoryRouter([
    {
      path: "/cart",
      element: <Cart />,
      loader: () => cartLoader(``)
    }
  ], { initialEntries: ["/cart"] });

  render(<RouterProvider router={router} />); 
  
  return {
    user
  }
}

describe("CartItems", () => {
  afterEach(() => {
    vi.resetAllMocks();
  })

  it("renders correctly(with size specified)", async () => {  
    const itemIndex = 1;
    renderCartItems(itemIndex + 1);
    await waitFor(() => expect(screen.getByTestId("itemsList")));
    const items = document.querySelectorAll('ul > li');
    const item = items[itemIndex] as HTMLElement;
    expect(within(item).getByRole("img").getAttribute('src')).toBe(contents[itemIndex].product.productImageUri);
    const itemInfo = within(item).getByRole("list");
    const itemTitle = within(itemInfo).getByTestId("title");
    expect(itemTitle.textContent).toBe(contents[itemIndex].product.productName);
    const itemSize = within(itemInfo).getByTestId("size");
    expect(itemSize.textContent).toBe("L");
    const itemQuantityChanger = within(itemInfo).getByTestId("quantityDiv");
    expect(itemQuantityChanger).toBeInTheDocument();
    const itemPrice = within(itemInfo).getByTestId("price");
    expect(itemPrice.textContent).contain("$" + contents[itemIndex].product.productPrice);
    const itemDeleteButton = within(itemInfo).getByRole("presentation", {name: 'delete'});
    expect(itemDeleteButton).toBeInTheDocument();
  })

  it("renders correctly(with size not specified)", async () => {
    renderCartItems(1);
    await waitFor(() => expect(screen.getByTestId("size")));
    const itemSize = screen.getByTestId("size");
    expect(itemSize.textContent).toBe("N/A");
  })

  it("renders correctly(no items in the cart)", async () => {
    renderCartItems(0);
    await waitFor(() => expect(screen.getByText("There are no items in your cart yet...")));
  })
})