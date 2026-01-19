export default function Loading() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent opacity-70"></div>
        <div className="h-2 w-2 rounded-full bg-primary shadow-lg shadow-primary"></div>
      </div>
    </div>
  );
}
