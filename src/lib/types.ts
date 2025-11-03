export interface Playlist {
  id: string;
  name: string;
  userId?: string;
  coverUrl?: string;
  songIds?: string[];
  createdAt?: Date;
  description?: string;
  liked?: boolean;
}

export interface SongListItem {
  id: string;
  title: string;
  userId: string;
  albumArtUrl?: string;
  filename: string;
  playlistIds?: string[];
  uploadedAt?: Date;
}
