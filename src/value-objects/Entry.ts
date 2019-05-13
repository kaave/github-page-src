import { ThumbnailJson, Thumbnail } from './Thumbnail';

export type EntryJson = {
  status: string;
  id: string;
  publish: string;
  subject: string;
  entry: string;
  thumbnail: ThumbnailJson;
};

export type Entry = {
  status: string;
  id: string;
  publish: Date;
  subject: string;
  entryHtml: string;
  thumbnail: Thumbnail;
};
