import React from 'react';
import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
import Container from '../../src/components/Container';
import { sampleData } from '../../mocks/mock.config';
import { mount } from 'enzyme';
import store from '../../src/store';

describe('Container tests', () => {
  const handleClick = { preventDefault: jest.fn() };

  describe('Containers with temperature in range', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Container value={sampleData.containers['1']} />
      </Provider>
    );
    it('should render a container component for temperature in range', () => {
      expect(wrapper.find('h5')).toHaveLength(1);
      expect(wrapper.find('p')).toHaveLength(1);
      expect(wrapper.find('h3')).toHaveLength(1);
      expect(wrapper.find('div').at(2).hasClass('cardOk')).toEqual(true);
    });
    it('simulates click events', () => {
      wrapper.find('button').prop('onClick')(handleClick);
      expect(handleClick.preventDefault).toHaveBeenCalledTimes(1);
    });
  });

  describe('Containers with temperature out of range', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Container value={sampleData.containers['2']} />
      </Provider>
    );
    it('should render a container component for temperature out of range', () => {
      expect(wrapper.find('h5')).toHaveLength(1);
      expect(wrapper.find('p')).toHaveLength(1);
      expect(wrapper.find('h3')).toHaveLength(1);
      expect(wrapper.find('div').at(2).hasClass('cardError')).toEqual(true);
    });
    it('simulates click events', () => {
      wrapper.find('button').prop('onClick')(handleClick);
      expect(handleClick.preventDefault).toHaveBeenCalledTimes(2);
    });
  });
});
