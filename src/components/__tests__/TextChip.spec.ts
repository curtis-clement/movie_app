import { beforeEach, describe, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import TextChip from '@/components/TextChip.vue';

const mountComponent = (props: {
  text: string;
  selected: boolean;
}) => {
  return mount(TextChip, {
    props,
  });
};

describe('TextChip', () => {
  let wrapper: VueWrapper<InstanceType<typeof TextChip>>;

  beforeEach(() => {
    wrapper = mountComponent({
      text: 'Test Text',
      selected: false,
    });
  });

  it('renders the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('passes props correctly', () => {
    expect(wrapper.props()).toEqual({
      text: 'Test Text',
      selected: false,
      disabled: false,
    });
  });

  it('displays the text', () => {
    expect(wrapper.text()).toBe('Test Text');
  });

  it('emits click event when clicked', () => {
    wrapper.find('.text-chip').trigger('click');
    expect(wrapper.emitted('emit-click')).toBeDefined();
  });

  it('does not emit click event when disabled', async () => {
    wrapper.setProps({ disabled: true });
    await wrapper.vm.$nextTick();
    wrapper.find('.text-chip').trigger('click');
    expect(wrapper.emitted('emit-click')).toBeUndefined();
  });
});
