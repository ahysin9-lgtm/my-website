/* eslint-disable */
import { execSync } from 'child_process';

console.log('🚀 Starting Pre-deployment Validation...');

try {
    console.log('\n📝 Running Linting...');
    execSync('npm run lint', { stdio: 'inherit' });

    // Type check (tsc) - assuming standard tsc command availability or via build
    // console.log('\n📘 Checking Types...');
    // execSync('npx tsc --noEmit', { stdio: 'inherit' });

    console.log('\n🏗️  Verifying Build...');
    execSync('npm run build', { stdio: 'inherit' });

    console.log('\n✅ Validation Successful! Ready for Deployment.');
    process.exit(0);
} catch (error) {
    console.error('\n❌ Validation Failed.');
    process.exit(1);
}
