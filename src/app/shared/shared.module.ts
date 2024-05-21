import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { HorizontalMenuItems } from './menu-items/horizontal-menu-items';

import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './accordion';
import { AuthGuard } from '../authentification/AuthServices/auth.guard';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  providers: [MenuItems, HorizontalMenuItems,AuthGuard]
})
export class SharedModule { }
