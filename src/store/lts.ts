/* eslint-disable no-param-reassign */
import fetchLTs from '~/apollo/query/lts.gql';
import { LT, LTJson } from '../value-objects/LT';

export type State = { lts: LT[] };

export const state: () => State = () => ({ lts: [] });

export const mutations = {
  set(currentState: State, payload: LT[]) {
    currentState.lts = payload;
  },
};

export const actions = {
  async get(context: any) {
    const {
      data: { lts },
    }: { data: { lts: LTJson[] } } = await (this as any).app.apolloProvider.defaultClient.query({
      query: fetchLTs,
      variables: {
        orderBy: 'date_DESC',
      },
    });

    context.commit('set', lts.map<LT>(src => ({ ...src, date: new Date(src.date) })));
  },
};

export type MutationKeys = keyof typeof mutations;
