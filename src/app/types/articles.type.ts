export type Article = {
  path: string;
  title: string;
  created_at: Date;
  updated_at: Date | null;
  abstract: string;
  tags: string[];
};

export function isArticle(v: unknown): v is Article {
  return (
    v !== null &&
    typeof v === 'object' &&
    'title' in v &&
    'created_at' in v &&
    'abstract' in v &&
    'tags' in v
  );
}
