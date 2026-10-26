import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";

// Menangani state loading, error, dan data kosong secara seragam untuk semua daftar.
export default function AsyncBoundary({
  loading,
  error,
  onRetry,
  isEmpty,
  emptyTitle,
  emptyHint,
  children,
}) {
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={onRetry} />;
  if (isEmpty) return <EmptyState title={emptyTitle} hint={emptyHint} />;
  return children;
}
