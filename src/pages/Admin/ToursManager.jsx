import React, { useState } from 'react';
import useContentStore from '../../store/contentStore';
import { 
  Edit2, Save, X, Image as ImageIcon, Plus, Trash2, RotateCcw, 
  CheckCircle2, Upload, Link, Sparkles, MapPin, Tag, Clock, DollarSign
} from 'lucide-react';

export default function ToursManager() {
  const { tours, updateTour, addTour, deleteTour, resetToDefault } = useContentStore();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTourData, setNewTourData] = useState({
    title: '',
    tagline: '',
    shortDescription: '',
    category: 'City Sightseeing',
    duration: '1 Day Tour',
    startingPrice: '₹2,999',
    banner: '/assets/tours/bd08021da8c244de8eafa9a4f86c4e2a30099151_yk3fsq4Dd4.png',
    highlightsInput: 'Gateway of India, Marine Drive, Siddhivinayak'
  });

  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const startEdit = (tour) => {
    setEditingId(tour.id);
    setFormData({
      title: tour.title,
      tagline: tour.tagline,
      shortDescription: tour.shortDescription || '',
      category: tour.category || 'City Sightseeing',
      duration: tour.duration || '1 Day Tour',
      startingPrice: tour.startingPrice,
      banner: tour.banner,
      highlightsInput: tour.highlights ? tour.highlights.join(', ') : ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleSave = (id) => {
    const highlights = formData.highlightsInput
      ? formData.highlightsInput.split(',').map(h => h.trim()).filter(Boolean)
      : undefined;

    updateTour(id, {
      title: formData.title,
      tagline: formData.tagline,
      shortDescription: formData.shortDescription,
      category: formData.category,
      duration: formData.duration,
      startingPrice: formData.startingPrice,
      banner: formData.banner,
      ...(highlights ? { highlights } : {})
    });

    setEditingId(null);
    showToast('Tour package and banner image updated live!');
  };

  const handleFileChange = (e, isNew = false) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size is too large. Please select an image under 10MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isNew) {
          setNewTourData(prev => ({ ...prev, banner: reader.result }));
        } else {
          setFormData(prev => ({ ...prev, banner: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTourSubmit = (e) => {
    e.preventDefault();
    if (!newTourData.title) {
      alert('Please enter a tour title.');
      return;
    }

    const highlights = newTourData.highlightsInput
      ? newTourData.highlightsInput.split(',').map(h => h.trim()).filter(Boolean)
      : ['Doorstep Pickup & Drop', 'Driver-cum-Guide Included'];

    addTour({
      ...newTourData,
      highlights
    });

    setShowAddModal(false);
    setNewTourData({
      title: '',
      tagline: '',
      shortDescription: '',
      category: 'City Sightseeing',
      duration: '1 Day Tour',
      startingPrice: '₹2,999',
      banner: '/assets/tours/bd08021da8c244de8eafa9a4f86c4e2a30099151_yk3fsq4Dd4.png',
      highlightsInput: 'Gateway of India, Marine Drive, Siddhivinayak'
    });

    showToast('New tour package created successfully!');
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteTour(id);
      showToast(`Tour "${title}" deleted.`);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all tour packages and images to default site data?')) {
      resetToDefault();
      showToast('All tour packages reset to default.');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 text-sm font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black font-display text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-indigo-600" />
            <span>Manage Tour Packages & Images</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Upload custom banner images, update package pricing, titles, itineraries, and add new tours live.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Tour</span>
          </button>

          <button
            onClick={handleReset}
            title="Reset all tours to default"
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 border border-slate-200 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* ADD NEW TOUR MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                <span>Create New Tour Package</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTourSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tour Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahabaleshwar Strawberry Tour"
                  value={newTourData.title}
                  onChange={(e) => setNewTourData({ ...newTourData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tagline / Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. Queen of Hill Stations & Strawberry Farms"
                  value={newTourData.tagline}
                  onChange={(e) => setNewTourData({ ...newTourData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newTourData.category}
                    onChange={(e) => setNewTourData({ ...newTourData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  >
                    <option value="City Sightseeing">City Sightseeing</option>
                    <option value="Hill Station">Hill Station</option>
                    <option value="Spiritual & Pilgrimage">Spiritual & Pilgrimage</option>
                    <option value="Coastal & Beach">Coastal & Beach</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Starting Price</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹3,499"
                    value={newTourData.startingPrice}
                    onChange={(e) => setNewTourData({ ...newTourData, startingPrice: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Banner Image (File Upload or URL)</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, true)}
                    className="w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  <input
                    type="text"
                    placeholder="Or paste Direct Image URL (https://...)"
                    value={newTourData.banner}
                    onChange={(e) => setNewTourData({ ...newTourData, banner: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl font-mono text-slate-600"
                  />
                </div>

                {newTourData.banner && (
                  <div className="mt-2 h-24 rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100">
                    <img src={newTourData.banner} alt="Preview" className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-md font-bold">Image Preview</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Key Attractions (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="Spot 1, Spot 2, Spot 3..."
                  value={newTourData.highlightsInput}
                  onChange={(e) => setNewTourData({ ...newTourData, highlightsInput: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-md"
                >
                  Save & Publish Tour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOURS LIST & EDIT CARDS */}
      <div className="grid grid-cols-1 gap-6">
        {tours.map((tour) => {
          const isEditing = editingId === tour.id;

          return (
            <div
              key={tour.id}
              className={`bg-white rounded-2xl p-6 border shadow-sm transition-all ${
                isEditing ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                
                {/* Image Box & Changer */}
                <div className="w-full lg:w-64 shrink-0 space-y-2">
                  <div className="h-40 w-full rounded-xl overflow-hidden bg-slate-100 relative group border border-slate-200 shadow-inner">
                    <img
                      src={isEditing ? formData.banner : tour.banner}
                      alt={tour.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold">
                      Banner Preview
                    </div>
                  </div>

                  {/* Upload / Image Change Control */}
                  {isEditing ? (
                    <div className="space-y-2 pt-1">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload New Image File</span>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, false)}
                        className="w-full text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-100 file:text-indigo-800 hover:file:bg-indigo-200 cursor-pointer"
                      />
                      
                      <div className="pt-1">
                        <label className="block text-[11px] font-bold text-slate-500 mb-0.5 flex items-center gap-1">
                          <Link className="w-3 h-3" />
                          <span>Or Direct Image URL</span>
                        </label>
                        <input
                          type="text"
                          value={formData.banner}
                          onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg font-mono text-slate-600"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400 truncate">
                      Source: {tour.banner?.substring(0, 35)}...
                    </div>
                  )}
                </div>

                {/* Tour Data Form / View */}
                <div className="flex-1 space-y-4 w-full">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Tour Title</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-3.5 py-2 text-base font-bold border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
                        <input
                          type="text"
                          value={formData.tagline}
                          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs text-slate-600 border border-slate-300 rounded-xl focus:border-indigo-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Short Description</label>
                        <textarea
                          rows={2}
                          value={formData.shortDescription}
                          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs text-slate-600 border border-slate-300 rounded-xl focus:border-indigo-500 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-white"
                          >
                            <option value="City Sightseeing">City Sightseeing</option>
                            <option value="Hill Station">Hill Station</option>
                            <option value="Spiritual & Pilgrimage">Spiritual & Pilgrimage</option>
                            <option value="Coastal & Beach">Coastal & Beach</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Duration</label>
                          <input
                            type="text"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Starting Price</label>
                          <input
                            type="text"
                            value={formData.startingPrice}
                            onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs font-bold text-indigo-700 border border-slate-300 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Key Sightseeing Highlights (Comma Separated)</label>
                        <input
                          type="text"
                          value={formData.highlightsInput}
                          onChange={(e) => setFormData({ ...formData, highlightsInput: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                          {tour.category}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                          {tour.duration}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-display text-slate-900">
                        {tour.title}
                      </h3>

                      <p className="text-xs text-indigo-600 font-semibold">
                        ✨ {tour.tagline}
                      </p>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {tour.shortDescription}
                      </p>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                        <div className="text-base font-black text-slate-900">
                          Starting Price: <span className="text-indigo-600">{tour.startingPrice}</span>
                        </div>

                        <div className="text-xs text-slate-400">
                          ID: <span className="font-mono text-slate-600">{tour.id}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions Box */}
                <div className="flex sm:flex-col items-center justify-end gap-2 w-full lg:w-32 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSave(tour.id)}
                        className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                      >
                        <Save className="w-4 h-4" /> Save
                      </button>
                      
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => startEdit(tour)}
                        className="w-full py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-indigo-200 transition cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" /> Edit & Image
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(tour.id, tour.title)}
                        title="Delete Tour"
                        className="p-2.5 text-rose-600 hover:bg-rose-50 rounded-xl transition border border-rose-100 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
