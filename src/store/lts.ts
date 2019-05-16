/* eslint-disable no-param-reassign */
import { Store } from 'vuex';
import { Context } from '@nuxt/vue-app/types';
import { ApolloClient } from 'apollo-client';
import fetchLTs from '~/apollo/query/lts.gql';
import { LT, LTJson } from '../value-objects/LT';

export type State = { lts: LT[] };

type LTsStore = Store<State> & {
  app: Context & {
    apolloProvider: {
      defaultClient: ApolloClient;
    };
  };
};

export const state: () => State = () => ({ lts: [] });

export const mutations = {
  set(currentState: State, payload: LT[]) {
    currentState.lts = payload;
  },
};

export const actions = {
  async get(this: LTsStore, context: any) {
    const {
      data: { lts },
    }: { data: { lts: LTJson[] } } = await this.app.apolloProvider.defaultClient.query({
      query: fetchLTs as any, // FIXME: 型定義的にstringが通らないけど実際は通るのでだるいため逃げる
      variables: {
        orderBy: 'date_DESC',
      },
    });

    context.commit('set', lts.map<LT>(src => ({ ...src, date: new Date(src.date) })));
  },
};

export type MutationKeys = keyof typeof mutations;
