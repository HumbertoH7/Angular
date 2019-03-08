import { Component, ChangeDetectionStrategy, ViewChild,
  TemplateRef, OnInit} from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth,
  isSameDay, isSameMonth, addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction,
  CalendarEventTimesChangedEvent, CalendarView, CalendarModule
} from 'angular-calendar';
import { style } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarService } from './calendar.service';
import { Eventos} from './evento.model';
import { toDate } from '@angular/common/src/i18n/format_date';
import { Response } from '@angular/http';
import { CalendarModel } from './calendar.model';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  // styleUrls: ['./style.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'calendar.component.html',
  styleUrls: ['./styles.css']
})
export class CalendarComponent implements OnInit{
  CalendarForm: FormGroup;
  submitted = false;
  public result: Eventos;
  nome = '';
  data = '';
  hora = '';
  local = '';
  limite = '';
  categorias = '';
  json: Object;
  calendarItem:any[];
  message = '';

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  showAdvanced: boolean;
  view: CalendarView = CalendarView.Month;
  EventoModel: Eventos;
  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);

      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];

  activeDayIsOpen = true;

  constructor(private modal: NgbModal,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private calendarService: CalendarService) {}

    ngOnInit() {

      this.CalendarForm = this.formBuilder.group({
        nome: ['', Validators.required],
        data: ['', Validators.required],
        hora: ['', Validators.required],
        local: ['', Validators.required],
        limite: ['', Validators.required],
        categorias: ['', Validators.required],
      });
      this.calendarService.getEvent()
      .subscribe(data => { 
        // Do something before delay
        this.result = data;
        this.transferToCalendar();
    }
      );
      console.log("LEOOOOooo22222");
      ;
    }

    public popup() {
      var popup = document.getElementById('invalid');
      popup.classList.toggle('active--popup');
    }
    get f() { return this.CalendarForm.controls; }

    public onSubmit() {
      this.submitted = true;
          if (!this.f.nome. valid) {
            this.message = "Campo 'Nome' é obrigatório"
            this.popup();
            setTimeout(() => {
              this.popup();
            }, 3000);
            return;
          }
          if (!this.f.data.valid) {
            this.message = "Campo 'Data' é obrigatório"
            this.popup();
            setTimeout(() => {
              this.popup();
            }, 3000);
            return;
          }
          if (!this.f.local.valid) {
            this.message = "Campo 'Local' é obrigatório"
            this.popup();
            setTimeout(() => {
              this.popup();
            }, 3000);
            return;
          }
          if (!this.f.hora.valid) {
            this.message = "Campo 'Hora' é obrigatório"
            this.popup();
            setTimeout(() => {
              this.popup();
            }, 3000);
            return;
          }
          if (!this.f.categorias.valid) {
            this.message = "Campo 'Categorias' é obrigatório"
            this.popup();
            setTimeout(() => {
              this.popup();
            }, 3000);
            return;
          }
          if (!this.f.limite.valid) {
            this.message = "Campo 'Limite de vagas' é obrigatório"
            this.popup();
            setTimeout(() => {
              this.popup();
            }, 3000);
            return;
          }
        this.createEvent();
    }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  public toogleAdvanced() {
    console.log(this.result)
    if(this.showAdvanced==true){
    this.showAdvanced=false
    }else{
    this.showAdvanced=true
    }

  }

  createEvent() {
    this.json = {'nome': this.nome, 'data': this.data,
          'hora': this.hora, 'local': this.local,
          'limite': this.limite, 'categoria': this.categorias,
          'usuarios': ""};
    this.calendarService.sendPostRequest(this.json ,"");
    this.toogleAdvanced();
    $('html, body').animate({scrollTop:0},'slow'); /*subir pagina para o inicio*/
  }

  transferToCalendar(){
    let size= this.result.length;

    for (let index = 0; index < size; index++) {
      const element = this.result[index];
      var res = element.data.split("-");
      let ano = res[0];
      let mes = res[1];
      let dia = res[2];
      let dataCalendario= new Date(ano, mes, dia);
      this.events.push({
        start: dataCalendario,
        title: element.nome,
        color: colors.yellow,
        actions: this.actions
      });
      this.refresh.next();
    }

  }

}
