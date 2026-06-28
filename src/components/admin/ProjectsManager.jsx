import { useState, useEffect } from 'react';
import MediaLibrary from './MediaLibrary';

const ProjectsManager = ({ token }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form State
  const [showModal, setShowModal] = useState(false);
  const [showMediaSelector, setShowMediaSelector] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [sourceCodeLink, setSourceCodeLink] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [sortOrder, setSortOrder] = useState('0');
  
  // Dynamic features list
  const [featuresText, setFeaturesText] = useState(''); // Line separated
  
  // Dynamic tags list
  const [tags, setTags] = useState([]); // [{ name, color }]
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('blue-text-gradient');

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        setError('Failed to fetch projects');
      }
    } catch (err) {
      setError('Error loading projects');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditId(null);
    setName('');
    setDescription('');
    setImage('');
    setSourceCodeLink('');
    setLiveLink('');
    setSortOrder('0');
    setFeaturesText('');
    setTags([]);
    setNewTagName('');
    setError('');
    setShowModal(true);
  };

  const handleOpenEdit = (project) => {
    setEditId(project.id);
    setName(project.name);
    setDescription(project.description);
    setImage(project.image || '');
    setSourceCodeLink(project.sourceCodeLink || '');
    setLiveLink(project.liveLink || '');
    setSortOrder(project.sortOrder.toString());
    setFeaturesText(project.features ? project.features.join('\n') : '');
    
    // Parse tags
    let parsedTags = [];
    try {
      parsedTags = typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags;
    } catch (e) {
      parsedTags = project.tags || [];
    }
    setTags(parsedTags);
    
    setNewTagName('');
    setError('');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProjects();
      } else {
        alert('Failed to delete project');
      }
    } catch (err) {
      alert('Error deleting project');
    }
  };

  const handleAddTag = () => {
    if (!newTagName.trim()) return;
    setTags([...tags, { name: newTagName.trim(), color: newTagColor }]);
    setNewTagName('');
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    // Format features text back into array
    const featuresArray = featuresText
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const payload = {
      name,
      description,
      image,
      tags,
      features: featuresArray,
      sourceCodeLink,
      liveLink,
      sortOrder: parseInt(sortOrder) || 0
    };

    if (editId) {
      payload.id = editId;
    }

    try {
      const url = '/api/admin/projects';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setShowModal(false);
        fetchProjects();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save project');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">Project Showcase</h2>
          <p className="text-slate-400 text-sm">Add and update project cards and details featured on your site</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-accent hover:bg-accent-dark text-white py-2 px-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-1.5 active:scale-[0.97]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="text-slate-400 text-center py-20">Loading projects database...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full text-slate-500 text-center py-16 glass-card rounded-2xl">
              No projects in the database. Use the "Add Project" button or seed initial data.
            </div>
          ) : (
            projects.map((project) => {
              let parsedTags = [];
              try {
                parsedTags = typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags;
              } catch (e) {
                parsedTags = project.tags || [];
              }
              return (
                <div key={project.id} className="glass-card rounded-xl overflow-hidden border border-white/5 hover:border-accent/25 transition-all duration-300 flex flex-col group relative">
                  <div className="absolute top-3 right-3 z-20 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEdit(project)}
                      className="p-1.5 hover:text-accent transition-colors bg-black/50 rounded-lg border border-white/10 backdrop-blur-sm"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-1.5 hover:text-red-400 transition-colors bg-black/50 rounded-lg border border-white/10 backdrop-blur-sm"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-16v1a3 3 0 003 3h10M9 3h6" />
                      </svg>
                    </button>
                  </div>

                  <div className="w-full h-48 bg-white/5 overflow-hidden border-b border-white/5 relative">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://DAC.digital/wp-content/uploads/2023/11/react-logo-optimized.png'; }}
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-lg font-bold text-white leading-tight">{project.name}</h3>
                        <span className="text-slate-500 text-xs font-medium">Order: {project.sortOrder}</span>
                      </div>
                      <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">{project.description}</p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {parsedTags.map((tag, idx) => (
                          <span key={idx} className={`text-xs font-semibold py-0.5 px-2.5 rounded-full ${tag.color || 'blue-text-gradient'}`}>
                            #{tag.name}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 pt-3 border-t border-white/5 text-xs font-medium text-slate-400">
                        {project.liveLink && (
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">
                            Live Demo
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                        {project.sourceCodeLink && (
                          <a href={project.sourceCodeLink} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">
                            GitHub
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/80 backdrop-blur-md px-4 overflow-y-auto pt-10 pb-10">
          <div className="w-full max-w-2xl glass-card rounded-2xl p-6 relative border border-white/10 shadow-glass my-auto animate-float">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-bold text-white mb-6">
              {editId ? 'Modify Project details' : 'Register New Project'}
            </h3>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-white font-medium mb-1.5 text-xs">Project Name</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., PharmaSphere"
                    className="bg-white/5 border border-white/10 py-2.5 px-4 placeholder:text-slate-500 text-white rounded-lg outline-none focus:border-accent/40 transition-colors text-sm"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-white font-medium mb-1.5 text-xs">Thumbnail Image URL</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://example.com/project.jpg"
                      className="bg-white/5 border border-white/10 py-2.5 px-4 placeholder:text-slate-500 text-white rounded-lg outline-none focus:border-accent/40 transition-colors text-sm flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => setShowMediaSelector(true)}
                      className="py-2.5 px-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-lg text-xs font-semibold transition-all"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-white font-medium mb-1.5 text-xs">Project Overview Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed project summary..."
                  rows={3}
                  className="bg-white/5 border border-white/10 py-2.5 px-4 placeholder:text-slate-500 text-white rounded-lg outline-none focus:border-accent/40 transition-colors text-sm resize-none font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-white font-medium mb-1.5 text-xs">Live Site URL</span>
                  <input
                    type="url"
                    value={liveLink}
                    onChange={(e) => setLiveLink(e.target.value)}
                    placeholder="https://nextideasolution.com"
                    className="bg-white/5 border border-white/10 py-2.5 px-4 placeholder:text-slate-500 text-white rounded-lg outline-none focus:border-accent/40 transition-colors text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-white font-medium mb-1.5 text-xs">GitHub Repository URL</span>
                  <input
                    type="url"
                    value={sourceCodeLink}
                    onChange={(e) => setSourceCodeLink(e.target.value)}
                    placeholder="https://github.com/..."
                    className="bg-white/5 border border-white/10 py-2.5 px-4 placeholder:text-slate-500 text-white rounded-lg outline-none focus:border-accent/40 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Tag Builder */}
              <div className="flex flex-col gap-2.5 bg-white/[0.02] border border-white/5 rounded-xl p-4">
                <span className="text-white font-semibold text-xs">Project Tags</span>
                
                {/* Active Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {tags.length === 0 ? (
                    <span className="text-slate-500 text-xs italic">No tags added. Use the inputs below to insert.</span>
                  ) : (
                    tags.map((tag, idx) => (
                      <span key={idx} className={`text-xs font-semibold py-1 px-2.5 rounded-full flex items-center gap-1.5 ${tag.color}`}>
                        #{tag.name}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(idx)}
                          className="hover:text-red-400 font-bold"
                          title="Remove Tag"
                        >
                          &times;
                        </button>
                      </span>
                    ))
                  )}
                </div>

                {/* Tag Form Inputs */}
                <div className="flex gap-2 items-center mt-2">
                  <input
                    type="text"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    placeholder="Tag name (e.g. Next.js)"
                    className="bg-white/5 border border-white/10 py-2 px-3 placeholder:text-slate-500 text-white rounded-lg outline-none focus:border-accent/40 transition-colors text-sm flex-1"
                  />
                  <select
                    value={newTagColor}
                    onChange={(e) => setNewTagColor(e.target.value)}
                    className="bg-primary border border-white/10 py-2 px-3 text-white rounded-lg outline-none text-sm w-36"
                  >
                    <option value="blue-text-gradient">Blue</option>
                    <option value="green-text-gradient">Green</option>
                    <option value="pink-text-gradient">Pink</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="py-2 px-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-lg text-xs font-bold transition-all h-full"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-white font-medium mb-1.5 text-xs">Core Features (One feature per line)</span>
                <textarea
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Centralized state management using Redux&#10;Stripe secure payment gate integrations"
                  rows={3}
                  className="bg-white/5 border border-white/10 py-2.5 px-4 placeholder:text-slate-500 text-white rounded-lg outline-none focus:border-accent/40 transition-colors text-sm resize-none font-medium"
                  required
                />
              </div>

              <div className="flex flex-col">
                <span className="text-white font-medium mb-1.5 text-xs">Sort Order</span>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  placeholder="e.g., 0, 1, 2"
                  className="bg-white/5 border border-white/10 py-2.5 px-4 placeholder:text-slate-500 text-white rounded-lg outline-none focus:border-accent/40 transition-colors text-sm"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-4 border-t border-white/5 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-white/10 rounded-lg text-slate-400 hover:text-white transition-all text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg transition-all text-sm font-medium flex items-center justify-center disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Selector Modal */}
      {showMediaSelector && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/90 backdrop-blur-md px-4 overflow-y-auto pt-10 pb-10">
          <div className="w-full max-w-4xl glass-card rounded-2xl p-6 relative border border-white/10 shadow-glass my-auto max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowMediaSelector(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-bold text-white mb-6">Select Image from Library</h3>
            
            <MediaLibrary
              token={token}
              isSelectMode={true}
              onSelect={(url) => {
                setImage(url);
                setShowMediaSelector(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
