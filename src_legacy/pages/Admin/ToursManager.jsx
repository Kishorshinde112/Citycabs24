import React, { useState } from 'react';
import useContentStore from '../../store/contentStore';
import { compressImageFile } from '../../utils/imageCompressor';
import { 
  Edit2, Save, X, Image as ImageIcon, Plus, Trash2, RotateCcw, 
  CheckCircle2, Upload, Link as LinkIcon, Sparkles, MapPin, Tag, 
  Clock, DollarSign, Car, Compass, Layers, ExternalLink, RefreshCw
} from 'lucide-react';

export default function ToursManager() {
  const { 
    tours, updateTour, addTour, deleteTour, resetTours,
    fleet, updateFleetCar, resetFleet,
    gallery, updateGalleryItem, addGalleryItem, deleteGalleryItem, resetGallery,
    siteImages, updateSiteImage, resetSiteImages, resetAllToDefault
  } = useContentStore();

  const [activeTab, setActiveTab] = useState('tours'); // 'tours' | 'fleet' | 'gallery' | 'hero'
  const [toastMessage, setToastMessage] = useState('');
  const [uploadingId, setUploadingId] = useState(null);

  // Tours edit state
  const [editingTourId, setEditingTourId] = useState(null);
  const [tourFormData, setTourFormData] = useState({});
  const [showAddTourModal, setShowAddTourModal] = useState(false);
  const [newTourData, setNewTourData] = useState({
    title: '',
    tagline: '',
    shortDescription: '',
    category: 'City Sightseeing',
    duration: '1 Day Tour',
    startingPrice: '₹2,999',
    banner: '/assets/tours/bd08021da8c244de8eafa9a4f86c4e2a30099151_yk3fsq4Dd4.png',
    highlightsInput: 'Doorstep Pickup & Drop, AC Cab & Driver Guide'
  });

  // Fleet edit state
  const [editingFleetId, setEditingFleetId] = useState(null);
  const [fleetFormData, setFleetFormData] = useState({});

  // Gallery edit state
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [galleryFormData, setGalleryFormData] = useState({});
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [newGalleryData, setNewGalleryData] = useState({
    title: '',
    category: 'Sightseeing',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80'
  });

  // Hero edit state
  const [heroForm, setHeroForm] = useState({
    homeHero: siteImages?.homeHero || 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80',
    mumbaiHero: siteImages?.mumbaiHero || 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80',
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Generic Image Upload Handler with client-side compression
  const handleFileUpload = async (e, onSuccess, itemId = null) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (itemId) setUploadingId(itemId);
      const compressedDataUrl = await compressImageFile(file, 1600, 0.85);
      onSuccess(compressedDataUrl);
      showToast('Image uploaded and optimized successfully! Click Save to apply.');
    } catch (err) {
      alert('Failed to process image: ' + err.message);
    } finally {
      if (itemId) setUploadingId(null);
    }
  };

  // --- TOUR ACTIONS ---
  const startEditTour = (tour) => {
    setEditingTourId(tour.id);
    setTourFormData({
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

  const handleSaveTour = (id) => {
    const highlights = tourFormData.highlightsInput
      ? tourFormData.highlightsInput.split(',').map(h => h.trim()).filter(Boolean)
      : undefined;

    updateTour(id, {
      title: tourFormData.title,
      tagline: tourFormData.tagline,
      shortDescription: tourFormData.shortDescription,
      category: tourFormData.category,
      duration: tourFormData.duration,
      startingPrice: tourFormData.startingPrice,
      banner: tourFormData.banner,
      ...(highlights ? { highlights } : {})
    });

    setEditingTourId(null);
    showToast('Tour package and banner updated live!');
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

    addTour({ ...newTourData, highlights });
    setShowAddTourModal(false);
    showToast('New tour package created successfully!');
  };

  // --- FLEET ACTIONS ---
  const startEditFleet = (car) => {
    setEditingFleetId(car.id);
    setFleetFormData({
      image: car.image || '',
      tag: car.tag || '',
      ratePerKm: car.ratePerKm || '',
      localFullDay: car.localFullDay || '',
    });
  };

  const handleSaveFleet = (carId) => {
    updateFleetCar(carId, fleetFormData);
    setEditingFleetId(null);
    showToast('Cab fleet image & details updated live on website!');
  };

  // --- GALLERY ACTIONS ---
  const startEditGallery = (item) => {
    setEditingGalleryId(item.id);
    setGalleryFormData({
      title: item.title || '',
      category: item.category || '',
      image: item.image || ''
    });
  };

  const handleSaveGallery = (id) => {
    updateGalleryItem(id, galleryFormData);
    setEditingGalleryId(null);
    showToast('Gallery image & caption updated live!');
  };

  const handleAddGallerySubmit = (e) => {
    e.preventDefault();
    if (!newGalleryData.title || !newGalleryData.image) {
      alert('Please provide a title and image.');
      return;
    }
    addGalleryItem(newGalleryData);
    setShowAddGalleryModal(false);
    setNewGalleryData({
      title: '',
      category: 'Sightseeing',
      image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80'
    });
    showToast('New tour memory photo added to gallery!');
  };

  // --- HERO ACTIONS ---
  const handleSaveHero = (key) => {
    updateSiteImage(key, heroForm[key]);
    showToast(`Site banner for ${key === 'homeHero' ? 'Homepage' : 'Mumbai Darshan'} updated live!`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-indigo-500/50 flex items-center gap-2.5 text-sm font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 tracking-tight">
                Manage Site & Tour Images
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Change and update all images across tour packages, cab fleet, tour gallery & site hero banners.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </a>

          <button
            onClick={() => {
              if (window.confirm('Reset all site images (tours, cabs, gallery, hero) to original defaults?')) {
                resetAllToDefault();
                showToast('All site images reset to defaults.');
              }
            }}
            className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Defaults</span>
          </button>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl overflow-x-auto text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('tours')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'tours'
              ? 'bg-white text-indigo-600 shadow-sm font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Tour Packages ({tours.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('fleet')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'fleet'
              ? 'bg-white text-indigo-600 shadow-sm font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Our Cabs Fleet ({fleet?.length || 6})</span>
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'gallery'
              ? 'bg-white text-indigo-600 shadow-sm font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Tour Memories Gallery ({gallery?.length || 8})</span>
        </button>

        <button
          onClick={() => setActiveTab('hero')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'hero'
              ? 'bg-white text-indigo-600 shadow-sm font-black'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Hero & Site Banners (2)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TOUR PACKAGES & BANNERS */}
      {/* ========================================================================= */}
      {activeTab === 'tours' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
            <div>
              <div className="font-bold text-indigo-950 text-sm">Tour Packages & Hero Banners</div>
              <div className="text-xs text-indigo-700">Change banner photos, starting prices, and package details for all 10+ tours.</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (window.confirm('Reset all tour banners to defaults?')) {
                    resetTours();
                    showToast('Tour banners reset to defaults.');
                  }
                }}
                className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Tours</span>
              </button>
              <button
                onClick={() => setShowAddTourModal(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Tour</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => {
              const isEditing = editingTourId === tour.id;
              const currentBanner = isEditing ? tourFormData.banner : tour.banner;

              return (
                <div
                  key={tour.id}
                  className={`bg-white rounded-3xl border overflow-hidden shadow-sm transition-all duration-200 flex flex-col justify-between ${
                    isEditing ? 'border-indigo-500 ring-4 ring-indigo-500/10 shadow-md' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Tour Image with Overlay Preview */}
                    <div className="relative h-48 bg-slate-950 overflow-hidden group">
                      <img
                        src={currentBanner}
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
                      
                      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-yellow-400 border border-slate-700">
                        {tour.category || 'Sightseeing'}
                      </div>

                      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-extrabold text-white border border-slate-700">
                        {isEditing ? tourFormData.startingPrice : tour.startingPrice}
                      </div>

                      {/* Quick Upload Action on Image */}
                      {isEditing && (
                        <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm flex flex-col items-center justify-center p-4 gap-2">
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload New Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (dataUrl) => {
                                setTourFormData(prev => ({ ...prev, banner: dataUrl }));
                              }, tour.id)}
                            />
                          </label>
                          <span className="text-[10px] text-slate-300">or paste URL below</span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-5 space-y-3">
                      {isEditing ? (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Image URL / Path:</label>
                            <input
                              type="text"
                              value={tourFormData.banner || ''}
                              onChange={(e) => setTourFormData({ ...tourFormData, banner: e.target.value })}
                              placeholder="https://... or /assets/..."
                              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-mono text-slate-900 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Tour Title:</label>
                            <input
                              type="text"
                              value={tourFormData.title || ''}
                              onChange={(e) => setTourFormData({ ...tourFormData, title: e.target.value })}
                              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-900 bg-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Starting Price:</label>
                              <input
                                type="text"
                                value={tourFormData.startingPrice || ''}
                                onChange={(e) => setTourFormData({ ...tourFormData, startingPrice: e.target.value })}
                                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-900 bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Category:</label>
                              <input
                                type="text"
                                value={tourFormData.category || ''}
                                onChange={(e) => setTourFormData({ ...tourFormData, category: e.target.value })}
                                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 bg-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Tagline:</label>
                            <input
                              type="text"
                              value={tourFormData.tagline || ''}
                              onChange={(e) => setTourFormData({ ...tourFormData, tagline: e.target.value })}
                              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 bg-white"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-display font-black text-slate-900 text-base leading-snug">
                            {tour.title}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-medium">
                            {tour.tagline || tour.shortDescription}
                          </p>
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 font-bold">
                            <Clock className="w-3.5 h-3.5 text-indigo-500" />
                            <span>{tour.duration || '1 Day Tour'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    {isEditing ? (
                      <div className="flex items-center gap-2 w-full">
                        <button
                          onClick={() => handleSaveTour(tour.id)}
                          className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Changes</span>
                        </button>
                        <button
                          onClick={() => setEditingTourId(null)}
                          className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <button
                          onClick={() => startEditTour(tour)}
                          className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1.5 transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Change Image / Details</span>
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete tour "${tour.title}"?`)) {
                              deleteTour(tour.id);
                              showToast(`Deleted ${tour.title}`);
                            }
                          }}
                          className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
                          title="Delete tour"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: OUR CABS FLEET */}
      {/* ========================================================================= */}
      {activeTab === 'fleet' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
            <div>
              <div className="font-bold text-amber-950 text-sm">"Our Cabs Gallery" Fleet Vehicles</div>
              <div className="text-xs text-amber-800">Change vehicle photos, tags, and rates displayed in the homepage Cab Gallery section.</div>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Reset all fleet vehicle photos to defaults?')) {
                  resetFleet();
                  showToast('Fleet vehicle photos reset to defaults.');
                }
              }}
              className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Fleet Photos</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleet?.map((car) => {
              const isEditing = editingFleetId === car.id;
              const currentImage = isEditing ? fleetFormData.image : car.image;

              return (
                <div
                  key={car.id}
                  className={`bg-white rounded-3xl border overflow-hidden shadow-sm flex flex-col justify-between ${
                    isEditing ? 'border-amber-500 ring-4 ring-amber-500/10 shadow-md' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Car Image Preview */}
                    <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden group">
                      {currentImage ? (
                        <img
                          src={currentImage}
                          alt={car.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-slate-900">
                          <Car className="w-12 h-12 text-yellow-400 mb-2" />
                          <span className="text-xs font-bold text-slate-300">No Image Set</span>
                        </div>
                      )}

                      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-black text-yellow-400 border border-slate-700">
                        {isEditing ? fleetFormData.tag : car.tag}
                      </div>

                      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white border border-slate-700">
                        {isEditing ? fleetFormData.ratePerKm : car.ratePerKm}
                      </div>

                      {/* Image Upload Overlay when editing */}
                      {isEditing && (
                        <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm flex flex-col items-center justify-center p-4 gap-2">
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Car Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (dataUrl) => {
                                setFleetFormData(prev => ({ ...prev, image: dataUrl }));
                              }, car.id)}
                            />
                          </label>
                          <span className="text-[10px] text-slate-300">or enter image URL below</span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-black text-slate-900 text-base">
                          {car.name}
                        </h3>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-bold">
                          {car.category}
                        </span>
                      </div>

                      {isEditing ? (
                        <div className="space-y-3 pt-2">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Image URL / Path:</label>
                            <input
                              type="text"
                              value={fleetFormData.image || ''}
                              onChange={(e) => setFleetFormData({ ...fleetFormData, image: e.target.value })}
                              placeholder="https://... or /assets/..."
                              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-mono text-slate-900 bg-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Badge Tag:</label>
                              <input
                                type="text"
                                value={fleetFormData.tag || ''}
                                onChange={(e) => setFleetFormData({ ...fleetFormData, tag: e.target.value })}
                                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-bold text-slate-900 bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Rate per Km:</label>
                              <input
                                type="text"
                                value={fleetFormData.ratePerKm || ''}
                                onChange={(e) => setFleetFormData({ ...fleetFormData, ratePerKm: e.target.value })}
                                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-bold text-slate-900 bg-white"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 space-y-1">
                          <div><span className="font-bold text-slate-700">Seats:</span> {car.seats}</div>
                          <div><span className="font-bold text-slate-700">Luggage:</span> {car.luggage}</div>
                          <div><span className="font-bold text-slate-700">AC:</span> {car.acType}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    {isEditing ? (
                      <div className="flex items-center gap-2 w-full">
                        <button
                          onClick={() => handleSaveFleet(car.id)}
                          className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Car Image</span>
                        </button>
                        <button
                          onClick={() => setEditingFleetId(null)}
                          className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditFleet(car)}
                        className="w-full py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Change Car Photo / Rates</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: TOUR MEMORIES / GALLERY */}
      {/* ========================================================================= */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
            <div>
              <div className="font-bold text-emerald-950 text-sm">"Memories from Our Tours" Gallery Photos</div>
              <div className="text-xs text-emerald-800">Change sightseeing photos, titles, and categories displayed in the homepage tour gallery grid.</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (window.confirm('Reset gallery photos to default images?')) {
                    resetGallery();
                    showToast('Gallery reset to defaults.');
                  }
                }}
                className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Gallery</span>
              </button>
              <button
                onClick={() => setShowAddGalleryModal(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Photo</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery?.map((item) => {
              const isEditing = editingGalleryId === item.id;
              const currentImg = isEditing ? galleryFormData.image : item.image;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border overflow-hidden shadow-sm flex flex-col justify-between ${
                    isEditing ? 'border-emerald-500 ring-4 ring-emerald-500/10' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="relative h-48 bg-slate-950 overflow-hidden group">
                    <img
                      src={currentImg}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                    
                    <div className="absolute top-2 left-2 bg-slate-900/80 px-2 py-0.5 rounded text-[10px] font-bold text-yellow-400">
                      {isEditing ? galleryFormData.category : item.category}
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 text-white font-bold text-xs truncate">
                      {isEditing ? galleryFormData.title : item.title}
                    </div>

                    {/* Upload button over image */}
                    {isEditing && (
                      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-2 gap-1.5">
                        <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow">
                          <Upload className="w-3 h-3" />
                          <span>Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (dataUrl) => {
                              setGalleryFormData(prev => ({ ...prev, image: dataUrl }));
                            }, item.id)}
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-slate-50 space-y-2">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={galleryFormData.title || ''}
                          onChange={(e) => setGalleryFormData({ ...galleryFormData, title: e.target.value })}
                          placeholder="Photo Caption"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 font-bold bg-white"
                        />
                        <input
                          type="text"
                          value={galleryFormData.category || ''}
                          onChange={(e) => setGalleryFormData({ ...galleryFormData, category: e.target.value })}
                          placeholder="Category (e.g. Mumbai, Hill Stations)"
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 bg-white"
                        />
                        <input
                          type="text"
                          value={galleryFormData.image || ''}
                          onChange={(e) => setGalleryFormData({ ...galleryFormData, image: e.target.value })}
                          placeholder="Image URL"
                          className="w-full px-2.5 py-1.5 text-[11px] font-mono border border-slate-300 rounded-lg text-slate-900 bg-white"
                        />
                        <div className="flex gap-1.5 pt-1">
                          <button
                            onClick={() => handleSaveGallery(item.id)}
                            className="flex-1 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingGalleryId(null)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-bold text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => startEditGallery(item)}
                          className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this photo from gallery?')) {
                              deleteGalleryItem(item.id);
                              showToast('Photo removed from gallery');
                            }
                          }}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: HERO & SITE BANNERS */}
      {/* ========================================================================= */}
      {activeTab === 'hero' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-purple-50/60 p-4 rounded-2xl border border-purple-100">
            <div>
              <div className="font-bold text-purple-950 text-sm">Hero & Background Banners</div>
              <div className="text-xs text-purple-800">Change high-impact background images for the Homepage Hero and Mumbai Darshan header.</div>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Reset hero background banners to defaults?')) {
                  resetSiteImages();
                  setHeroForm({
                    homeHero: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80',
                    mumbaiHero: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80',
                  });
                  showToast('Hero banners reset to defaults.');
                }
              }}
              className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Hero Banners</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Homepage Hero Banner */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Homepage Hero Background</h3>
                  <p className="text-xs text-slate-500">Main header background image when users visit the homepage.</p>
                </div>
                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 font-bold text-xs rounded-full">
                  Live on Homepage
                </span>
              </div>

              {/* Preview Box */}
              <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group">
                <img
                  src={heroForm.homeHero}
                  alt="Homepage Hero Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-4">
                  <div className="text-white space-y-1">
                    <span className="text-yellow-400 italic text-xs font-serif">Discover the City of Dreams</span>
                    <h4 className="text-xl font-black">Mumbai Sightseeing Tours</h4>
                  </div>
                </div>

                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-black flex items-center gap-1.5 shadow-xl hover:bg-slate-100">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (dataUrl) => {
                        setHeroForm(prev => ({ ...prev, homeHero: dataUrl }));
                      }, 'homeHero')}
                    />
                  </label>
                </div>
              </div>

              {/* URL Input & Save */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Image URL / Path:</label>
                  <input
                    type="text"
                    value={heroForm.homeHero}
                    onChange={(e) => setHeroForm({ ...heroForm, homeHero: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono text-slate-900 bg-white"
                  />
                </div>

                <button
                  onClick={() => handleSaveHero('homeHero')}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Apply to Homepage Hero</span>
                </button>
              </div>
            </div>

            {/* 2. Mumbai Darshan Hero Banner */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Mumbai Darshan Hero Banner</h3>
                  <p className="text-xs text-slate-500">Header background for /mumbai-darshan & tour page.</p>
                </div>
                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 font-bold text-xs rounded-full">
                  Live on Tour Page
                </span>
              </div>

              {/* Preview Box */}
              <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group">
                <img
                  src={heroForm.mumbaiHero}
                  alt="Mumbai Darshan Hero Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-4">
                  <div className="text-white space-y-1">
                    <h4 className="text-xl font-black">Mumbai <span className="text-yellow-400">Darshan</span></h4>
                    <span className="text-xs text-slate-200">Discover Mumbai's iconic landmarks</span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-black flex items-center gap-1.5 shadow-xl hover:bg-slate-100">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (dataUrl) => {
                        setHeroForm(prev => ({ ...prev, mumbaiHero: dataUrl }));
                      }, 'mumbaiHero')}
                    />
                  </label>
                </div>
              </div>

              {/* URL Input & Save */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Image URL / Path:</label>
                  <input
                    type="text"
                    value={heroForm.mumbaiHero}
                    onChange={(e) => setHeroForm({ ...heroForm, mumbaiHero: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono text-slate-900 bg-white"
                  />
                </div>

                <button
                  onClick={() => handleSaveHero('mumbaiHero')}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Apply to Mumbai Darshan Banner</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Tour Modal */}
      {showAddTourModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-600" />
                <span>Add New Tour Package</span>
              </h3>
              <button
                onClick={() => setShowAddTourModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTourSubmit} className="p-5 space-y-3 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tour Title *</label>
                <input
                  type="text"
                  required
                  value={newTourData.title}
                  onChange={(e) => setNewTourData({ ...newTourData, title: e.target.value })}
                  placeholder="e.g. Goa Road Trip"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl text-slate-900 bg-white font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Starting Price</label>
                  <input
                    type="text"
                    value={newTourData.startingPrice}
                    onChange={(e) => setNewTourData({ ...newTourData, startingPrice: e.target.value })}
                    placeholder="₹4,999"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl text-slate-900 bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={newTourData.category}
                    onChange={(e) => setNewTourData({ ...newTourData, category: e.target.value })}
                    placeholder="Hill Station, Coastal, Pilgrimage"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl text-slate-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={newTourData.tagline}
                  onChange={(e) => setNewTourData({ ...newTourData, tagline: e.target.value })}
                  placeholder="Short engaging description"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Banner Image URL / Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTourData.banner}
                    onChange={(e) => setNewTourData({ ...newTourData, banner: e.target.value })}
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl text-slate-900 bg-white font-mono"
                  />
                  <label className="cursor-pointer px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (dataUrl) => {
                        setNewTourData(prev => ({ ...prev, banner: dataUrl }));
                      })}
                    />
                  </label>
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow"
                >
                  Create Tour Package
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddTourModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Gallery Photo Modal */}
      {showAddGalleryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>Add New Photo to Gallery</span>
              </h3>
              <button
                onClick={() => setShowAddGalleryModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGallerySubmit} className="p-5 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Caption / Title *</label>
                <input
                  type="text"
                  required
                  value={newGalleryData.title}
                  onChange={(e) => setNewGalleryData({ ...newGalleryData, title: e.target.value })}
                  placeholder="e.g. Sunset at Marine Drive"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl text-slate-900 bg-white font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <input
                  type="text"
                  value={newGalleryData.category}
                  onChange={(e) => setNewGalleryData({ ...newGalleryData, category: e.target.value })}
                  placeholder="Mumbai, Hill Stations, Beaches, Spiritual"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL or Upload *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={newGalleryData.image}
                    onChange={(e) => setNewGalleryData({ ...newGalleryData, image: e.target.value })}
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl text-slate-900 bg-white font-mono"
                  />
                  <label className="cursor-pointer px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (dataUrl) => {
                        setNewGalleryData(prev => ({ ...prev, image: dataUrl }));
                      })}
                    />
                  </label>
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow"
                >
                  Add to Gallery
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddGalleryModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
