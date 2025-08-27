
const Winners = () => {
  return (
    <section className="py-16 bg-slate-900" id="winners">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-yellow-400 mb-8 drop-shadow">Winners</h2>
        <div className="flex flex-col items-center">
          <div className="bg-slate-800 rounded-xl p-8 shadow-2xl flex flex-col items-center">
            <div className="w-48 h-48 mb-6 flex items-center justify-center overflow-hidden rounded-full border-4 border-yellow-400">
              <img
                src="/Pictures/Farmvis.png"
                alt="2024 Global NomineesFarmvis Team - 1st Place"
                className="w-full h-full object-cover rounded-full"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-2">Farmvis</h3>
            <p className="text-lg text-white font-semibold">1st Place Winner</p>
            <p className="text-md text-yellow-200 mt-2">This is a test line to check live updates.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Winners;
