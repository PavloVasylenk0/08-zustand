'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-container">
      <h2>Could not fetch the list of notes</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()} className="retry-button">
        Try again
      </button>
    </div>
  );
}
