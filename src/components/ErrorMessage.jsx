export default function ErrorMessage({ message, onRetry }) {
  return (
    <div role="alert" className="mx-auto max-w-xl rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-900">
      <p className="font-bold">Data gagal dimuat</p>
      <p className="mt-1 text-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-xl bg-rose-700 px-5 py-2.5 text-xs font-bold uppercase text-white transition hover:bg-rose-800"
        >
          Coba lagi
        </button>
      )}
    </div>
  );
}
