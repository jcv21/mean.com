import {  NgModule  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

@NgModule({
    declarations: [AboutComponent], // components, directives, pipes
    imports: [RouterModule], // modules
    exports: [AboutComponent], // items from declarations and imports
    providers: [], // services
})
export class AboutModule{
    
}