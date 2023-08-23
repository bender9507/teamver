export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      chatInvite: {
        Row: {
          createdAt: string
          id: number
          memberId: string
          ownerId: string
          state: Database["public"]["Enums"]["invite_state"]
        }
        Insert: {
          createdAt?: string
          id?: number
          memberId: string
          ownerId: string
          state?: Database["public"]["Enums"]["invite_state"]
        }
        Update: {
          createdAt?: string
          id?: number
          memberId?: string
          ownerId?: string
          state?: Database["public"]["Enums"]["invite_state"]
        }
        Relationships: [
          {
            foreignKeyName: "chatInvite_memberId_fkey"
            columns: ["memberId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chatInvite_ownerId_fkey"
            columns: ["ownerId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      chatMessages: {
        Row: {
          createdAt: string
          id: number
          message: string
          roomId: number
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: number
          message: string
          roomId: number
          userId: string
        }
        Update: {
          createdAt?: string
          id?: number
          message?: string
          roomId?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatMessages_roomId_fkey"
            columns: ["roomId"]
            referencedRelation: "chatRooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chatMessages_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      chatRooms: {
        Row: {
          createdAt: string
          id: number
        }
        Insert: {
          createdAt?: string
          id?: number
        }
        Update: {
          createdAt?: string
          id?: number
        }
        Relationships: []
      }
      chatUsers: {
        Row: {
          chatId: number
          id: number
          userId: string
        }
        Insert: {
          chatId: number
          id?: number
          userId: string
        }
        Update: {
          chatId?: number
          id?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatUsers_chatId_fkey"
            columns: ["chatId"]
            referencedRelation: "chatRooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chatUsers_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      constantAreas: {
        Row: {
          en: string
          id: number
          jp: string
          ko: string
        }
        Insert: {
          en: string
          id?: number
          jp: string
          ko: string
        }
        Update: {
          en?: string
          id?: number
          jp?: string
          ko?: string
        }
        Relationships: []
      }
      constantJobs: {
        Row: {
          en: string
          id: number
          jp: string
          ko: string
        }
        Insert: {
          en: string
          id?: number
          jp: string
          ko: string
        }
        Update: {
          en?: string
          id?: number
          jp?: string
          ko?: string
        }
        Relationships: []
      }
      constantLanguages: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      constantPersonalities: {
        Row: {
          en: string
          id: number
          jp: string
          ko: string
        }
        Insert: {
          en: string
          id?: number
          jp: string
          ko: string
        }
        Update: {
          en?: string
          id?: number
          jp?: string
          ko?: string
        }
        Relationships: []
      }
      constantPositions: {
        Row: {
          en: string
          id: number
          jp: string
          ko: string
        }
        Insert: {
          en: string
          id?: number
          jp: string
          ko: string
        }
        Update: {
          en?: string
          id?: number
          jp?: string
          ko?: string
        }
        Relationships: []
      }
      constantProjectTypes: {
        Row: {
          en: string
          id: number
          jp: string
          ko: string
        }
        Insert: {
          en: string
          id?: number
          jp: string
          ko: string
        }
        Update: {
          en?: string
          id?: number
          jp?: string
          ko?: string
        }
        Relationships: []
      }
      constantReactions: {
        Row: {
          en: string
          id: number
          jp: string
          ko: string
        }
        Insert: {
          en: string
          id?: number
          jp: string
          ko: string
        }
        Update: {
          en?: string
          id?: number
          jp?: string
          ko?: string
        }
        Relationships: []
      }
      constantSkills: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      likedMember: {
        Row: {
          createdAt: string
          id: number
          memberId: string
          ownerId: string
        }
        Insert: {
          createdAt?: string
          id?: number
          memberId: string
          ownerId: string
        }
        Update: {
          createdAt?: string
          id?: number
          memberId?: string
          ownerId?: string
        }
        Relationships: [
          {
            foreignKeyName: "likedMember_memberId_fkey"
            columns: ["memberId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likedMember_ownerId_fkey"
            columns: ["ownerId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      likedProject: {
        Row: {
          createdAt: string
          id: number
          memberId: string
          projectId: number
        }
        Insert: {
          createdAt?: string
          id?: number
          memberId: string
          projectId: number
        }
        Update: {
          createdAt?: string
          id?: number
          memberId?: string
          projectId?: number
        }
        Relationships: [
          {
            foreignKeyName: "likedProject_memberId_fkey"
            columns: ["memberId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likedProject_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      profileAreas: {
        Row: {
          areaId: number
          id: number
          userId: string
        }
        Insert: {
          areaId: number
          id?: number
          userId: string
        }
        Update: {
          areaId?: number
          id?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "profileAreas_areaId_fkey"
            columns: ["areaId"]
            referencedRelation: "constantAreas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profileAreas_userId_fkey"
            columns: ["userId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profileJobs: {
        Row: {
          id: number
          jobId: number
          userId: string
        }
        Insert: {
          id?: number
          jobId: number
          userId: string
        }
        Update: {
          id?: number
          jobId?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "profileJobs_jobId_fkey"
            columns: ["jobId"]
            referencedRelation: "constantJobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profileJobs_userId_fkey"
            columns: ["userId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profileLanguages: {
        Row: {
          id: number
          languageId: number
          userId: string
        }
        Insert: {
          id?: number
          languageId: number
          userId: string
        }
        Update: {
          id?: number
          languageId?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "profileLanguages_languageId_fkey"
            columns: ["languageId"]
            referencedRelation: "constantLanguages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profileLanguages_userId_fkey"
            columns: ["userId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profilePersonalities: {
        Row: {
          id: number
          personalityId: number
          userId: string
        }
        Insert: {
          id?: number
          personalityId: number
          userId: string
        }
        Update: {
          id?: number
          personalityId?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "profilePersonalities_personalityId_fkey"
            columns: ["personalityId"]
            referencedRelation: "constantPersonalities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profilePersonalities_userId_fkey"
            columns: ["userId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profilePositions: {
        Row: {
          id: number
          positionId: number
          userId: string
        }
        Insert: {
          id?: number
          positionId: number
          userId: string
        }
        Update: {
          id?: number
          positionId?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "profilePositions_positionId_fkey"
            columns: ["positionId"]
            referencedRelation: "constantPositions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profilePositions_userId_fkey"
            columns: ["userId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          createdAt: string
          githubName: string
          id: string
          imageUrl: string
          introduce: string
          name: string
        }
        Insert: {
          createdAt?: string
          githubName: string
          id: string
          imageUrl: string
          introduce: string
          name: string
        }
        Update: {
          createdAt?: string
          githubName?: string
          id?: string
          imageUrl?: string
          introduce?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profileSkills: {
        Row: {
          id: number
          skillId: number
          userId: string
        }
        Insert: {
          id?: number
          skillId: number
          userId: string
        }
        Update: {
          id?: number
          skillId?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "profileSkills_skillId_fkey"
            columns: ["skillId"]
            referencedRelation: "constantSkills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profileSkills_userId_fkey"
            columns: ["userId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      projectInvite: {
        Row: {
          createdAt: string
          id: number
          memberId: string
          ownerId: string
          projectId: number
          state: Database["public"]["Enums"]["invite_state"]
        }
        Insert: {
          createdAt?: string
          id?: number
          memberId: string
          ownerId: string
          projectId: number
          state?: Database["public"]["Enums"]["invite_state"]
        }
        Update: {
          createdAt?: string
          id?: number
          memberId?: string
          ownerId?: string
          projectId?: number
          state?: Database["public"]["Enums"]["invite_state"]
        }
        Relationships: [
          {
            foreignKeyName: "projectInvite_memberId_fkey"
            columns: ["memberId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projectInvite_ownerId_fkey"
            columns: ["ownerId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projectInvite_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      projectLanguages: {
        Row: {
          id: number
          languageId: number
          projectId: number
        }
        Insert: {
          id?: number
          languageId: number
          projectId: number
        }
        Update: {
          id?: number
          languageId?: number
          projectId?: number
        }
        Relationships: [
          {
            foreignKeyName: "projectLanguages_languageId_fkey"
            columns: ["languageId"]
            referencedRelation: "constantLanguages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projectLanguages_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      projectMembers: {
        Row: {
          id: number
          memberId: string
          projectId: number
        }
        Insert: {
          id?: number
          memberId: string
          projectId: number
        }
        Update: {
          id?: number
          memberId?: string
          projectId?: number
        }
        Relationships: [
          {
            foreignKeyName: "projectMembers_memberId_fkey"
            columns: ["memberId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projectMembers_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      projectPositions: {
        Row: {
          id: number
          positionId: number
          projectId: number
        }
        Insert: {
          id?: number
          positionId: number
          projectId: number
        }
        Update: {
          id?: number
          positionId?: number
          projectId?: number
        }
        Relationships: [
          {
            foreignKeyName: "projectPositions_positionId_fkey"
            columns: ["positionId"]
            referencedRelation: "constantPositions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projectPositions_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          description: string
          endDate: string | null
          id: number
          imageUrl: string
          name: string
          recruitCount: string
          startDate: string | null
          state: Database["public"]["Enums"]["project_state"] | null
        }
        Insert: {
          description: string
          endDate?: string | null
          id?: number
          imageUrl: string
          name: string
          recruitCount: string
          startDate?: string | null
          state?: Database["public"]["Enums"]["project_state"] | null
        }
        Update: {
          description?: string
          endDate?: string | null
          id?: number
          imageUrl?: string
          name?: string
          recruitCount?: string
          startDate?: string | null
          state?: Database["public"]["Enums"]["project_state"] | null
        }
        Relationships: []
      }
      projectSkills: {
        Row: {
          id: number
          projectId: number
          skillId: number
        }
        Insert: {
          id?: number
          projectId: number
          skillId: number
        }
        Update: {
          id?: number
          projectId?: number
          skillId?: number
        }
        Relationships: [
          {
            foreignKeyName: "projectSkills_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projectSkills_skillId_fkey"
            columns: ["skillId"]
            referencedRelation: "constantSkills"
            referencedColumns: ["id"]
          }
        ]
      }
      projectTypes: {
        Row: {
          id: number
          projectId: number
          projectTypeId: number
        }
        Insert: {
          id?: number
          projectId: number
          projectTypeId: number
        }
        Update: {
          id?: number
          projectId?: number
          projectTypeId?: number
        }
        Relationships: [
          {
            foreignKeyName: "projectTypes_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projectTypes_projectTypeId_fkey"
            columns: ["projectTypeId"]
            referencedRelation: "constantProjectTypes"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          comment: string
          createdAt: string
          id: number
          reactionId: number
          receiverId: string
          reviewerId: string
        }
        Insert: {
          comment: string
          createdAt?: string
          id?: number
          reactionId: number
          receiverId: string
          reviewerId: string
        }
        Update: {
          comment?: string
          createdAt?: string
          id?: number
          reactionId?: number
          receiverId?: string
          reviewerId?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_reactionId_fkey"
            columns: ["reactionId"]
            referencedRelation: "constantReactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_receiverId_fkey"
            columns: ["receiverId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewerId_fkey"
            columns: ["reviewerId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      invite_state: "PENDING" | "DENIED" | "GRANT"
      project_state: "IN_RECRUIT" | "DONE_RECRUIT" | "DONE_PROJECT"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
