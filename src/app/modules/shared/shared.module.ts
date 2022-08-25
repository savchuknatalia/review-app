import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LeftSidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LeftSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class SharedModule {}
