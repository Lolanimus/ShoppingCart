// eslint-disable-next-line @typescript-eslint/no-explicit-any
import stylesPopup from "./popup.module.scss";

export function successPopUp(button: HTMLButtonElement) {
    const popup = document.getElementById(stylesPopup.popUpModule)!;
    popup.classList.add(stylesPopup.popUpOn);
    button.disabled = true;
    popup.addEventListener("animationend", () => {
        popup.classList.remove(stylesPopup.popUpOn);
        button.disabled = false;
    });
}