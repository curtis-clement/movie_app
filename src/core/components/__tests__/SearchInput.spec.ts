import { beforeEach, describe, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import SearchInput from '@/core/components/SearchInput.vue';

const mountComponent = (props: {
  placeholder: string;
  modelValue: string;
}) => {
  return mount(SearchInput, {
    props,
  });
};

describe('SearchInput', () => {
  let wrapper: VueWrapper<InstanceType<typeof SearchInput>>;

  beforeEach(() => {
    wrapper = mountComponent({
      placeholder: 'Search shows',
      modelValue: '',
    });
  });

  it('renders the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('passes props correctly', () => {
    expect(wrapper.props()).toEqual({
      placeholder: 'Search shows',
      modelValue: '',
      disabled: false,
    });
  });

  it('displays the placeholder text', () => {
    expect(wrapper.find('input').attributes('placeholder')).toBe('Search shows');
  });

  it('emits update:model-value event when input value changes', () => {
    const input = wrapper.find('input');
    input.setValue('New value');
    expect(wrapper.emitted('update:model-value')).toEqual([['New value']]);
  });

  it('does not emit update:modelValue event when input is disabled', async () => {
    wrapper.setProps({ disabled: true });
    await wrapper.vm.$nextTick();
    const input = wrapper.find('input');
    input.setValue('New value');
    expect(wrapper.emitted('update:model-value')).toBeUndefined();
  });
});
