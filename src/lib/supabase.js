import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avqcfefaershlcffzotw.supabase.co';
const supabaseAnonKey = 'sb_publishable_6RkYpetmpWtSCSKOZ1kr9g_vlhbVmfE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    realtime: {
        params: {
            eventsPerSecond: 10
        }
    }
});

