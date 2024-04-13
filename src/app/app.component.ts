import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

const STATUS_VIEW = {
  params: 'params',
  main: 'main',
  preCheck: 'pre_check'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  STATUS_VIEW = STATUS_VIEW;
  currentView = STATUS_VIEW.params;
  cicloActual = CICLO_ACARREO_NORMAL.vacio;
  menuOptionSelected = '';
  paramsForm: ParamsForm = new ParamsForm();

  constructor() {
  }

  iniciar(event: Event): void {
    event.preventDefault();
    this.currentView = STATUS_VIEW.main;
  }

  selectOption(option: string): void {
    this.menuOptionSelected = option;
  }

  cambiarCiclo(id: string): void {
    // @ts-ignore
    this.cicloActual = CICLO_ACARREO_NORMAL[id];
  }
}

declare type ParamsFormControl =
  { cargado: FormControl } &
  { combustibleLLeno: FormControl } &
  { ciclosComedor: FormControl } &
  { ciclosIsla: FormControl };

class ParamsForm extends FormGroup {

  // @ts-ignore
  controls: ParamsFormControl;

  constructor() {
    super({
      cargado: new FormControl(false),
      combustibleLLeno: new FormControl(true),
      ciclosComedor: new FormControl(0),
      ciclosIsla: new FormControl(0),
    });
  }
}

const CICLO_ACARREO_NORMAL = {
  vacio: {
    areaAsignacion: 'Vaya a pala 6235',
    areaSecuencia: 'Llegada',
    siguiente: 'enPala'
  },
  enPala:{
    areaAsignacion: 'Llegó a la pala 6235',
    areaSecuencia: 'Cargando',
    siguiente: 'cargandoPala'
  },
  cargandoPala:{
    areaAsignacion: 'Cargando pala 6235',
    areaSecuencia: 'Lleno',
    siguiente: 'aBotadero'
  },
  aBotadero:{
    areaAsignacion: 'Vaya a botadero A2',
    areaSecuencia: 'Llegó',
    siguiente: 'enBotadero'
  },
  enBotadero:{
    areaAsignacion: 'Llegó a botadero A2',
    areaSecuencia: 'Descargando',
    siguiente: 'descargando'
  },
  descargando:{
    areaAsignacion: 'Descargando en botadero A2',
    areaSecuencia: 'Asignar',
    siguiente: 'vacio'
  },

}
