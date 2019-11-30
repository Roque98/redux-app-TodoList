import * as fromTodoActions from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Practicar violin');
const todo2 = new Todo('Estudiar Redux');
todo2.completed = true;

const estadoInicial: Todo[] = [todo1, todo2];

export function todoReducer( state = estadoInicial, action: fromTodoActions.Acciones ): Todo[] {

    switch (action.type) {
        case fromTodoActions.AGREGAR_TODO :
            const todo = new Todo(action.text);
            return [...state, todo];

        case fromTodoActions.TOGGLE_TODO :
            return state.map( todoEdit => {
                if ( todoEdit.id === action.id ) {
                    return {
                        ...todoEdit,
                        completed: !todoEdit.completed
                    };
                } else {
                    return todoEdit;
                }
            });

        case fromTodoActions.TOGGLE_ALL_TODO :
            return state.map( todoEdit => {
                return {
                    ...todoEdit,
                    completed : action.completado
                }
            });

        case fromTodoActions.EDITAR_TODO :
            return state.map( todoEdit => {
                if ( todoEdit.id === action.id ) {
                    return {
                        ...todoEdit,
                        text: action.text
                    };
                } else {
                    return todoEdit;
                }
            });

        case fromTodoActions.BORRAR_TODO :
            return state.filter( todoEdit => todoEdit.id !== action.id);

        case fromTodoActions.BORRAR_COMPLETADOS_TODO :
                return state.filter( todoEdit => !todoEdit.completed );

        default:
            return state;
    }
}