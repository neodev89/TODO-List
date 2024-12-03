import { dataType } from "../types/typeHome";

// creare la funzione per sommare i prezzi e restituirne il totale
const sumPrice = (listStore: dataType[], checked: Record<string, boolean>) => {
    const prices: Array<number> = [];
    listStore.map((el) => {
        const check = Object.keys(checked);
        check.map((oneCheck) => {
            if (el.id === oneCheck) {
                let price = parseFloat(el.price);
                prices.push(price);
            }
        });
    });
    prices.reduce((acc, cur) => {
        return acc + cur;
    });
}

export { sumPrice };