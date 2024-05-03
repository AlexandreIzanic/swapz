import { Link } from "react-router-dom";
import userStore from "../../store/user";
import { useEffect, useState } from "react";
import { supabase } from "../../helper/supabaseClient";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useToast } from "../../components/ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
const Home = () => {
  const user = userStore((state) => state.user);

  return (
    <div className="p-10 flex flex-col gap-3">
      <div className="text-[#44DE67] text-3xl font-medium">
        Bienvenue,{" "}
        <span className="text-4xl font-bold ">{user?.username} !</span>
      </div>
      <div className="font-medium">
        Ceci est ton dashboard. Ici tu verras ton activité récente et tes
        indicateurs clés.
      </div>
      <Revenues user={user} />
      <Projects user={user} />
      <ProjectsPaided user={user} />
    </div>
  );
};

export default Home;

const Revenues = ({ user }) => {
  const [revenues, setRevenues] = useState(0);

  const fetchRevenues = async () => {
    const { data } = await supabase
      .from("projects")
      .select("amount")
      .eq("user_id", user.id);

    const total = data.reduce((acc, project) => acc + project.amount, 0);
    setRevenues(total);
  };

  useEffect(() => {
    fetchRevenues();
  }, [user]);

  return (
    <Link
      to="/clients"
      className="bg-[#E9FFEE] w-full rounded-lg text-black flex gap-2 p-6"
    >
      <div className="flex flex-col">
        <div className="font-bold text-7xl">{revenues > 0 && revenues} €</div>
        <div className="font-medium text-4xl">de CA</div>
      </div>
    </Link>
  );
};

const Projects = ({ user }) => {
  const { toast } = useToast();
  const [projectsCount, setProjectsCount] = useState(0);
  const [nameNewProject, setNameNewProject] = useState("");
  const [amountNewProject, setAmountNewProject] = useState(0);

  const createProject = async () => {
    const { data, error } = await supabase.from("projects").insert({
      name: nameNewProject,
      amount: amountNewProject,
      user_id: user.id,
    });

    if (error) {
      console.log("error", error);
    } else {
      console.log("data", data);
      fetchProjectsCount();
      setNameNewProject("");
      setAmountNewProject(0);
      toast({
        description: "Nouveau projet créé avec succès",
      });
    }
  };
  const fetchProjectsCount = async () => {
    const { count } = await supabase
      .from("projects")
      .select("*", { count: "exact" })
      .eq("status", "pending")
      .eq("user_id", user.id);

    setProjectsCount(count);
  };

  useEffect(() => {
    fetchProjectsCount();
  }, [user]);
  return (
    <div className="flex gap-2">
      <Link
        to="/projects"
        className="bg-[#92EDED] w-full rounded-lg text-black flex gap-2 p-6"
      >
        <div className="flex justify-center items-center gap-3">
          <div className="text-7xl font-bold "> {projectsCount} </div>

          <div className="flex flex-col font-medium">
            <div className="text-4xl">projets</div>
            <div className="text-4xl">en cours</div>
          </div>
        </div>
      </Link>
      <div className="bg-[#92edbe] rounded-lg  text-black font-bold text-4xl  justify-center text-center flex w-52">
        <Dialog>
          <DialogTrigger asChild>
            <button> +</button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter un Projet</DialogTitle>
              <DialogDescription>
                Ajouter un nouveau projet à votre liste
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="name"
                  defaultValue={nameNewProject}
                  className="col-span-3"
                  onChange={(e) => setNameNewProject(e.target.value)}
                />

                <Label htmlFor="name" className="text-right">
                  amount
                </Label>
                <Input
                  id="amount"
                  defaultValue={amountNewProject}
                  className="col-span-3"
                  onChange={(e) => setAmountNewProject(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4"></div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={() => createProject()}>
                  Crée un projet
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const ProjectsPaided = ({ user }) => {
  const [projectsCount, setProjectsCount] = useState(0);

  const fetchProjectsCount = async () => {
    const { count } = await supabase
      .from("projects")
      .select("*", { count: "exact" })
      .eq("status", "paid")
      .eq("user_id", user.id);

    setProjectsCount(count);
  };

  useEffect(() => {
    fetchProjectsCount();
  }, [user]);
  return (
    <div className="flex gap-2">
      <Link
        to="/projects-paided"
        className="bg-[#000000] w-full rounded-lg text-white flex gap-2 p-6"
      >
        <div className="flex justify-center items-center gap-3">
          <div className="text-7xl font-bold "> {projectsCount} </div>

          <div className="flex flex-col font-medium">
            <div className="text-4xl">projets</div>
            <div className="text-4xl">terminés</div>
          </div>
        </div>
      </Link>
    </div>
  );
};
