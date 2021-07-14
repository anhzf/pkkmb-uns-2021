/* eslint-env node */
/* eslint-disable no-console */

console.log(`commit message: ${process.env.VERCEL_GIT_COMMIT_MESSAGE}`);

// if the commit message contains '[✅]'
if (/\[✅\]/ig.test(process.env.VERCEL_GIT_COMMIT_MESSAGE)) {
  console.log('✅ - Build can proceed');
  process.exit(1);
} else {
  console.log('🛑 - Build cancelled');
  process.exit(0);
}
