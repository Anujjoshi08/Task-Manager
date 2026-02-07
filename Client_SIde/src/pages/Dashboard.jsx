import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskModal from "../components/TaskModal";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState([]);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); //  important
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }

      const data = await getTasks(token);
      setTasks(data);
    } catch (error) {
      //  TOKEN EXPIRED OR INVALID
      console.error("Auth error:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      await fetchTasks();
    };
    loadTasks();
  }, []);

  // ➕ Open modal for CREATE
  const openAddModal = () => {
    setSelectedTask(null);
    setOpenTaskModal(true);
  };

  // ✏️ Open modal for EDIT
  const openEditModal = (task) => {
    setSelectedTask(task);
    setOpenTaskModal(true);
  };

  //  Save (Create or Edit)
  const handleSaveTask = async ({ title, description }) => {
  console.log("SAVING:", title, description);
  console.log(token);

  if (selectedTask) {
    // ✅ FIXED: use _id instead of id
    await updateTask(token, selectedTask._id, { title, description });
  } else {
    await createTask(token, { title, description });
  }

  setOpenTaskModal(false);
  fetchTasks();
 };


  const handleDeleteTask = async (id) => {
    if (window.confirm("Delete task?")) {
      try {
        const response = await deleteTask(token, id);
        console.log("Delete response:", response);
        
        // Remove task from local state immediately using _id
        setTasks(tasks.filter(task => task._id !== id));
        
        // Refresh to sync with server
        await new Promise(resolve => setTimeout(resolve, 500));
        await fetchTasks();
      } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting task");
        // Refresh tasks to restore state
        await fetchTasks();
      }
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex divide-x h-[calc(100vh-74px)]">
        <Sidebar />

        <div className="flex-5 py-4 px-2 md:p-6 bg-linear-to-br from-slate-50 to-slate-100 overflow-y-auto">
          <h1 className="text-2xl md:text-4xl font-semibold pb-4 text-slate-800">
            Tasks Management
          </h1>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-8 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            {/* ADD BUTTON */}
            {/* eslint-disable-next-line */}
            <button
              className="flex-1 bg-linear-to-r from-teal-800 to-teal-900 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
              onClick={openAddModal}
            >
              Add Task
            </button>
          </div>

          {/* TASK LIST */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {filteredTasks.map((task) => (
              <div key={task._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between">
                  <div className="text-sm text-slate-600">
                    <h3 className="font-bold text-lg">{task.title}</h3>
                    <p>{task.description}</p>
                  </div>

                  <div className="flex justify-between mt-2 gap-4">
                    <button
                      className="text-teal-600 hover:text-teal-800 font-semibold transition-colors"
                      onClick={() => openEditModal(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <TaskModal
          isOpen={openTaskModal}
          onClose={() => setOpenTaskModal(false)}
          onSave={handleSaveTask}
          task={selectedTask}
        />
      </div>
    </div>
  );
};

export default Dashboard;
