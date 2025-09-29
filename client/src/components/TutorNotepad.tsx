import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Pen, 
  Eraser, 
  Type, 
  Palette, 
  RotateCcw, 
  Download,
  Trash2
} from "lucide-react";

const colors = [
  "#000000", // Black
  "#ef4444", // Red
  "#3b82f6", // Blue  
  "#22c55e", // Green
  "#f59e0b", // Yellow
  "#8b5cf6", // Purple
  "#f97316", // Orange
];

interface TutorNotepadProps {
  isVisible: boolean;
}

export default function TutorNotepad({ isVisible }: TutorNotepadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<"pen" | "eraser" | "text">("pen");
  const [currentColor, setCurrentColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(3);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set default styles
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [isVisible]);

  const startDrawing = (e: React.MouseEvent) => {
    if (tool !== "pen" && tool !== "eraser") return;
    
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    if (!rect) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = brushSize * 3;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const downloadCanvas = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "notepad-drawing.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  if (!isVisible) return null;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Tutor Notepad</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4 p-4">
        {/* Drawing Tools */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={tool === "pen" ? "default" : "outline"}
            size="sm"
            onClick={() => setTool("pen")}
            data-testid="button-tool-pen"
          >
            <Pen className="w-4 h-4" />
          </Button>
          <Button
            variant={tool === "eraser" ? "default" : "outline"}
            size="sm"
            onClick={() => setTool("eraser")}
            data-testid="button-tool-eraser"
          >
            <Eraser className="w-4 h-4" />
          </Button>
          <Button
            variant={tool === "text" ? "default" : "outline"}
            size="sm"
            onClick={() => setTool("text")}
            data-testid="button-tool-text"
          >
            <Type className="w-4 h-4" />
          </Button>
        </div>

        {/* Color Palette */}
        <div className="flex flex-wrap gap-1">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-6 h-6 rounded border-2 ${
                currentColor === color ? "border-foreground" : "border-border"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setCurrentColor(color)}
              data-testid={`button-color-${color}`}
            />
          ))}
        </div>

        {/* Brush Size */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Size:</span>
          <input
            type="range"
            min="1"
            max="10"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="flex-1"
            data-testid="slider-brush-size"
          />
          <span className="text-sm w-6">{brushSize}</span>
        </div>

        <Separator />

        {/* Canvas */}
        <div className="flex-1 border rounded-lg overflow-hidden bg-white">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            data-testid="canvas-drawing"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearCanvas}
            data-testid="button-clear-canvas"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadCanvas}
            data-testid="button-download-canvas"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>

        <Separator />

        {/* Text Notes */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Quick Notes:</label>
          <textarea
            placeholder="Add your notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-24 p-2 border rounded-md text-sm resize-none"
            data-testid="textarea-notes"
          />
        </div>
      </CardContent>
    </Card>
  );
}