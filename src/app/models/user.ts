import { FormControl, FormGroup } from '@angular/forms';

export interface FormUserModel extends FormGroup {
  id: FormControl<string>;
  name: FormControl<string>;
  password: FormControl<string>;
  email: FormControl<string>;
  gender: FormControl<string>;
  role: FormControl<string>;
  isActive: FormControl<boolean>;
}
