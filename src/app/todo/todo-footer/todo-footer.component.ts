import { Component, OnInit } from '@angular/core';
import * as fromFiltros from '../../filter/filter.action';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Todo } from '../model/todo.model';
import { BorrarTodoAction, BorrarCompletadosTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  pendientes: number;
  
  filtrosValidos: fromFiltros.filtrosValidos [] = [ 'todos', 'completados', 'pendientes' ];
  filtroActual: fromFiltros.filtrosValidos;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.contarPendientes( state.todos );
    });
  }

  cambiarFiltro( nuevoFiltro: fromFiltros.filtrosValidos ) {
    this.store.dispatch( new fromFiltros.SetFiltroAction( nuevoFiltro ) );
  }

  contarPendientes(todos: Todo[]) {
    this.pendientes = todos.filter( todo => !todo.completed ).length;
  }

  borrarCompletados() {
    this.store.dispatch( new BorrarCompletadosTodoAction() );
  }
}
