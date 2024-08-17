import { FormControl } from "@angular/forms"
import { AppNames } from "../constants"
import { arrayCategoryType, currencyType, ProductDTO } from "../dto/ProductDTO"
import { StoreDTO } from "../dto/StoreDTO"
import { CartItemDTO } from "../dto/CartItem"
import Decimal from "decimal.js"

export const getCurrentApp = (pathName: string): AppNames | undefined => {
    if (pathName.startsWith("/stores")) {
        return AppNames.FORMS
    }
    else if (pathName.startsWith("/finance")) {
        return AppNames.FINANCE
    }
    else if (pathName.startsWith("/shop")) {
        return AppNames.SHOP
    }
    return undefined;
}

export interface PathData {
    storeName: string | undefined, productName: string | undefined,
    storeId: number | undefined, productId: number | undefined,
    inStores: boolean, inProducts: boolean
}

interface Input {
    styleOverride?: string;
    title: string;
}
export interface InputFormProps extends Input {
    helpText?: string;
    formControl: FormControl;
    required?: boolean;
}
export interface InputTextFormProps extends InputFormProps {
    numberOfLines: number;
}
export interface ButtonProps extends Input {
    functionToDo: () => void;
    id?: string;
}

export interface InputSwitchFormProps extends InputFormProps {
    options: string[];
}

interface NavigationInputsProps extends Input {
    currentPage: number;
    totalPages: number;
    handlerCurrentPage: (page: number) => void;
}

interface MinusPlusInputInterface extends Input {
    modifyValue: (quantity: number) => void;
    id: string;
    value: number;

}

export function getPaginatedItems(array: any[], pageIndex: number, itemsPerPage: number) {
    if (itemsPerPage < 0 || pageIndex < 0) {
        return [];
    }
    const startIndex = pageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return array.slice(startIndex, endIndex);
}

export function calculateTotalPages(totalItems: number, itemsPerPage: number) {
    if (itemsPerPage <= 0) {
        return Math.ceil(totalItems / 10);
    }
    return Math.ceil(totalItems / itemsPerPage);
}


export function productAccordingToTheFilter(product: ProductDTO, text: string, storeId: number | undefined): boolean {
    const textLower = text.toLowerCase();
    return (textLower === "" || product.name.toLowerCase().includes(textLower) || product.description.toLowerCase().includes(textLower)) && (product.storeId === storeId || storeId === undefined);
}

export const getInitialCategoryMap = () => {
    const initialMap = new Map<string, boolean>();
    arrayCategoryType.forEach(item => initialMap.set(item, false));
    return initialMap;
}

export function filterStores(stores: StoreDTO[], text: string): StoreDTO[] {
    const textLower = text.toLowerCase();
    return stores.filter(store =>
        store.name.toLowerCase().includes(textLower) ||
        store.address.city.toLowerCase().includes(textLower) ||
        store.address.zipCode.includes(textLower)
    );
}

export function getQuantityOfProductInCartShop(cartShopList: CartItemDTO[], idOfProduct: number): number {
    let indexOfProduct = cartShopList.findIndex((cartItem) => cartItem.id === idOfProduct)
    return indexOfProduct !== -1 ? cartShopList[indexOfProduct].quantity : 0;
}

export function getTotalPriceCart(cartShopList: CartItemDTO[]): string {
    let totalSum = cartShopList.reduce((accumulator, currentValue) => {
        const currencyIndex = getCurrencyIndexOfACartItem(currentValue);
        return accumulator.plus(
            new Decimal(currentValue.price)
                .times(currencyIndex)
                .times(currentValue.quantity)
        );

    }, new Decimal(0));

    return formatPrice(totalSum.toNumber());
}

export function getCurrencyIndexOfACartItem(cartItem: CartItemDTO) {
    if (cartItem.currency === currencyType.STERLING) {
        return new Decimal(1.19);
    }
    else if (cartItem.currency === currencyType.DOLLAR) {
        return new Decimal(0.92);
    }
    else {
        return new Decimal(1);
    }
}
export function formatPrice(number: number): string {
    return number.toLocaleString('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}

export function formatInputNumber(number: number): string {
    return number.toLocaleString('fr-FR', {
        maximumFractionDigits: 0,
    });
}