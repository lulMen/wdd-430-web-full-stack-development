import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { AppHeaderComponent } from "./components/app-header/app-header/app-header.component";
import { DurationPipe } from "./pipes/duration.pipe";

@NgModule({
    declarations: [
        AppHeaderComponent,
        DurationPipe
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        AppHeaderComponent,
        DurationPipe
    ]
})
export class SharedModule { }