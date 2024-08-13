import { render, within, screen } from '@testing-library/react';
import { expect, describe, it, beforeEach, afterEach } from 'vitest';
import CartItems from './CartItems';
import { addToCart, clearCart } from '../../shoppingCartApi';
import * as data from "../../__mocks__/data"
import userEvent from '@testing-library/user-event';
function renderOneCartItem(itemIndex: number) {
  const user = userEvent.setup();
  addToCart(data.contents[itemIndex]);
  render(<CartItems />);
  return user;
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
    data.contents.forEach((obj) => {
      addToCart(obj, "m");
    })
    render(<CartItems />);
    const items = document.querySelectorAll(`ul > li`)!;
    const item = items[itemIndex] as HTMLElement;
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
    render(<CartItems />);
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
})