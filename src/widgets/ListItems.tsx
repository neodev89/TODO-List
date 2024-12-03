import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import listStyle from '../sass/listStyle.module.sass';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useStoreTodo } from '../zustand/useTodoStore';
import { dataType } from '../types/typeHome';

export let ListContext = React.createContext<any>({});

export const ListItems = () => {
    const {
        todoPergamena,
        listSize,
        listItem,
        listText,
        listItemProduct,
        listItemPrice,
        listDiv,
        btnDiv,
        btn,
        btnAdd,
        totalBox,
        spanTot
    } = listStyle;
    const [array, setArray] = useLocalStorage<dataType[]>('todoList', []);
    const [isTrue, setIsTrue] = React.useState<boolean>(false);
    const [ID, setID] = React.useState<string>('');
    const [total, setTotal] = React.useState<number[]>([]);
    const listStore = useStoreTodo((state) => state.todos);

    const [totale, setTotale] = React.useState<string>("");

    const addListTodo = useStoreTodo((state) => state.addTodos);
    const UpdateListStore = useStoreTodo((state) => state.updateTodo);
    const removeListTodo = useStoreTodo((state) => state.removeTodos);


    const [checked, setChecked] = React.useState<{ id: string, check: boolean }>({
        id: "",
        check: false,
    });

    const handleChecked = (listStore: dataType) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (listStore) {
            if (listStore.id === event.target.name) {
                setChecked(prev => ({
                    ...prev,
                    id: listStore.id,
                    check: event.target.checked,
                }
                ));
                UpdateListStore({
                    ...listStore,
                    checked: event.target.checked,
                })
            }
        } else {
            return setChecked({
                id: "",
                check: false,
            });
        }
    };

    const AddItem = () => {
        let addProduct = prompt("Aggiungi un nuovo alimento");
        let addPrice = prompt("Conosci anche il suo prezzo?");
        console.log("Prodotto aggiunto", addProduct);
        console.log("Prezzo aggiunto", addPrice);

        if (addProduct !== null && listStore !== null) {
            const newProduct: dataType = {
                id: addProduct,
                product: addProduct,
                price: addPrice || "0",
                checked: checked.check
            }
            const hasDuplicate = listStore.some((list) => {
                return list.id === newProduct.id;
            });
            if (hasDuplicate === false) {
                addListTodo(newProduct);
            } else {
                return;
            }
        }
    }

    const RemoveList = (id: string) => {
        listStore.map((el) => {
            if (id === el.id) {
                removeListTodo(el.id);
            }
            return;
        });
    }

    React.useEffect(() => {
        function listenChanges() {
            setArray((prevList) => [...prevList, ...listStore]);
        }
        totalPrice(listStore, setTotale);
        console.log("Qui", checked);
        console.log("Vediamo il", listStore);
        listenChanges();
    }, [listStore, ID, total, checked, totale, isTrue]);

    return (
        <ListContext.Provider value={{
            isTrue, setIsTrue,
        }}>
            <Box component={'div'} className={todoPergamena}>
                <Box component={'div'} className={listDiv}>
                    <List dense sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: 'transparent',
                        overflowY: 'auto'
                    }}
                        className={listSize}>
                        <ListItem>
                            <ListItemText className={listText} primary={'Prodotto'} />
                            <ListItemText className={listText} primary={'Price'} />
                            <ListItemText className={listText} primary={''} />
                            <ListItemText className={listText} primary={'Check'} sx={{ width: '42px', flexGrow: 0 }} />
                        </ListItem>
                        {listStore.map((el) => {
                            const labelId = `checkbox-list-secondary-label-${el.id}`;
                            const ElPrice = parseFloat(el.price).toFixed(2).toString();
                            return (
                                <ListItem
                                    className={listItem}
                                    key={el.id}
                                    secondaryAction={
                                        <Checkbox
                                            name={el.id}
                                            edge="end"
                                            onChange={handleChecked(el)}
                                            checked={checked.id === el.id ? checked.check : false}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    }
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemText className={listItemProduct} id={labelId} primary={`${el.product}`} />
                                        <ListItemText className={listItemPrice} id={labelId} primary={`€${ElPrice}`} />
                                        <Button type="button" variant={'text'} className={btn} onClick={() => { RemoveList(el.id) }}>{'X'}</Button>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                        <Box component={'div'} className={btnDiv}>
                            <Button type="button" variant={'contained'} className={btnAdd} onClick={AddItem}>{'Aggiungi'}</Button>
                        </Box>
                        <Box component={'div'} className={totalBox}>
                            <Typography variant={'body1'} className={spanTot}>{totale}</Typography>
                        </Box>
                    </List>

                </Box>
            </Box>
        </ListContext.Provider>

    );
}

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = React.useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Errore nel recupero dalla localStorage:' + error);
        }
    });

    const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
        const valueToStore = value instanceof Function ? // controlla se il valore è istanza di funzione
            value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
    };
    return [storedValue, setValue] as const;
}

function totalPrice(array: dataType[], setTotale: (val: string) => void) {
    let price: Array<number> = [];
    array.map((list) => {
        if (list.checked === true) {
            let price1 = parseFloat(list.price).toFixed(2);
            price.push(parseFloat(price1));

        } else {
            price.push(0);
        }
    });
    const result = price.length > 0 ?
        price.reduce((acc: number, curr: number) => {
            return acc + curr;
        })
        :
        0
        ;
    setTotale(result.toFixed(2));
    return result.toString();
}