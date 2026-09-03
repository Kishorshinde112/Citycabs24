import React, { useState } from 'react';
import useContentStore from '../../store/contentStore';
import { Edit2, Save, X, Image as ImageIcon } from 'lucide-react';

export default function ToursManager() {
  const { tours, updateTour } = useContentStore();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const startEdit = (tour) => {
    setEditingId(tour.id);
    setFormData({
      title: tour.title,
      startingPrice: tour.startingPrice,
      banner: tour.banner,
      tagline: tour.tagline
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleSave = (id) => {
    updateTour(id, formData);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Manage Tours & Prices</h1>
        <p className="text-slate-500 mt-1">Update pricing, titles, and images for your tour packages.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6">
            {/* Image Preview */}
            <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 relative group">
              <img src={tour.banner} alt={tour.title} className="w-full h-full object-cover" />
            </div>

            {/* Content Area */}
            <div className="flex-1 space-y-4">
              {editingId === tour.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg font-bold text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Tour Title"
                  />
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg text-sm text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Tagline"
                  />
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Starting Price</label>
                      <input
                        type="text"
                        value={formData.startingPrice}
                        onChange={(e) => setFormData({...formData, startingPrice: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="e.g. ₹2,999"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={formData.banner}
                        onChange={(e) => setFormData({...formData, banner: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="/assets/image.jpg or https://..."
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{tour.title}</h3>
                    <p className="text-slate-500 text-sm mt-1">{tour.tagline}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-lg text-sm">
                      {tour.startingPrice}
                    </span>
                    <span className="text-xs text-slate-400 border border-slate-200 px-2 rounded-md truncate max-w-[200px]">
                      {tour.banner}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex md:flex-col items-center justify-end gap-2 md:w-32 shrink-0">
              {editingId === tour.id ? (
                <>
                  <button
                    onClick={() => handleSave(tour.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => startEdit(tour)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-lg transition"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
