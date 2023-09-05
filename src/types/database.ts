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
      chatMembers: {
        Row: {
          createdAt: string
          id: number
          roomId: number
          state: boolean
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: number
          roomId: number
          state?: boolean
          userId: string
        }
        Update: {
          createdAt?: string
          id?: number
          roomId?: number
          state?: boolean
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatMembers_roomId_fkey"
            columns: ["roomId"]
            referencedRelation: "chatRooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chatMembers_userId_fkey"
            columns: ["userId"]
            referencedRelation: "profiles"
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
          senderId: string
          state: boolean
        }
        Insert: {
          createdAt?: string
          id?: number
          message: string
          roomId: number
          senderId: string
          state?: boolean
        }
        Update: {
          createdAt?: string
          id?: number
          message?: string
          roomId?: number
          senderId?: string
          state?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "chatMessages_roomId_fkey"
            columns: ["roomId"]
            referencedRelation: "chatRooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chatMessages_senderId_fkey"
            columns: ["senderId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      chatRequestMember: {
        Row: {
          createdAt: string
          followProjectId: number
          id: number
          receiverId: string
          requesterId: string
          state: Database["public"]["Enums"]["invite_state"]
        }
        Insert: {
          createdAt?: string
          followProjectId: number
          id?: number
          receiverId: string
          requesterId: string
          state?: Database["public"]["Enums"]["invite_state"]
        }
        Update: {
          createdAt?: string
          followProjectId?: number
          id?: number
          receiverId?: string
          requesterId?: string
          state?: Database["public"]["Enums"]["invite_state"]
        }
        Relationships: [
          {
            foreignKeyName: "chatRequestMember_followProjectId_fkey"
            columns: ["followProjectId"]
            referencedRelation: "followProject"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chatRequestMember_receiverId_fkey"
            columns: ["receiverId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chatRequestMember_requesterId_fkey"
            columns: ["requesterId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      chatRequestOwner: {
        Row: {
          createdAt: string
          followId: number
          id: number
          receiverId: string
          requesterId: string
          state: Database["public"]["Enums"]["invite_state"]
        }
        Insert: {
          createdAt?: string
          followId: number
          id?: number
          receiverId: string
          requesterId: string
          state?: Database["public"]["Enums"]["invite_state"]
        }
        Update: {
          createdAt?: string
          followId?: number
          id?: number
          receiverId?: string
          requesterId?: string
          state?: Database["public"]["Enums"]["invite_state"]
        }
        Relationships: [
          {
            foreignKeyName: "chatRequestOwner_followId_fkey"
            columns: ["followId"]
            referencedRelation: "follow"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chatRequestOwner_receiverId_fkey"
            columns: ["receiverId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chatRequestOwner_requesterId_fkey"
            columns: ["requesterId"]
            referencedRelation: "profiles"
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
      constantAreas: {
        Row: {
          en: string
          id: number
          jp: string
          ko: string
          order: number
        }
        Insert: {
          en: string
          id?: number
          jp: string
          ko: string
          order?: number
        }
        Update: {
          en?: string
          id?: number
          jp?: string
          ko?: string
          order?: number
        }
        Relationships: []
      }
      constantJobs: {
        Row: {
          en: string
          id: number
          jp: string
          ko: string
          order: number
        }
        Insert: {
          en: string
          id?: number
          jp: string
          ko: string
          order?: number
        }
        Update: {
          en?: string
          id?: number
          jp?: string
          ko?: string
          order?: number
        }
        Relationships: []
      }
      constantLanguages: {
        Row: {
          id: number
          name: string
          order: number
        }
        Insert: {
          id?: number
          name: string
          order?: number
        }
        Update: {
          id?: number
          name?: string
          order?: number
        }
        Relationships: []
      }
      constantPersonalities: {
        Row: {
          en: string
          id: number
          jp: string
          ko: string
          order: number
        }
        Insert: {
          en: string
          id?: number
          jp: string
          ko: string
          order?: number
        }
        Update: {
          en?: string
          id?: number
          jp?: string
          ko?: string
          order?: number
        }
        Relationships: []
      }
      constantPositions: {
        Row: {
          en: string
          id: number
          jp: string
          ko: string
          order: number
        }
        Insert: {
          en: string
          id?: number
          jp: string
          ko: string
          order?: number
        }
        Update: {
          en?: string
          id?: number
          jp?: string
          ko?: string
          order?: number
        }
        Relationships: []
      }
      constantProjectTypes: {
        Row: {
          en: string
          id: number
          jp: string
          ko: string
          order: number
        }
        Insert: {
          en: string
          id?: number
          jp: string
          ko: string
          order?: number
        }
        Update: {
          en?: string
          id?: number
          jp?: string
          ko?: string
          order?: number
        }
        Relationships: []
      }
      constantReactions: {
        Row: {
          en: string
          id: number
          jp: string
          ko: string
          order: number
        }
        Insert: {
          en: string
          id?: number
          jp: string
          ko: string
          order?: number
        }
        Update: {
          en?: string
          id?: number
          jp?: string
          ko?: string
          order?: number
        }
        Relationships: []
      }
      constantRoles: {
        Row: {
          en: string
          id: number
          jp: string
          ko: string
          order: number
        }
        Insert: {
          en: string
          id?: number
          jp: string
          ko: string
          order?: number
        }
        Update: {
          en?: string
          id?: number
          jp?: string
          ko?: string
          order?: number
        }
        Relationships: []
      }
      constantSkills: {
        Row: {
          id: number
          name: string
          order: number
        }
        Insert: {
          id?: number
          name: string
          order?: number
        }
        Update: {
          id?: number
          name?: string
          order?: number
        }
        Relationships: []
      }
      follow: {
        Row: {
          createdAt: string
          id: number
          myId: string
          opponentId: string
        }
        Insert: {
          createdAt?: string
          id?: number
          myId: string
          opponentId: string
        }
        Update: {
          createdAt?: string
          id?: number
          myId?: string
          opponentId?: string
        }
        Relationships: [
          {
            foreignKeyName: "follow_myId_fkey"
            columns: ["myId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follow_opponentId_fkey"
            columns: ["opponentId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      followProject: {
        Row: {
          createdAt: string
          followerId: string
          id: number
          projectId: number
        }
        Insert: {
          createdAt?: string
          followerId: string
          id?: number
          projectId: number
        }
        Update: {
          createdAt?: string
          followerId?: string
          id?: number
          projectId?: number
        }
        Relationships: [
          {
            foreignKeyName: "followProject_followerId_fkey"
            columns: ["followerId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "followProject_projectId_fkey"
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
      profileProjectTypes: {
        Row: {
          id: number
          projectTypeId: number
          userId: string
        }
        Insert: {
          id?: number
          projectTypeId: number
          userId: string
        }
        Update: {
          id?: number
          projectTypeId?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "profileProjectTypes_projectTypeId_fkey"
            columns: ["projectTypeId"]
            referencedRelation: "constantProjectTypes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profileProjectTypes_userId_fkey"
            columns: ["userId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          blog: string | null
          createdAt: string
          github: string
          id: string
          imageUrl: string
          introduce: string
          job: number
          name: string
          role: number
        }
        Insert: {
          blog?: string | null
          createdAt?: string
          github: string
          id: string
          imageUrl: string
          introduce: string
          job: number
          name: string
          role: number
        }
        Update: {
          blog?: string | null
          createdAt?: string
          github?: string
          id?: string
          imageUrl?: string
          introduce?: string
          job?: number
          name?: string
          role?: number
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_job_fkey"
            columns: ["job"]
            referencedRelation: "constantJobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_role_fkey"
            columns: ["role"]
            referencedRelation: "constantRoles"
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
      projectAreas: {
        Row: {
          areaId: number
          id: number
          projectId: number
        }
        Insert: {
          areaId: number
          id?: number
          projectId: number
        }
        Update: {
          areaId?: number
          id?: number
          projectId?: number
        }
        Relationships: [
          {
            foreignKeyName: "projectAreas_areaId_fkey"
            columns: ["areaId"]
            referencedRelation: "constantAreas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projectAreas_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      projectInvite: {
        Row: {
          createdAt: string
          id: number
          projectId: number
          receiverId: string
          requesterId: string
          state: Database["public"]["Enums"]["invite_state"]
        }
        Insert: {
          createdAt?: string
          id?: number
          projectId: number
          receiverId: string
          requesterId: string
          state?: Database["public"]["Enums"]["invite_state"]
        }
        Update: {
          createdAt?: string
          id?: number
          projectId?: number
          receiverId?: string
          requesterId?: string
          state?: Database["public"]["Enums"]["invite_state"]
        }
        Relationships: [
          {
            foreignKeyName: "projectInvite_projectId_fkey"
            columns: ["projectId"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projectInvite_receiverId_fkey"
            columns: ["receiverId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projectInvite_requesterId_fkey"
            columns: ["requesterId"]
            referencedRelation: "profiles"
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
          ownerId: string
          projectType: number
          recruitCount: string
          startDate: string | null
          state: Database["public"]["Enums"]["project_state"]
        }
        Insert: {
          description: string
          endDate?: string | null
          id?: number
          imageUrl: string
          name: string
          ownerId: string
          projectType: number
          recruitCount: string
          startDate?: string | null
          state?: Database["public"]["Enums"]["project_state"]
        }
        Update: {
          description?: string
          endDate?: string | null
          id?: number
          imageUrl?: string
          name?: string
          ownerId?: string
          projectType?: number
          recruitCount?: string
          startDate?: string | null
          state?: Database["public"]["Enums"]["project_state"]
        }
        Relationships: [
          {
            foreignKeyName: "projects_ownerId_fkey"
            columns: ["ownerId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_projectType_fkey"
            columns: ["projectType"]
            referencedRelation: "constantProjectTypes"
            referencedColumns: ["id"]
          }
        ]
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
      fetch_chat_rooms_with_names: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          name: string
          createdat: string
        }[]
      }
      fetch_chat_rooms_with_users: {
        Args: Record<PropertyKey, never>
        Returns: {
          roomid: number
          createdat: string
          userid: string
          username: string
        }[]
      }
      get_profile: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          introduce: string
          imageurl: string
          github: string
          skills: Json[]
          projecttypes: Json[]
          personalities: Json[]
          languages: Json[]
          jobs: Json[]
          areas: Json[]
        }[]
      }
      insert_chatroom_with_member: {
        Args: {
          requester_id: string
          receiver_id: string
        }
        Returns: undefined
      }
      select_constants: {
        Args: Record<PropertyKey, never>
        Returns: {
          areas: Json
          jobs: Json
          languages: Json
          personalities: Json
          positions: Json
          projectTypes: Json
          reactions: Json
          roles: Json
          skills: Json
        }[]
      }
      select_recommended_members: {
        Args: {
          seedValue: number
          userId: string
          skills: number[]
          languages: number[]
          positions: number[]
          areas: number[]
        }
        Returns: {
          blog: string | null
          createdAt: string
          github: string
          id: string
          imageUrl: string
          introduce: string
          job: number
          name: string
          role: number
        }[]
      }
      select_recommended_profiles: {
        Args: {
          seedValue: number
          userId: string
          skills: number[]
          languages: number[]
          positions: number[]
        }
        Returns: {
          blog: string | null
          createdAt: string
          github: string
          id: string
          imageUrl: string
          introduce: string
          job: number
          name: string
          role: number
        }[]
      }
      select_recommended_projects: {
        Args: {
          seedValue: number
          userId: string
          areas: number[]
        }
        Returns: {
          description: string
          endDate: string | null
          id: number
          imageUrl: string
          name: string
          ownerId: string
          projectType: number
          recruitCount: string
          startDate: string | null
          state: Database["public"]["Enums"]["project_state"]
        }[]
      }
      unread_message_count:
        | {
            Args: {
              userid: string
            }
            Returns: number
          }
        | {
            Args: {
              userid: string
              roomid: number
            }
            Returns: number
          }
    }
    Enums: {
      invite_state: "PENDING" | "DENIED" | "GRANT"
      profile_role: "INVITER" | "INVITEE"
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
