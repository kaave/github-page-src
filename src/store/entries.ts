/* eslint-disable no-param-reassign */
import fetchEntries from '~/apollo/query/entries.gql';
import { Entry, EntryJson } from '../value-objects/Entry';

export type State = { entries: Entry[] };

export const state: () => State = () => ({ entries: [] });

export const mutations = {
  set(currentState: State, payload: Entry[]) {
    currentState.entries = payload;
  },
};

export const actions = {
  async get(context: any) {
    const {
      data: { entries },
    }: { data: { entries: EntryJson[] } } = await (this as any).app.apolloProvider.defaultClient.query({
      query: fetchEntries,
      variables: {
        orderBy: 'publish_DESC',
      },
    });

    const parsedEntries = entries.map<Entry>(src => ({
      ...src,
      publish: new Date(src.publish),
      entryHtml: (this as any).$md.render(src.entry),
    }));

    context.commit('set', parsedEntries);
  },
};

export type MutationKeys = keyof typeof mutations;
