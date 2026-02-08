require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
    console.log('Checking Indicators...');
    const { data: indicators, error: indError } = await supabase
        .from('climate_data')
        .select('indicator_code, indicator_name')


    if (indError) {
        console.error('Error fetching indicators:', indError);
    } else {
        const unique = [...new Set(indicators.map(i => `${i.indicator_code} | ${i.indicator_name}`))];
        console.log('--- AVAILABLE INDICATORS ---');
        unique.forEach(i => console.log(i));
        console.log('----------------------------');
    }

    console.log('\nChecking Methane Data (EN.ATM.METH.KT.CE)...');
    const { data: methane, error: metError } = await supabase
        .from('climate_data')
        .select('*')
        .eq('indicator_code', 'EN.ATM.METH.KT.CE')
        .limit(5);

    if (metError) {
        console.error('Error fetching methane:', metError);
    } else {
        console.log(`Found ${methane.length} methane records.`);
        if (methane.length > 0) console.log('Sample:', methane[0]);
    }
}

checkData();
