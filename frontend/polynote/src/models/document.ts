export interface Document {
  _id: string;
  name: string;
  //A file like string path
  path: string;

  // The tiptap json data. Can't say I have a precise schema for it, so any it is.
  data: any;

  // TODO validation wouldn't kill to be honest
  owner: string;

  // As far as I understood, only one link is necessary, not many ones
  sharableLinkId: string; // A string that gives read or write access

  sharableLinkPermission: 'READ' | 'WRITE';
}
