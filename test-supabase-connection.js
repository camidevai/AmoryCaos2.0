import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avqcfefaershlcffzotw.supabase.co';
const supabaseAnonKey = 'sb_publishable_6RkYpetmpWtSCSKOZ1kr9g_vlhbVmfE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('🔍 Testing Supabase connection...\n');

// Test 1: Read game state
async function testRead() {
    console.log('📖 Test 1: Reading game state...');
    const { data, error } = await supabase
        .from('game_state')
        .select('*')
        .eq('id', 'game-session-1')
        .single();

    if (error) {
        console.error('❌ Error reading:', error.message);
        return false;
    }

    console.log('✅ Success! Current state:', data);
    return true;
}

// Test 2: Update game state
async function testUpdate() {
    console.log('\n📝 Test 2: Updating game state...');
    const { data, error } = await supabase
        .from('game_state')
        .update({
            votes: { true: 5, false: 3 },
            updated_at: new Date().toISOString()
        })
        .eq('id', 'game-session-1')
        .select();

    if (error) {
        console.error('❌ Error updating:', error.message);
        return false;
    }

    console.log('✅ Success! Updated state:', data);
    return true;
}

// Test 3: Real-time subscription
async function testRealtime() {
    console.log('\n🔴 Test 3: Testing real-time subscription...');
    console.log('Listening for changes for 10 seconds...\n');

    const channel = supabase
        .channel('test-channel')
        .on('postgres_changes',
            { event: '*', schema: 'public', table: 'game_state' },
            (payload) => {
                console.log('🔔 Real-time update received!');
                console.log('   Event:', payload.eventType);
                console.log('   New data:', payload.new);
            }
        )
        .subscribe((status) => {
            console.log('📡 Subscription status:', status);
        });

    // Wait 10 seconds
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Cleanup
    await supabase.removeChannel(channel);
    console.log('\n✅ Real-time test completed');
}

// Run all tests
async function runTests() {
    try {
        const readSuccess = await testRead();
        if (!readSuccess) {
            console.log('\n❌ Read test failed. Check your Supabase configuration.');
            process.exit(1);
        }

        const updateSuccess = await testUpdate();
        if (!updateSuccess) {
            console.log('\n❌ Update test failed. Check your RLS policies.');
            process.exit(1);
        }

        await testRealtime();

        console.log('\n✅ All tests passed! Supabase is configured correctly.');
        console.log('\n💡 Now try opening your app in two browser tabs to see real-time sync!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Unexpected error:', error);
        process.exit(1);
    }
}

runTests();

