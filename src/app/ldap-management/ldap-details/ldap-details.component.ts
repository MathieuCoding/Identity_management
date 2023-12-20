import { Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {
  ConfirmValidParentMatcher,
  passwordMatchingValidator
} from "./passwords-validator.directive";
import {UserLdap} from "../../models/user-ldap";

export abstract class LdapDetailsComponent{

  user: UserLdap | undefined;
  processLoadRunning = false;
  processValidateRunning = false;
  // Le PlaceHolder pour les mots de passe en fonction de l'édition ou non
  passwordPlaceHolder: string;
  // Message d'erreur
  errorMessage: string | undefined; // ''
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  userForm = this.fb.group({
    login: [''],
    nom: [''],
    prenom: [''],
    // Groupe de données imbriqué
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: ['']
    },
      {validators: passwordMatchingValidator}),
    mail: {value: '', disabled: true},
  })

  get passwordForm() { return this.userForm.get('passwordGroup'); }

  protected constructor(
    public addForm: boolean,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.passwordPlaceHolder = 'Mot de passe' + (this.addForm ? '' : '(vide si inchangé)');
    if (this.addForm) {
      this.passwordForm?.get('password')?.addValidators(Validators.required);
      this.passwordForm?.get('confirmPassword')?.addValidators(Validators.required);
    }
  }

  protected onInit() {
    // Permet d'initialiser le formulare au cas où
    // Nous n'en avons pas besoin ici
  }

  goToLdap() {
    this.router.navigate(['/users/list']).then((e: boolean): void => {
      if (!e) {
        console.error('Navigation has failed!');
      }
    })
  }

  onSubmitForm(): void {
    this.validateForm();
  }

  private formGetValue(name: string): string {
    const control = this.userForm.get(name);
    if (control === null) {
      console.error('L\'objet \'' + name + '\' du formulaire n\'existe pas');
      return '';
    }
    return control.value;
  }

  private formSetValue(name: string, value: string | number | boolean): void { //TODO
    const control = this.userForm.get(name);
    if (control === null) {
      console.error('L\'objet \'' + name + '\' du formulaire n\'existe pas');
      return;
    }
    control.setValue(value);
  }

  // Permet d'afficher les propriétés de UserLdap dans le formulaire
  protected copyUserToFormControl(): void {
    if (this.user === undefined) {
      return;
    }

    this.formSetValue('login', this.user.login);
    this.formSetValue('nom', this.user.nom);
    this.formSetValue('prenom', this.user.prenom);
    this.formSetValue('mail', this.user.mail);
    this.formSetValue('employeNumero', this.user.employeNumero);
    this.formSetValue('employeNiveau', this.user.employeNiveau);
    this.formSetValue('dateEmbauche', this.user.dateEmbauche);
    this.formSetValue('publisherId', this.user.publisherId);
    this.formSetValue('active', this.user.active);

  }
  // Permet de récupérer les valeurs du formulaire et de retourner un objet UserLdap avec ces valeurs
  protected getUserFromFormControl(): UserLdap {
    return {
      id: this.user === undefined ? undefined : this.user.id,
      login: this.formGetValue('login'),
      nom: this.formGetValue('nom'),
      prenom: this.formGetValue('prenom'),
      nomComplet: this.formGetValue('nom') + ' ' + this.formGetValue('prenom'),
      mail: this.formGetValue('mail'),
      // Ces valeurs devraient être reprise du formulaire
      // employeNumero: this.formGetValue('employeNumero'),
      // employeNiveau: this.formGetValue('employeNiveau'),
      // dateEmbauche: this.formGetValue('dateEmbauche'),
      // publisherId: this.formGetValue('publisherId'),
      employeNumero: 1,
      employeNiveau: 1,
      dateEmbauche: '2020-01-01',
      publisherId: 1,
      active: true,
      motDePasse: '',
      role: 'ROLE_USER',
  };
  }
  isFormValid(): boolean {
    return this.userForm.valid
    // Exemple de validation d'un champ:
    && (!this.addForm || this.formGetValue('passwordGroup.password') !== '')
  }

  abstract validateForm(): void;

  updateLogin(): void {
    const control = this.userForm.get('login');
    if (control === null) {
      console.error('L\'objet \'login\' du formulaire n\'existe pas');
      return;
    }
    control.setValue((this.formGetValue('prenom') + '.' + this.formGetValue('nom')).toLowerCase());
    this.updateMail();
  }
  updateMail(): void {
    const control = this.userForm.get('mail');
    if (control === null) {
      console.error('L\'objet \'mail\' du formulaire n\'existe pas');
      return;
    }
    control.setValue(this.formGetValue('login').toLowerCase() + '@epsi.lan');
  }


  getErrorMessage(): string {
    if (this.passwordForm?.errors) {
      return "Les mots de passe ne correspondent pas !";
    }
    return "Entrez un mot de passe";
  }


}
