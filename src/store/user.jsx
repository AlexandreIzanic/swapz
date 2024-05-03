import { create } from "zustand";
import { supabase } from "../helper/supabaseClient";

const userStore = create((set) => ({
  user: null,
  fetchUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user.id)
      .single();
    console.log(data);
    set({ user: data });
  },
}));

export default userStore;
