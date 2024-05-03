import { useEffect, useState } from "react";
import { supabase } from "../../helper/supabaseClient";
import userStore from "../../store/user";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const Clients = () => {
  const user = userStore((state) => state.user);
  const [clients, setClients] = useState([]);
  const fetchClients = async () => {
    const { data } = await supabase
      .from("clients")
      .select("*")
      .eq("user_id", user.id);

    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, [user]);

  console.log(clients);

  return (
    <div className="p-10">
      {/* table */}
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Clients;
