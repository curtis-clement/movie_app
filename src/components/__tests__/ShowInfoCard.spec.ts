import { beforeEach, describe, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import ShowInfoCard from '@/components/ShowInfoCard.vue';
import type { ShowInfoCardData } from '@/models/model';

const mockShow = {
  id: 1,
  name: 'Test Show',
  image: {
    medium: 'http://example.com/image.jpg',
    original: 'http://example.com/image.jpg'
  },
  rating: 8.5,
  status: 'Running',
  network: {
    id: 1,
    name: 'Test Network',
    country: {
      code: 'US',
      name: 'United States',
      timezone: 'America/New_York'
    }
  },
  genres: ['Drama', 'Comedy']
}

const mountComponent = (props: { actionBannerText: string, show: ShowInfoCardData }) => {
  return mount(ShowInfoCard, {
    props
  })
}

describe('ShowInfoCard', () => {
  let wrapper: VueWrapper<InstanceType<typeof ShowInfoCard>>;

  beforeEach(() => {
    wrapper = mountComponent({
      actionBannerText: 'View show details',
      show: mockShow
    });
  });
  
  it('renders the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('passes props correctly', () => {
    expect(wrapper.props()).toEqual({
      actionBannerText: 'View show details',
      show: mockShow
    });
  });

  it('displays the show image', () => {
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toBe(mockShow.image.medium);
  });

  it('displays the show details correctly', () => {
    expect(wrapper.text()).toContain(mockShow.name);
    expect(wrapper.text()).toContain(mockShow.rating.toString());
    expect(wrapper.text()).toContain(mockShow.status);
    expect(wrapper.text()).toContain(mockShow.network.name);
    expect(wrapper.text()).toContain(mockShow.genres.join(' / '));
  });
  
  it('emits show-details event when action banner is clicked', () => {
    wrapper.find('.action-banner').trigger('click');
    expect(wrapper.emitted('show-details')).toBeDefined();
    expect(wrapper.emitted('show-details')?.[0]).toEqual([mockShow.id]);
  });
});
  
