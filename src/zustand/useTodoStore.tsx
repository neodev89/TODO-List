import { create } from 'zustand';
import { dataType } from '../types/typeHome';

type TodoStore = {
    todos: dataType[];
    addTodos: (todo: dataType) => void;
    updateTodo: (todo: dataType) => void;
    removeTodos: (id: string) => void;
};

// Definisco il mio store con Zustand
export const useStoreTodo = create<TodoStore>((set) => ({
    todos: [],
    addTodos: (todo) => set((state) => ({
        todos: [...state.todos, todo]
    })),
    updateTodo: (updatedTodo) => set(({ todos }) => ({
        todos: todos.map(
            (todo) =>
                todo.id === updatedTodo.id ?
                    { ...todo, ...updatedTodo }
                    :
                    todo
        )
    })),
    removeTodos: (id: string) => set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));