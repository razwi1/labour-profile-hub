import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Temporary fallback for development - this will be replaced once Supabase is properly connected
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey

// Create a mock client for development if Supabase is not configured
const createMockClient = () => ({
  auth: {
    signUp: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
    signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
  },
  from: () => ({
    select: () => ({
      order: () => ({ data: [], error: null }),
      data: [],
      error: null
    }),
    insert: () => ({ data: null, error: { message: 'Supabase not configured' } }),
    update: () => ({
      eq: () => ({ data: null, error: { message: 'Supabase not configured' } }),
      data: null, 
      error: { message: 'Supabase not configured' }
    }),
  }),
  storage: {
    from: () => ({
      upload: async () => ({ error: { message: 'Supabase not configured' } }),
    }),
  },
})

// Export either real Supabase client or mock client
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient()

export const isSupabaseReady = isSupabaseConfigured

export type UserRole = 'labour' | 'supervisor' | 'site_manager' | 'client_contractor'

export interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  role: UserRole
  verification_status: 'pending' | 'approved' | 'rejected'
  documents: string[]
  created_at: string
}