import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import listStyle from './listStyle.module.sass'
import { Box, Button } from '@mui/material';
import { dataType } from '../zustand/useTodoStore';
import { useStoreTodo } from '../zustand/useTodoStore';

export const ListItems = () => {
    const [list, setList] = React.useState<dataType[]>([]);
    const [array, setArray] = useLocalStorage<dataType[]>('todoList', []);
    const { listSize, listItem, listDiv, btnDiv, btn } = listStyle;
    const [checked, setChecked] = React.useState([1]);

    const [ID, setID] = React.useState<number>(1);


    const listStore = useStoreTodo((state) => state.todos);
    const addListStore = useStoreTodo((state) => state.addTodos);
    const removeListStore = useStoreTodo((state) => state.removeTodos);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        console.log(checked);

        if (currentIndex === -1) {
            newChecked.push(value);
            console.log(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const AddItem = () => {
        let addProduct = prompt("Aggiungi un nuovo alimento");
        let addPrice = prompt("Conosci anche il suo prezzo?");
        
        if (addProduct !== null) {
            addListStore({ id: ID, product: addProduct, price: addPrice ? addPrice : "0" });
            setID(ID + 1);
        } else {
            return null;
        }
    }

    const RemoveList = (id: number) => {
        listStore.map((el) => {
            if (id === el.id) {
                removeListStore(el.id);
            }
            return;
        });
    }

    React.useEffect(() => {
        function listenChanges() {
            setArray(listStore);
            console.log(listStore);
        }
        listenChanges();
    }, [listStore, ID]);

    return (
        <Box component={'div'} className={listDiv}>

            <List dense sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                border: '4px dashed red',
                bgcolor: 'background.paper',
                overflowY: 'auto'
            }}
                className={listSize}>
                <ListItem>
                    <ListItemText primary={'Prodotti'} />
                    <ListItemText primary={'Price'} />
                    <ListItemText primary={'Check'} sx={{ width: '42px', flexGrow: 0 }} />
                </ListItem>
                {listStore.map((el, index: number) => {
                    const labelId = `checkbox-list-secondary-label-${el.id}`;
                    return (
                        <ListItem
                            key={el.id}
                            secondaryAction={
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggle(index)}
                                    checked={checked.includes(index)}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            }
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemText className={listItem} id={labelId} primary={`Prodotto: ${el.product}`} />
                                <ListItemText className={listItem} id={labelId} primary={`prezzo: €${el.price}`} />
                                <Button type="button" variant={'text'} className={btn} onClick={() => {RemoveList(el.id)}}>{'X'}</Button>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            <Box component={'div'} className={btnDiv}>
                <Button type="button" variant={'contained'} className={btn} onClick={AddItem}>{'Aggiungi'}</Button>
            </Box>
        </Box>
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

    const setValue = (value: T) => {
        const valueToStore = value instanceof Function ? // controlla se il valore è istanza di funzione
            value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
    };
    return [storedValue, setValue] as const;
}