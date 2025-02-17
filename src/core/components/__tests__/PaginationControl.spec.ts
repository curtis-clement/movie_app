import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import PaginationControl from '@/core/components/PaginationControl.vue';

const mountComponent = (props: {
  currentPage: number;
  hasNextPage: boolean;
}) => {
  return mount(PaginationControl, {
    props,
  });
};

describe('PaginationControl', () => {
  let wrapper: VueWrapper<InstanceType<typeof PaginationControl>>;

  beforeEach(() => {
    wrapper = mountComponent({
      currentPage: 1,
      hasNextPage: true,
    });
  }); 

  it('renders correctly with initial props', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('passes props correctly', () => {
    expect(wrapper.props()).toEqual({
      currentPage: 1,
      hasNextPage: true,
    });
  });

  it('disables previous button when on first page', () => {
    wrapper.setProps({ currentPage: 1 });
    const prevButton = wrapper.findAll('.pagination-button')[0];
    expect(prevButton.attributes('disabled')).toBeDefined();
  });

  it('enables previous button when not on first page', async () => {
    wrapper.setProps({ currentPage: 2 });
    await wrapper.vm.$nextTick();
    const prevButton = wrapper.findAll('.pagination-button')[0];
    expect(prevButton.attributes('disabled')).toBeUndefined();
  });

  it('disables next button when hasNextPage is false', async () => {
    wrapper.setProps({ hasNextPage: false });
    await wrapper.vm.$nextTick();
    const nextButton = wrapper.findAll('.pagination-button')[1];
    expect(nextButton.attributes('disabled')).toBeDefined();
  });

  it('enables next button when hasNextPage is true', async () => {
    const nextButton = wrapper.findAll('.pagination-button')[1];
    expect(nextButton.attributes('disabled')).toBeUndefined();
  });

  it('emits page-change event with correct value when clicking next', async () => {    
    const nextButton = wrapper.findAll('.pagination-button')[1];
    await nextButton.trigger('click');

    expect(wrapper.emitted('page-change')).toBeTruthy();
    expect(wrapper.emitted('page-change')?.[0]).toEqual([2]);
  });

  it('emits page-change event with correct value when clicking previous', async () => {
    wrapper.setProps({ currentPage: 2 });
    await wrapper.vm.$nextTick();
    const prevButton = wrapper.findAll('.pagination-button')[0];
    await prevButton.trigger('click');

    expect(wrapper.emitted('page-change')).toBeTruthy();
    expect(wrapper.emitted('page-change')?.[0]).toEqual([1]);
  });

  it('displays correct page number', async () => {
    wrapper.setProps({ currentPage: 5 });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.page-indicator').text()).toBe('Page 5');
  });
});