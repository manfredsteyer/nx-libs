import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'mp-tabbed-pane',
  templateUrl: './tabbed-pane.component.html',
  styleUrls: ['./tabbed-pane.component.scss']
})
export class TabbedPaneComponent implements AfterContentInit, OnChanges {

  @ContentChildren(TabComponent)
  tabQueryList: QueryList<TabComponent> | undefined;

  activeTab: TabComponent | undefined;

  @Input() currentPage = 1;

  @Output() currentPageChange = new EventEmitter<number>();

  get tabs(): TabComponent[] {
    return this.tabQueryList?.toArray() ?? [];
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['currentPage'] && !changes['currentPage'].firstChange) {
        // alert(changes['currentPage'].currentValue)
        this.pageChange(changes['currentPage'].currentValue);
      }
  }

  ngAfterContentInit(): void {
    if (this.tabs.length > 0) {
      this.activate(this.tabs[this.currentPage-1]);
    }
  }

  activate(active: TabComponent): void {
    for (const tab of this.tabs) {
      tab.visible = (tab === active);
    }
    this.activeTab = active;

    this.currentPage = this.tabs.indexOf(active) + 1;
    this.currentPageChange.next(this.currentPage);
  }

  pageChange(page: number): void {
    this.activate(this.tabs[page - 1]);
  }

}
