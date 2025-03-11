// eslint-disable-next-line @typescript-eslint/no-explicit-any
import stylesPopup from "./popup.module.scss";

export function successPopUp() {
    const popup = document.getElementById(stylesPopup.popUpModule)!;
    popup.classList.add(stylesPopup.popUpOn);
    popup.addEventListener("animationend", () => {
        popup.classList.remove(stylesPopup.popUpOn);
    });
}