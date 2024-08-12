import { render, within } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import CartItems from './CartItems';
import { addToCart } from '../../shoppingCartApi';
import * as data from "../../__mocks__/data"

describe("CartItems", () => {
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
})