import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type UserStatus = "online" | "away" | "offline";

export interface User {
  id: string;
  name: string;
  role: "teacher" | "student";
  status: UserStatus;
}

interface LeftSidebarProps {
  users?: User[];
  onAddUser?: (name: string, role: "teacher" | "student") => void;
}

const getStatusColor = (status: UserStatus) => {
  switch (status) {
    case "online":
      return "bg-green-500";
    case "away":
      return "bg-yellow-500";
    case "offline":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};

export default function LeftSidebar({ users = [], onAddUser }: LeftSidebarProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState<"teacher" | "student">("student");

  const handleAddUser = () => {
    if (name.trim()) {
      onAddUser?.(name, role);
      setName("");
      setRole("student");
      setOpen(false);
    }
  };

  return (
    <div className="w-64 bg-card border-r border-card-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-card-border">
        <h2 className="text-sm font-semibold">My Connections</h2>
      </div>

      {/* Add User Button */}
      <div className="p-4 border-b border-card-border">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Teacher/Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Teacher or Student</DialogTitle>
              <DialogDescription>
                Enter the name and select the role to add a new user.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(v) => setRole(v as "teacher" | "student")}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddUser} className="w-full">
                Add User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {users.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No users added yet
            </p>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div
                  className={`w-3 h-3 rounded-full flex-shrink-0 ${getStatusColor(user.status)}`}
                  title={user.status}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
