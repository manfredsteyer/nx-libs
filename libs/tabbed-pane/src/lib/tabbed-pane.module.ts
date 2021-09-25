import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabbedPaneComponent } from './tabbed-pane/tabbed-pane.component';
import { TabComponent } from './tab/tab.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TabbedPaneComponent,
    TabComponent
  ],
  exports: [
    TabbedPaneComponent,
    TabComponent
  ]
})
export class TabbedPaneModule {}
