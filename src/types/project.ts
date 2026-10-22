export type ProjectMedia = {
  desktopPoster: string | null;
  mobilePoster: string | null;
  desktopVideo: string | null;
  mobileVideo: string | null;
};
export type Project = {
  slug: string;
  title: string;
  category: string;
  featured: boolean;
  order: number;
  repository: string;
  website: string | null;
  websiteVerified: boolean;
  media: ProjectMedia;
  summary: string | null;
  status: string;
  segment: string;
  color: string;
};
