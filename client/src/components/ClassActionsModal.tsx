import { Class } from "@/components/RightSidebar";
import { User } from "@/components/LeftSidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Users, Plus, Video } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface ClassActionsModalProps {
  classItem: Class | null;
  isOpen: boolean;
  onClose: () => void;
  onGoLive?: () => void;
  onShowMembers?: () => void;
  onAddConnection?: (userId: string) => void;
  onDeleteClass?: () => void;
  availableUsers?: User[];
}

export default function ClassActionsModal({
  classItem,
  isOpen,
  onClose,
  onGoLive,
  onShowMembers,
  onAddConnection,
  onDeleteClass,
  availableUsers = [],
}: ClassActionsModalProps) {
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const handleAddConnection = () => {
    if (selectedUserId) {
      onAddConnection?.(selectedUserId);
      setSelectedUserId("");
    }
  };

  const handleDeleteClass = () => {
    if (confirm(`Are you sure you want to delete "${classItem?.name}"?`)) {
      onDeleteClass?.();
      onClose();
    }
  };

  if (!classItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{classItem.name}</DialogTitle>
          <DialogDescription>
            Manage your class settings and members
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {/* Go Live Button */}
          <Button
            onClick={() => {
              onGoLive?.();
              onClose();
            }}
            className="w-full gap-2 justify-start"
            variant="outline"
          >
            <Video className="w-4 h-4" />
            Go Live on Class
          </Button>

          {/* Show Live Members Button */}
          <Button
            onClick={() => {
              onShowMembers?.();
              onClose();
            }}
            className="w-full gap-2 justify-start"
            variant="outline"
          >
            <Users className="w-4 h-4" />
            Show Live Members ({classItem.studentsCount})
          </Button>

          {/* Add Connection to Class */}
          <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium">Add Connection to Class</p>
            <div className="flex gap-2">
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select user..." />
                </SelectTrigger>
                <SelectContent>
                  {availableUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleAddConnection}
                size="sm"
                disabled={!selectedUserId}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Delete Class Button */}
          <Button
            onClick={handleDeleteClass}
            className="w-full gap-2 justify-start"
            variant="destructive"
          >
            <Trash2 className="w-4 h-4" />
            Delete Class
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
