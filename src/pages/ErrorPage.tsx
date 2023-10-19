export default function ErrorPage() {
    return (
      <div className="w-screen absolute inset-0 h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl px-5 py-3 font-bold">Something Went Wrong</h2>
        <a href="/movies" className="text-xl bg-slate-700 px-5 py-3 rounded-md uppercase font-bold">Back to Browse</a>
      </div>
    )
  }
  