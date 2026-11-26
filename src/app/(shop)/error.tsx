'use client';
export default function Err({ reset }: { error: Error; reset: () => void }) { return <div className="wrap grid min-h-[60vh] place-content-center gap-4 py-20 text-center"><h1 className="h1">Something went wrong</h1><p className="text-grey">Your cart is safe. Please try again.</p><div><button className="btn btn-p" onClick={reset}>Try again</button></div></div>; }
