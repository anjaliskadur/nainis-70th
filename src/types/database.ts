export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      memories: {
        Row: {
          id: string;
          author: string;
          message: string;
          photo_url: string | null;
          video_url: string | null;
          edit_token: string;
          approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          author?: string;
          message: string;
          photo_url?: string | null;
          video_url?: string | null;
          edit_token?: string;
          approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          author?: string;
          message?: string;
          photo_url?: string | null;
          video_url?: string | null;
          edit_token?: string;
          approved?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      performance_signups: {
        Row: {
          id: string;
          name: string;
          act: string;
          notes: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          act: string;
          notes?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          act?: string;
          notes?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      edit_memory: {
        Args: {
          p_id: string;
          p_token: string;
          p_author: string;
          p_message: string;
        };
        Returns: boolean;
      };
      delete_memory: {
        Args: {
          p_id: string;
          p_token: string;
        };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
