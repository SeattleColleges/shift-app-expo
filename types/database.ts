export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
      departments: {
        Row: {
          created_on: string | null
          department_desc: string | null
          department_id: number
          department_name: string | null
        }
        Insert: {
          created_on?: string | null
          department_desc?: string | null
          department_id?: number
          department_name?: string | null
        }
        Update: {
          created_on?: string | null
          department_desc?: string | null
          department_id?: number
          department_name?: string | null
        }
        Relationships: []
      }
      positions: {
        Row: {
          created_on: string | null
          position_desc: string | null
          position_id: number
          position_name: string | null
        }
        Insert: {
          created_on?: string | null
          position_desc?: string | null
          position_id?: number
          position_name?: string | null
        }
        Update: {
          created_on?: string | null
          position_desc?: string | null
          position_id?: number
          position_name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string | null
          name: string | null
          position: number | null
          profile_id: string
          profile_int_id: number
          role: Database["public"]["Enums"]["user_role"]
          supervisor: string | null
        }
        Insert: {
          email?: string | null
          name?: string | null
          position?: number | null
          profile_id: string
          profile_int_id?: number
          role?: Database["public"]["Enums"]["user_role"]
          supervisor?: string | null
        }
        Update: {
          email?: string | null
          name?: string | null
          position?: number | null
          profile_id?: string
          profile_int_id?: number
          role?: Database["public"]["Enums"]["user_role"]
          supervisor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_position_fkey"
            columns: ["position"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["position_id"]
          },
          {
            foreignKeyName: "profiles_supervisor_fkey"
            columns: ["supervisor"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      shift_changes: {
        Row: {
          approved_at: string | null
          approved_by_supervisor_id: number | null
          coverage_reason: string | null
          covered_at: string | null
          covering_profile_id: number | null
          denied_at: string | null
          denied_by_supervisor_id: number | null
          og_shift_profile_id: number | null
          removed_at: string | null
          requested_at: string | null
          shift_change_id: number
          shift_id: number | null
          status: Database["public"]["Enums"]["shift_status"]
        }
        Insert: {
          approved_at?: string | null
          approved_by_supervisor_id?: number | null
          coverage_reason?: string | null
          covered_at?: string | null
          covering_profile_id?: number | null
          denied_at?: string | null
          denied_by_supervisor_id?: number | null
          og_shift_profile_id?: number | null
          removed_at?: string | null
          requested_at?: string | null
          shift_change_id?: number
          shift_id?: number | null
          status?: Database["public"]["Enums"]["shift_status"]
        }
        Update: {
          approved_at?: string | null
          approved_by_supervisor_id?: number | null
          coverage_reason?: string | null
          covered_at?: string | null
          covering_profile_id?: number | null
          denied_at?: string | null
          denied_by_supervisor_id?: number | null
          og_shift_profile_id?: number | null
          removed_at?: string | null
          requested_at?: string | null
          shift_change_id?: number
          shift_id?: number | null
          status?: Database["public"]["Enums"]["shift_status"]
        }
        Relationships: [
          {
            foreignKeyName: "shift_changes_approved_by_supervisor_id_fkey"
            columns: ["approved_by_supervisor_id"]
            isOneToOne: false
            referencedRelation: "supervisors"
            referencedColumns: ["supervisor_id"]
          },
          {
            foreignKeyName: "shift_changes_covering_profile_id_fkey"
            columns: ["covering_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_int_id"]
          },
          {
            foreignKeyName: "shift_changes_denied_by_supervisor_id_fkey"
            columns: ["denied_by_supervisor_id"]
            isOneToOne: false
            referencedRelation: "supervisors"
            referencedColumns: ["supervisor_id"]
          },
          {
            foreignKeyName: "shift_changes_og_shift_profile_id_fkey"
            columns: ["og_shift_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_int_id"]
          },
          {
            foreignKeyName: "shift_changes_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["shift_id"]
          },
        ]
      }
      shifts: {
        Row: {
          assigned_user_id: number | null
          coverage_reason: string | null
          created_on: string | null
          department_id: number | null
          duration: number | null
          needs_coverage: boolean | null
          notes: string | null
          shift_id: number
          shift_name: string | null
          slot: unknown
          supervisor_id: number | null
        }
        Insert: {
          assigned_user_id?: number | null
          coverage_reason?: string | null
          created_on?: string | null
          department_id?: number | null
          duration?: number | null
          needs_coverage?: boolean | null
          notes?: string | null
          shift_id?: number
          shift_name?: string | null
          slot: unknown
          supervisor_id?: number | null
        }
        Update: {
          assigned_user_id?: number | null
          coverage_reason?: string | null
          created_on?: string | null
          department_id?: number | null
          duration?: number | null
          needs_coverage?: boolean | null
          notes?: string | null
          shift_id?: number
          shift_name?: string | null
          slot?: unknown
          supervisor_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shifts_assigned_user_id_fkey"
            columns: ["assigned_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_int_id"]
          },
          {
            foreignKeyName: "shifts_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["department_id"]
          },
          {
            foreignKeyName: "shifts_supervisor_id_fkey"
            columns: ["supervisor_id"]
            isOneToOne: false
            referencedRelation: "supervisors"
            referencedColumns: ["supervisor_id"]
          },
        ]
      }
      supervisors: {
        Row: {
          added_at: string | null
          department: number | null
          supervisor_id: number
        }
        Insert: {
          added_at?: string | null
          department?: number | null
          supervisor_id: number
        }
        Update: {
          added_at?: string | null
          department?: number | null
          supervisor_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "supervisors_department_fkey"
            columns: ["department"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["department_id"]
          },
          {
            foreignKeyName: "supervisors_supervisor_id_fkey"
            columns: ["supervisor_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["profile_int_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_covering_id_to_shift_change: {
        Args: { shift_id_param: number; covering_profile_id_param: number }
        Returns: Record<string, unknown>
      }
      add_shift_to_shift_change: {
        Args: { shift_id_param: number; coverage_reason_param?: string }
        Returns: Record<string, unknown>
      }
      approve_update_shift_w_profile_ids: {
        Args: { shift_id_param: number; supervisor_id_param: number }
        Returns: Record<string, unknown>
      }
      convert_pacific_tz: {
        Args: { time_param: string }
        Returns: string
      }
      deny_shift_change: {
        Args: { shift_id_param: number; supervisor_id_param: number }
        Returns: Record<string, unknown>
      }
      gbt_bit_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_bool_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_bool_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_bpchar_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_bytea_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_cash_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_cash_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_date_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_date_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_enum_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_enum_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_float4_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_float4_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_float8_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_float8_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_inet_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_int2_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_int2_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_int4_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_int4_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_int8_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_int8_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_intv_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_intv_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_intv_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_macad_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_macad_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_macad8_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_macad8_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_numeric_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_oid_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_oid_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_text_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_time_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_time_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_timetz_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_ts_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_ts_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_tstz_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_uuid_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_uuid_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_var_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_var_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey_var_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey_var_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey16_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey16_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey2_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey2_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey32_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey32_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey4_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey4_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey8_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey8_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      get_shift_data: {
        Args: { shift_id_param: number }
        Returns: Record<string, unknown>
      }
      is_supervisor: {
        Args: { supervisor_id_param: number }
        Returns: boolean
      }
      shift_owner_removed_shift: {
        Args: { shift_id_param: number }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      shift_status: "removed" | "denied" | "unclaimed" | "pending" | "approved"
      user_role: "employee" | "supervisor" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      shift_status: ["removed", "denied", "unclaimed", "pending", "approved"],
      user_role: ["employee", "supervisor", "admin"],
    },
  },
} as const

