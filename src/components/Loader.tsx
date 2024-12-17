// components/Loader.tsx
export default function PageLoader() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-50">
        <div className="spinner border-t-4 border-purple-500 w-12 h-12 rounded-full animate-spin"></div>
      </div>
    );
}
