import { useEffect, useState } from "react";
import userStore from "../../store/user";
import { supabase } from "../../helper/supabaseClient";
const Projects = () => {
  const user = userStore((state) => state.user);
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "pending")
      .eq("user_id", user.id);
    console.log(data);
    setProjects(data);
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);
    console.log(data, error);
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);
  return (
    <div className="h-full bg-[#92EDED] text-black p-10">
      <div className="flex flex-col gap-24">
        <div className="flex justify-between">
          <h1 className="font-bold text-7xl">Projects en cours </h1>
          <div className="font-bold text-7xl"> {projects.length} </div>
        </div>
        <div className="flex gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg w-96 h-96 flex flex-col justify-center items-center gap-3 "
            >
              <div className="font-bold text-4xl">{project.name}</div>
              <div className="font-bold text-4xl">{project.amount} € </div>
              <a>Voir la facture</a>

              <div>{project.client?.name} </div>
              <button
                className="underline text-red-500"
                onClick={() => deleteProject(project.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
