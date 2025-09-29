import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { GripVertical } from "lucide-react";

interface ResizableLayoutProps {
  leftPanel?: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel?: React.ReactNode;
  showLeftPanel?: boolean;
  showRightPanel?: boolean;
  leftPanelDefaultSize?: number;
  rightPanelDefaultSize?: number;
  leftPanelMinSize?: number;
  rightPanelMinSize?: number;
}

export default function ResizableLayout({
  leftPanel,
  centerPanel,
  rightPanel,
  showLeftPanel = true,
  showRightPanel = true,
  leftPanelDefaultSize = 25,
  rightPanelDefaultSize = 25,
  leftPanelMinSize = 15,
  rightPanelMinSize = 15
}: ResizableLayoutProps) {
  return (
    <PanelGroup direction="horizontal" className="h-full">
      {/* Left Panel - Subtopics */}
      {showLeftPanel && leftPanel && (
        <>
          <Panel 
            defaultSize={leftPanelDefaultSize} 
            minSize={leftPanelMinSize}
            className="min-w-0"
            id="left-panel"
          >
            <div className="h-full p-4 overflow-auto">
              {leftPanel}
            </div>
          </Panel>
          <PanelResizeHandle className="w-2 bg-border hover:bg-accent transition-colors flex items-center justify-center group">
            <GripVertical className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
          </PanelResizeHandle>
        </>
      )}

      {/* Center Panel - Main Content */}
      <Panel 
        className="min-w-0 flex-1"
        minSize={30}
        id="center-panel"
      >
        <div className="h-full overflow-hidden">
          {centerPanel}
        </div>
      </Panel>

      {/* Right Panel - Notepad */}
      {showRightPanel && rightPanel && (
        <>
          <PanelResizeHandle className="w-2 bg-border hover:bg-accent transition-colors flex items-center justify-center group">
            <GripVertical className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
          </PanelResizeHandle>
          <Panel 
            defaultSize={rightPanelDefaultSize} 
            minSize={rightPanelMinSize}
            className="min-w-0"
            id="right-panel"
          >
            <div className="h-full p-4 overflow-auto">
              {rightPanel}
            </div>
          </Panel>
        </>
      )}
    </PanelGroup>
  );
}