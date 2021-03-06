import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../todo/model/todo.model';
import { filtrosValidos } from './filter.action';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(todos: Todo[], filtro: filtrosValidos): Todo[] {
    
    switch (filtro) {
      case 'completados':
        return todos.filter( todo => todo.completed );

      case 'pendientes':
        return todos.filter( todo => ! todo.completed );

      default:
        return todos;
    }

  }

}
