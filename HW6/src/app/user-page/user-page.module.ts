import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    UserPageComponent
  ],
  exports: [
    UserPageComponent
  ],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        MatButtonToggleModule,
        FormsModule
    ]
})
export class UserPageModule { }
