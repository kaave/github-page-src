/* eslint-disable no-param-reassign */
import { Store } from 'vuex';
import { Context } from '@nuxt/vue-app/types';
import { ApolloClient } from 'apollo-client';
import fetchEntries from '~/apollo/query/entries.gql';
import { Entry, EntryJson } from '../value-objects/Entry';

export type State = { entries: Entry[] };

type EntriessStore = Store<State> & {
  app: Context & {
    apolloProvider: {
      defaultClient: ApolloClient;
    };
  };
};

export const state: () => State = () => ({ entries: [] });

export const mutations = {
  set(currentState: State, payload: Entry[]) {
    currentState.entries = payload;
  },
};

export const actions = {
  async get(this: EntriessStore, context: any) {
    const {
      data: { entries },
    }: { data: { entries: EntryJson[] } } = await this.app.apolloProvider.defaultClient.query({
      query: fetchEntries as any, // FIXME: 型定義的にstringが通らないけど実際は通るのでだるいため逃げる
      variables: {
        orderBy: 'publish_DESC',
      },
    });

    context.commit(
      'set',
      entries.map<Entry>(src => ({
        ...src,
        publish: new Date(src.publish),
        entryHtml: (this as any).$md.render(src.entry),
      })),
    );
  },
};

export type MutationKeys = keyof typeof mutations;
