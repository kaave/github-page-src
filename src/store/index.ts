/* eslint-disable no-param-reassign */

export type State = { entered: boolean };

export const state: () => State = () => ({
  entered: false, // このステートが変更されるとアニメーションが🔥
});

export const getters = {
  entered: (currentState: State) => currentState.entered, // 各コンポーネントのウォッチャで監視するので
};

export const mutations = {
  click(currentState: State) {
    currentState.entered = !currentState.entered; // クリックされたらステートを切り替えます
  },
};

export type MutationKeys = keyof typeof mutations;

export const actions = {
  async nuxtServerInit({ dispatch }) {
    return dispatch('entries/get');
  },
};
