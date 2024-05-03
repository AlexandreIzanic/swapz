import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import userStore from "../../store/user";
import { supabase } from "../../helper/supabaseClient";

const Settings = () => {
  const user = userStore((state) => state.user);

  const disconnectSessionSupabase = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <div className="p-10 flex flex-col gap-3">
      <h1 className="font-bold text-5xl">Settings</h1>
      <Button
        className="bg-red-400 w-1/6"
        onClick={() => disconnectSessionSupabase()}
      >
        Se déconnecter
      </Button>
      <Label>Email</Label>
      <Input className="bg-black w-1/6" type="email" placeholder="Email" />
      <Label>username</Label>
      <Input
        className="bg-black w-1/6"
        type="username"
        placeholder="Username"
        value={user?.username}
      />

      <div className="font-bold text-3xl">Comptabilité</div>
      <Label>Urssaf</Label>
      <Input className="bg-black w-1/6" type="text" placeholder="Tax" />
    </div>
  );
};

export default Settings;
