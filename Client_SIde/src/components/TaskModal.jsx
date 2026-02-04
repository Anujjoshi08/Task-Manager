import { useEffect, useState } from "react";

export default function TaskModal({ isOpen, onClose, onSave, task }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🔥 Auto-fill when editing
  useEffect(() => {
    const updateState = () => {
      if (task) {
        setTitle(task.title);
        setDescription(task.description || "");
      } else {
        setTitle("");
        setDescription("");
      }
    };

    updateState();
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            {task ? "Edit Task" : "Add Task"}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 text-2xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <div className="flex justify-end gap-2">
            <button 
              type="button" 
              onClick={onClose}
              className="text-slate-600 hover:text-slate-800 font-semibold px-4 py-2 transition-colors"
            >
              Cancel
            </button>
            {/* eslint-disable-next-line */}
            <button
              type="submit"
              className="bg-linear-to-r from-teal-800 to-teal-900 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              {task ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
