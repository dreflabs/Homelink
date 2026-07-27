import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-4">
      <h2 className="text-3xl font-bold mb-4">Not Found</h2>
      <p className="mb-6 text-muted-foreground">Could not find requested resource</p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
