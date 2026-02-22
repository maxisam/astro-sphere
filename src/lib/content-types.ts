export type ContentEntryData = {
  title: string;
  summary: string;
  date: Date;
  tags: string[];
};

export type ContentEntry = {
  collection: "blog" | "projects";
  slug: string;
  data: ContentEntryData;
};
