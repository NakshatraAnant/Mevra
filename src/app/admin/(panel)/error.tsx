'use client';
export default function Err({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) { return <div className="py-16 text-center"><h1 className="h2">This view could not load</h1><p className="mt-2 text-grey">No data was changed. Reference: {error.digest || 'none'}</p><button className="btn btn-p mt-5" onClick={reset}>Try again</button></div>; }
