import React from 'react';

export default function Contact({ handleContactSubmit, contactSubmitted }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">
          Layanan Pelanggan
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase mt-3 mb-2">Hubungi Tim Kami</h1>
        <p className="text-slate-600 text-xs sm:text-sm">Ada pertanyaan seputar penyewaan venue atau ketersediaan alat musik? Kami siap membantu.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-6 text-indigo-400">Informasi Kantor</h3>
            <div className="space-y-4 text-slate-300 text-xs sm:text-sm">
              <div>
                <h4 className="text-[10px] uppercase font-bold text-slate-500 mb-0.5">Alamat Utama</h4>
                <p className="font-medium leading-relaxed">
                  Jl. Anjasmoro Raya No.21 Blok E1<br />
                  Tawangsari, Semarang Barat, Kota Semarang 50144
                </p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase font-bold text-slate-500 mb-0.5">Email Resmi</h4>
                <p className="font-medium text-indigo-300">support@sinergimandiricipta.co.id</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase font-bold text-slate-500 mb-0.5">WhatsApp Hotline</h4>
                <p className="font-medium text-indigo-300">+62 811-2345-6789</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800">
            <h4 className="text-[10px] uppercase font-bold text-slate-500 mb-0.5">Jam Operasional</h4>
            <p className="text-xs text-slate-400">Senin - Sabtu: 08.00 - 21.00 WIB</p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-slate-900">Kirim Pesan Langsung</h3>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Nama Lengkap</label>
              <input type="text" required placeholder="Nama Anda..." className="bg-slate-50 text-slate-800 w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-xs font-medium" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Email</label>
              <input type="email" required placeholder="alamat@email.com" className="bg-slate-50 text-slate-800 w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-xs font-medium" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Pesan Anda</label>
              <textarea required rows={4} placeholder="Tuliskan pertanyaan Anda..." className="bg-slate-50 text-slate-800 w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-xs font-medium"></textarea>
            </div>
            <button type="submit" disabled={contactSubmitted} className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold uppercase text-xs hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20">
              {contactSubmitted ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}