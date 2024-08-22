import { render, within, screen, waitFor } from '@testing-library/react';
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import CartItems from './CartItems';
import { addToCart, clearCart, incrementQuantityCart } from '../../shoppingCartApi';
import * as data from "../../__mocks__/data"
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { cartItemsLoader } from '../../routerMethods';

function renderOneCartItem(itemIndex: number, size = 'm') {
  const user = userEvent.setup();
  addToCart(data.contents[itemIndex], size);
  const router = createMemoryRouter([
    {
      path: '/cart',
      element: <CartItems />,
      loader: cartItemsLoader
    }
  ], { initialEntries: ["/cart"] })

  render(<RouterProvider router={router} />); 
  return {
    user
  }
}

function renderThreeCartItems(size = "m") {
  const user = userEvent.setup();
  data.contents.forEach((obj) => {
    addToCart(obj, size);
  })

  const router = createMemoryRouter([
    {
      path: '/cart',
      element: <CartItems />,
      loader: cartItemsLoader,
      action: () => vi.fn((id: number, isIncrement: boolean) => incrementQuantityCart(id, isIncrement))
    }
  ], { initialEntries: ["/cart"] })
  
  render(<RouterProvider router={router} />); 

  return {
    user
  }
}

describe("CartItems", () => {
  beforeEach(() => {
    clearCart();
  })

  afterEach(() => {
    clearCart();
  })

  it("renders correctly(with size specified)", async () => {  
    const itemIndex = 0;
    renderThreeCartItems();
    await waitFor(() => expect(screen.getByTestId("itemsList")));
    const items = document.querySelectorAll('ul > li');
    const item = items[0] as HTMLElement;
    expect(within(item).getByRole("img").getAttribute('src')).toBe(data.contents[itemIndex].image);
    const itemInfo = within(item).getByRole("list");
    const itemTitle = within(itemInfo).getByTestId("title");
    expect(itemTitle.textContent).toBe(data.contents[itemIndex].title);
    const itemSize = within(itemInfo).getByTestId("size");
    expect(itemSize.textContent).toBe("M");
    const itemQuantityChanger = within(itemInfo).getByTestId("quantityDiv");
    expect(itemQuantityChanger).toBeInTheDocument();
    const itemPrice = within(itemInfo).getByTestId("price");
    expect(itemPrice.textContent).toBe("$" + data.contents[itemIndex].price);
    const itemDeleteButton = within(itemInfo).getByRole("presentation", {name: 'delete'});
    expect(itemDeleteButton).toBeInTheDocument();
  })

  it("renders correctly(with size not specified)", async () => {
    const itemIndex = 0;
    renderOneCartItem(itemIndex, "");
    await waitFor(() => expect(screen.getByTestId("size")));
    const itemSize = screen.getByTestId("size");
    expect(itemSize.textContent).toBe("N/A");
  })

  it("renders correctly(no items in the cart)", async () => {
    const router = createMemoryRouter([
      {
        path: '/cart',
        element: <CartItems />,
        loader: cartItemsLoader
      }
    ], { initialEntries: ["/cart"] })
    
    render(<RouterProvider router={router} />); 
    await waitFor(() => expect(screen.getByText("There are no items in your cart yet...")));
  })
})