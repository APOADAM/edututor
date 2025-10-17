import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export interface Class {
  id: string;
  name: string;
  studentsCount: number;
  createdAt: string;
}

interface RightSidebarProps {
  classes?: Class[];
  onAddClass?: (name: string) => void;
  onClassClick?: (classItem: Class) => void;
}

export default function RightSidebar({ classes = [], onAddClass, onClassClick }: RightSidebarProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleAddClass = () => {
    if (name.trim()) {
      onAddClass?.(name);
      setName("");
      setOpen(false);
    }
  };

  return (
    <div className="w-64 bg-card/30 backdrop-blur border-l border-card-border/30 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-card-border/30">
        <h2 className="text-sm font-semibold">My Classes</h2>
      </div>

      {/* Add Class Button */}
      <div className="p-4 border-b border-card-border/30">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add to Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Class</DialogTitle>
              <DialogDescription>
                Enter a name for your new class.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="class-name">Class Name</Label>
                <Input
                  id="class-name"
                  placeholder="Enter class name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <Button onClick={handleAddClass} className="w-full">
                Create Class
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Classes List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {classes.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No classes created yet
            </p>
          ) : (
            classes.map((classItem) => (
              <Card
                key={classItem.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onClassClick?.(classItem)}
              >
                <CardContent className="p-3">
                  <p className="text-sm font-medium truncate">{classItem.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {classItem.studentsCount} students
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
