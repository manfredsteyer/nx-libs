import { TabComponent } from '../tab/tab.component';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TabbedPaneComponent } from './tabbed-pane.component';
import { action } from '@storybook/addon-actions';

export default {
  title: 'TabbedPaneComponent',
  component: TabbedPaneComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [TabbedPaneComponent, TabComponent]
    })
  ],
} as Meta<TabbedPaneComponent>;

const Template: Story<TabbedPaneComponent> = (args: TabbedPaneComponent) => ({
  component: TabbedPaneComponent,
  props: {
    ...args,
    currentPageChange: action('currentPageChange')
  },
  template: `
    <mp-tabbed-pane [currentPage]="currentPage" (currentPageChange)="currentPageChange($event)">
      <mp-tab title="Tab A">Hallo Welt!</mp-tab>
      <mp-tab title="Tab B">Das ist noch ein Tab!</mp-tab>
      <mp-tab title="Tab C">Und noch einer!</mp-tab>
    </mp-tabbed-pane>
  `
});

export const Primary = Template.bind({});
Primary.args = { 
  currentPage: 1,
}


