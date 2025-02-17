import { beforeEach, describe, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import FilterPanel from '@/core/components/FilterPanel.vue';
import type { FilterOption } from '@/models/filter.model';

const props = {
  selectedFilterName: 'Test Filter',
  filters: [
    {
      filterName: 'Test Filter',
      options: ['Option 1', 'Option 2', 'Option 3'],
      selectedOptions: [],
    },
  ],
};

const mountComponent = (props: {
  selectedFilterName: string;
  filters: FilterOption[];
}) => {
  return mount(FilterPanel, {
    props,
  });
};

describe('FilterPanel', () => {
  let wrapper: VueWrapper<InstanceType<typeof FilterPanel>>;

  beforeEach(() => {
    wrapper = mountComponent(props);
  });

  it('renders the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('passes props correctly', () => {
    expect(wrapper.props()).toEqual(props);
  });

  it('displays the filter name', () => {
    expect(wrapper.text()).toContain('Test Filter');
  });

  it('displays the filter options', () => {
    expect(wrapper.text()).toContain('Option 1');
    expect(wrapper.text()).toContain('Option 2');
    expect(wrapper.text()).toContain('Option 3');
  });

  it('emits toggle-filter event when a filter header is clicked', () => {
    wrapper.find('.filter-header').trigger('click');
    expect(wrapper.emitted('toggle-filter')).toBeDefined();
    expect(wrapper.emitted('toggle-filter')?.[0]).toEqual(['Test Filter']);
  });

  it('emits chip-click event when a filter option is clicked', () => {
    wrapper.find('.text-chip').trigger('click');
    expect(wrapper.emitted('chip-click')).toBeDefined();
    expect(wrapper.emitted('chip-click')?.[0]).toEqual(['Test Filter', 'Option 1']);
  });

  it('emits clear-filters event when the clear filters button is clicked', () => {
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted('clear-filters')).toBeDefined();
  });

  it('calculates isOptionSelected correctly', async () => {
    wrapper.setProps({
      selectedFilterName: 'Test Filter',
      filters: [
        {
          filterName: 'Test Filter',
          options: ['Option 1', 'Option 2', 'Option 3'],
          selectedOptions: ['Option 2', 'Option 3'],
        },
      ],
    });

    await wrapper.vm.$nextTick();
    const textChips = wrapper.findAll('.text-chip');
    expect(textChips[0].classes()).not.toContain('text-chip-selected');
    expect(textChips[1].classes()).toContain('text-chip-selected');
    expect(textChips[2].classes()).toContain('text-chip-selected');
  });
});
