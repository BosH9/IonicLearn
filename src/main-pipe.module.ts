import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { MomentjsPipe } from './dateformatPipe';

@NgModule({
  declarations:[MomentjsPipe],
  imports:[CommonModule],
  exports:[MomentjsPipe]
})

export class MainPipe{}