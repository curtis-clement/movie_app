import { beforeEach, describe, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import DefaultButton from '@/components/DefaultButton.vue';

const mountComponent = (props: {
  disabled?: boolean;
}) => {
  return mount(DefaultButton, {
    props,
  });
};

describe('DefaultButton', () => {
  let wrapper: VueWrapper<InstanceType<typeof DefaultButton>>;

  beforeEach(() => {
    wrapper = mountComponent({
      disabled: false,
    });
  });

  it('renders the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  
  it('passes props correctly', async () => {
    expect(wrapper.props()).toEqual({
      disabled: false,
    });

    wrapper.setProps({
      disabled: true,
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.props()).toEqual({
      disabled: true,
    });
  });

  it('emits button-click event when clicked', async () => {
    wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('button-click')).toEqual([[]]);
  });

  it('does not emit button-click event when disabled', async () => {
    wrapper.setProps({
      disabled: true,
    });

    await wrapper.vm.$nextTick();
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted('button-click')).toBeUndefined();
  });
});