export interface Images {
  height: number;
  url: string;
  width: number;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Artists {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Album {
  album_type: string;
  artists: Artists[];
  available_markets: Array<string>;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Items {
  album: Album;
  artists: Artists[];
  available_markets: Array<string>;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface SoundResponse {
  tracks: {
    href: string;
    items: Items[];
    limit: number;
    next: string;
    offset: 50;
    previous: string;
    total: 100000;
  };
}

export interface SoundtrackResponse extends SoundResponseNormalized {
  genre: string;
}

export interface SoundResponseNormalized {
  artists: Array<string>;
  spotify_link: string;
  soundtrack: string;
}
