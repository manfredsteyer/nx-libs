import { Component, Input } from '@angular/core';

@Component({
  selector: 'mp-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {

  @Input() title = '';
  visible = true;

}
