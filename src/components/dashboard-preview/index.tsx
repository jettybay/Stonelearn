export function DashboardPreview() {
  return (
    <div className="rounded-3xl border bg-white p-4 shadow-2xl">
      <video
        src="/video/demo.mp4"
        className="rounded-2xl"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}

