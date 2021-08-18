import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from './../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { empty, Observable, pipe } from 'rxjs';
import { FormValidations } from '../shared/form-validations';
import { VerificarEmailService } from './services/verificar-email.service';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { Cidade } from '../shared/models/cidades';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {
  //formulario: any = FormGroup;
  estados!: EstadoBr[];
  cidades!: Cidade[];
  //estados!: Observable<EstadoBr[]>;
  cargos: any = [];
  tecnologias: any = [];
  newsletterOp: any = [];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificarEmailService)
    {
      super();
     }

  ngOnInit(): void {

    //this.verificaEmailService.verificarEmail('email@email.com').subscribe();

    this.dropdownService.getEstadosBr()
      .subscribe(dados => this.estados = dados);

    this.cargos = this.dropdownService.getCargos();

    this.tecnologias = this.dropdownService.getTecnologias();

    this.newsletterOp = this.dropdownService.getNewsletter();

    /*this.dropdownService.getEstadosBr().subscribe(dados => {
        this.estados = dados;
        console.log(dados);
      });*/

    /*this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),

      endereco: new FormGroup({
        cep: new FormControl(null),
      })
    });*/

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, FormValidations.equalsTo('email')],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
        cargo: [null],
        tecnologias: [null],
        newsletter: ['s'],
        termos: [null, Validators.pattern('true')],
        frameworks: this.buildFrameworks()
    });

    this.formulario.get('endereco.cep').statusChanges
    .pipe(
      distinctUntilChanged(), // operador rxjs, captura o valor quando é modificado
      tap((value: any) => console.log('status CEP:', value)),
      switchMap(status => status === 'VALID' ? // retorna um observable
        this.cepService.consultaCEP(this.formulario.get('endereco.cep').value)
        : empty()
      )
    )
    .subscribe((dados: any) => dados ? this.populaDadosForm(dados) : {});

    this.formulario.get('endereco.estado').valueChanges
    .pipe(
      tap(estado => console.log('Novo estado: ', estado)),
      map(estado => this.estados.filter(e => e.sigla === estado)),
      map((estados: any) => estados && estados.length > 0 ? estados[0].id : empty()),
      switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)),
      tap(console.log)
    )
    .subscribe((cidades: any) => this.cidades = cidades);
    //[Validators.required, Validators.minLength(3), Validators.maxLength(20)]]

    //this.dropdownService.getCidades(8).subscribe(console.log);
  }

  buildFrameworks(){

    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));
    /*return [
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ];*/
  }


  submit() {
    console.log(this.formulario.value);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v: any, i: any) => v ? this.frameworks[i] : null)
      .filter((v: any) => v !== null)
    });

    console.log(valueSubmit);

    this.http.post('https://httpbin.org/post',
    JSON.stringify(valueSubmit))
    .pipe(map(res => res))
    .subscribe(dados => {
      console.log(dados);
      //reseta o form
      //this.resetar();
    },
    (error: any) => alert('erro'));
  }

  consultaCEP(){

    let cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== ''){

      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any){

    this.formulario.patchValue({
      endereco: {
        //cep: dados.cep,
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
    //this.formulario.get('nome').setValue('Mariana');
  }

  resetaDadosForm(){
    this.formulario.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  setarCargo(){
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev PL'};
    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologias(){
    this.formulario.get('tecnologias').setValue(['Java', 'JavaScript', 'PHP']);
  }

  validarEmail(formControl: FormControl){
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }
}
