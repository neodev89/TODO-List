import { create } from 'zustand';

export type dataType = {
    id: number;
    product: string;
    price: string;
}

type TodoStore = {
    todos: dataType[];
    addTodos: (todo: dataType) => void;
    removeTodos: (id: number) => void;
}

// Definisco il mio store con Zustand
export const useStoreTodo = create<TodoStore>((set) => ({
    todos: [],
    addTodos: (todo) => set((state) => ({ todos: [...state.todos, todo]})),
    removeTodos: (id: number) => set((state) => ({ 
        todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));