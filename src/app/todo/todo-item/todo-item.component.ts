import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtInputFisico', {static: false} ) txtInputFisico: ElementRef;

  // Form
  chkField: FormControl;
  txtInput: FormControl;

  editando: boolean;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.chkField = new FormControl( this.todo.completed );
    this.txtInput = new FormControl( this.todo.text, Validators.required );

    this.chkField.valueChanges.subscribe((valor) => {
      const accion = new ToggleTodoAction( this.todo.id );
      this.store.dispatch( accion );
    });
  }

  editar() {
    this.editando = true;

    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);

  }

  terminarEdicion() {
    this.editando = false;

    if (this.txtInput.invalid) {
      return;
    }

    if (this.txtInput.value === this.todo.text) {
      return;
    }

    this.store.dispatch( new EditarTodoAction(this.todo.id, this.txtInput.value) );
  }

  borrarTodo() {
    this.store.dispatch( new BorrarTodoAction( this.todo.id ) );
  }
}
