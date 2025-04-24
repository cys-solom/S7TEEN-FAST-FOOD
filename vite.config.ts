import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // هذه الإعدادات مهمة لتجنب مشاكل الـ Refresh
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    }
  },
  preview: {
    port: 4173,
    host: true,
    // هذا الإعداد الأساسي لحل مشكلة الـ Refresh
    historyApiFallback: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // هذه الإعدادات تحسن تجربة التحميل
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  plugins: [
    react({
      // إعدادات إضافية لتحسين الأداء
      jsxImportSource: '@emotion/react',
      devTools: mode !== 'production'
    }),
    mode === 'development' && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // إضافة aliases إضافية لتحسين الاستيراد
      "components": path.resolve(__dirname, "./src/components"),
      "pages": path.resolve(__dirname, "./src/pages")
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  // هذا الإعداد مهم جداً للتوجيه الصحيح
  base: './',
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ],
    exclude: ['js-big-decimal']
  }
}));
