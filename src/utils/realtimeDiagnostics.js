// Realtime Diagnostics Tool
// Run this in browser console to diagnose Realtime issues

import { supabase } from '../lib/supabase';

export async function runRealtimeDiagnostics() {
    console.log('🔍 Starting Realtime Diagnostics...\n');
    
    const results = {
        connection: false,
        tableAccess: false,
        realtimeEnabled: false,
        subscription: false,
        issues: []
    };

    // Test 1: Basic Connection
    console.log('📡 Test 1: Testing basic Supabase connection...');
    try {
        const { data, error } = await supabase
            .from('game_state')
            .select('*')
            .limit(1);
        
        if (error) {
            console.error('❌ Connection failed:', error.message);
            results.issues.push(`Connection error: ${error.message}`);
        } else {
            console.log('✅ Basic connection works');
            results.connection = true;
        }
    } catch (err) {
        console.error('❌ Connection exception:', err);
        results.issues.push(`Connection exception: ${err.message}`);
    }

    // Test 2: Table Access
    console.log('\n📊 Test 2: Testing table read/write access...');
    try {
        const testId = 'diagnostic-test-' + Date.now();
        
        // Try to insert
        const { error: insertError } = await supabase
            .from('game_state')
            .insert({
                id: testId,
                current_question: 0,
                votes: { true: 0, false: 0 },
                game_state: 'waiting'
            });

        if (insertError) {
            console.error('❌ Insert failed:', insertError.message);
            results.issues.push(`Insert error: ${insertError.message}`);
        } else {
            console.log('✅ Insert works');
            results.tableAccess = true;

            // Clean up test data
            await supabase.from('game_state').delete().eq('id', testId);
        }
    } catch (err) {
        console.error('❌ Table access exception:', err);
        results.issues.push(`Table access exception: ${err.message}`);
    }

    // Test 3: Realtime Subscription
    console.log('\n🔄 Test 3: Testing Realtime subscription...');
    
    return new Promise((resolve) => {
        let subscriptionTimeout;
        let updateReceived = false;

        const channel = supabase
            .channel('diagnostic-channel')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'game_state' },
                (payload) => {
                    console.log('✅ Realtime update received!', payload);
                    updateReceived = true;
                    results.realtimeEnabled = true;
                }
            )
            .subscribe((status, err) => {
                console.log(`📡 Subscription status: ${status}`);
                
                if (status === 'SUBSCRIBED') {
                    console.log('✅ Subscription established');
                    results.subscription = true;

                    // Now test if updates are actually received
                    console.log('\n🧪 Test 4: Triggering a database change to test Realtime...');
                    
                    setTimeout(async () => {
                        try {
                            await supabase
                                .from('game_state')
                                .upsert({
                                    id: 'game-session-1',
                                    current_question: 0,
                                    votes: { true: Math.floor(Math.random() * 10), false: 0 },
                                    game_state: 'waiting',
                                    updated_at: new Date().toISOString()
                                });
                            
                            console.log('✅ Database update triggered');
                            
                            // Wait 3 seconds to see if we receive the update
                            subscriptionTimeout = setTimeout(() => {
                                if (!updateReceived) {
                                    console.error('❌ No Realtime update received after 3 seconds');
                                    console.error('⚠️  This means Realtime is NOT enabled on the table');
                                    results.issues.push('Realtime not enabled on game_state table');
                                } else {
                                    console.log('✅ Realtime is working correctly!');
                                }
                                
                                channel.unsubscribe();
                                printDiagnosticReport(results);
                                resolve(results);
                            }, 3000);
                            
                        } catch (err) {
                            console.error('❌ Failed to trigger update:', err);
                            results.issues.push(`Update trigger failed: ${err.message}`);
                            channel.unsubscribe();
                            printDiagnosticReport(results);
                            resolve(results);
                        }
                    }, 1000);
                    
                } else if (status === 'CHANNEL_ERROR') {
                    console.error('❌ Channel error:', err);
                    results.issues.push(`Channel error: ${err}`);
                    printDiagnosticReport(results);
                    resolve(results);
                } else if (status === 'TIMED_OUT') {
                    console.error('❌ Subscription timed out');
                    results.issues.push('Subscription timed out');
                    printDiagnosticReport(results);
                    resolve(results);
                }
            });
    });
}

function printDiagnosticReport(results) {
    console.log('\n' + '='.repeat(60));
    console.log('📋 DIAGNOSTIC REPORT');
    console.log('='.repeat(60));
    
    console.log('\n✅ Working:');
    if (results.connection) console.log('  ✓ Supabase connection');
    if (results.tableAccess) console.log('  ✓ Table read/write access');
    if (results.subscription) console.log('  ✓ Realtime subscription established');
    if (results.realtimeEnabled) console.log('  ✓ Realtime updates received');
    
    if (results.issues.length > 0) {
        console.log('\n❌ Issues Found:');
        results.issues.forEach(issue => console.log(`  ✗ ${issue}`));
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('🎯 DIAGNOSIS:');
    console.log('='.repeat(60));
    
    if (results.connection && results.tableAccess && !results.realtimeEnabled) {
        console.log('\n⚠️  REALTIME IS NOT ENABLED ON THE TABLE');
        console.log('\n📝 Solution:');
        console.log('1. Go to Supabase Dashboard');
        console.log('2. Navigate to Database → Replication');
        console.log('3. Find the "game_state" table');
        console.log('4. Enable the Realtime toggle');
        console.log('5. Save changes');
    } else if (!results.connection) {
        console.log('\n❌ SUPABASE CONNECTION FAILED');
        console.log('\n📝 Check:');
        console.log('1. Supabase URL is correct');
        console.log('2. API key is valid');
        console.log('3. Internet connection');
    } else if (results.realtimeEnabled) {
        console.log('\n✅ EVERYTHING IS WORKING!');
        console.log('\nIf you still have issues, check:');
        console.log('1. Browser console for errors');
        console.log('2. Network tab for failed requests');
        console.log('3. Supabase Dashboard logs');
    }
    
    console.log('\n' + '='.repeat(60));
}

// Auto-run if in browser console
if (typeof window !== 'undefined') {
    window.runRealtimeDiagnostics = runRealtimeDiagnostics;
    console.log('💡 Run diagnostics by calling: runRealtimeDiagnostics()');
}

