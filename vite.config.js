import { defineConfig, loadEnv } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [sveltekit()],
    define: {
      'process.env.PUBLIC_SUPABASE_URL': JSON.stringify(env.PUBLIC_SUPABASE_URL),
      'process.env.PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(env.PUBLIC_SUPABASE_ANON_KEY),
    },
    build: {
      sourcemap: true
    },
    optimizeDeps: {
      exclude: ['@sveltejs/kit']
    },
    server: {
      fs: {
        strict: false
      },
      host: true
    }
  };
});
