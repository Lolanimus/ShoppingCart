import { render, within, screen } from '@testing-library/react';
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import CartItems from './CartItems';
import { addToCart, clearCart } from '../../shoppingCartApi';
import * as data from "../../__mocks__/data"
import userEvent from '@testing-library/user-event';
import { CartItemsProps } from './CartItems';

const cartItemsProps: CartItemsProps = {
  totalState: {
    setTotal: vi.fn()
  },

  buyState: {
    buyDisabled: false,
    setBuyDisabled: vi.fn()
  }
}

function renderOneCartItem(itemIndex: number) {
  const user = userEvent.setup();
  addToCart(data.contents[itemIndex]);
  render(<CartItems totalState={cartItemsProps.totalState} buyState={cartItemsProps.buyState}/>);
  return user;
}

function renderThreeCartItems(itemIndex: number) {
  const user = userEvent.setup();
  data.contents.forEach((obj) => {
    addToCart(obj, "m");
  })
  render(<CartItems totalState={cartItemsProps.totalState} buyState={cartItemsProps.buyState}/>);
  const items = document.querySelectorAll(`ul > li`)!;
  const item = items[itemIndex] as HTMLElement;
  return {
    user,
    item
  }
}

describe("CartItems", () => {
  beforeEach(() => {
    clearCart();
  })

  afterEach(() => {
    clearCart();
  })

  it("renders correctly(with size specified)", () => {  
    const itemIndex = 2;
    const { item } = renderThreeCartItems(itemIndex);
    const img = within(item).getByRole("img");
    expect(img.getAttribute('src')).toBe(data.contents[itemIndex].image);
    const itemInfo = within(item).getByRole("list");
    const itemTitle = within(itemInfo).getByTestId("title");
    expect(itemTitle.textContent).toBe(data.contents[itemIndex].title);
    const itemSize = within(itemInfo).getByTestId("size");
    expect(itemSize.textContent).toBe("m");
    const itemQuantityChanger = within(itemInfo).getByTestId("quantityDiv");
    expect(itemQuantityChanger).toBeInTheDocument();
    const itemPrice = within(itemInfo).getByTestId("price");
    expect(itemPrice.textContent).toBe("" + data.contents[itemIndex].price);
    const itemDeleteButton = within(itemInfo).getByRole("button", {name: "Delete"});
    expect(itemDeleteButton).toBeInTheDocument();
  })

  it("renders correctly(with size not specified)", () => {
    const itemIndex = 0;
    renderOneCartItem(itemIndex);
    const itemSize = screen.getByTestId("size");
    expect(itemSize.textContent).toBe("N/A");
  })

  it("renders correctly(no items in the cart)", () => {
    render(<CartItems totalState={cartItemsProps.totalState} buyState={cartItemsProps.buyState}/>);
    expect(screen.getByText("There are no items in your cart yet..."));
  })

  it("price changes accordingly with quantity", async () => {
    const itemIndex = 0;
    const user = renderOneCartItem(itemIndex);
    const quantityChanger = screen.getByTestId("quantityDiv");
    const increseQuantity = within(quantityChanger).getByRole("button", {name: "+"});
    const quantity = within(quantityChanger).getByTestId("quantity");
    await user.click(increseQuantity);
    expect(quantity.textContent).toBe("2");
    const price = screen.getByTestId("price");
    expect(price.textContent).toBe("" + (parseInt(quantity.textContent!) * data.contents[itemIndex].price));
  })

  it("delete button works(one item)", async () => {
    const itemIndex = 0;
    const user = renderOneCartItem(itemIndex);
    const deleteBtn = screen.getByRole("button", {name: "Delete"});
    await user.click(deleteBtn);
    expect(screen.getByText("There are no items in your cart yet...")).toBeInTheDocument();
  })

  it("delete button works(several items)", async () => {
    const itemIndex = 0;
    const { user, item } = renderThreeCartItems(itemIndex);
    const deleteBtn = within(item).getByRole("button", {name: "Delete"});
    await user.click(deleteBtn);
    const updatedItems = document.querySelectorAll(`ul > li`)!;
    expect(updatedItems.length).toBe(2);
  })
})