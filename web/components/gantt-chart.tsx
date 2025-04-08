"use client"

import type React from "react"

import { useState } from "react"

interface Task {
  id: number
  name: string
  startPercentage: number
  durationPercentage: number
  color: string
  startDate?: string
  endDate?: string
  duration?: string
  percentDone?: number
  resource?: string
  isCriticalPath?: boolean
}

interface GanttChartProps {
  tasks: Task[]
}

export function GanttChart({ tasks }: GanttChartProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const handleTaskClick = (task: Task, e: React.MouseEvent) => {
    // Calcular la posición del tooltip basado en la posición del clic
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setTooltipPosition({ x, y })
    setSelectedTask(task === selectedTask ? null : task)
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[800px] relative">
          {/* Gantt Chart Rows */}
          {tasks.map((task, index) => (
            <div key={task.id} className={`grid grid-cols-[250px_1fr] ${index % 2 === 0 ? "bg-muted/20" : ""}`}>
              <div className="p-2 text-sm font-medium">{task.name}</div>
              <div className="p-2 relative">
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-6 rounded cursor-pointer hover:brightness-90 transition-all"
                  style={{
                    left: `${task.startPercentage}%`,
                    width: `${task.durationPercentage}%`,
                    backgroundColor: task.color,
                  }}
                  onClick={(e) => handleTaskClick(task, e)}
                ></div>
              </div>
            </div>
          ))}

          {/* Tooltip */}
          {selectedTask && (
            <div
              className="absolute bg-white border shadow-lg rounded-md p-3 z-10 w-64"
              style={{
                left: `${tooltipPosition.x + 20}px`,
                top: `${tooltipPosition.y}px`,
                transform: tooltipPosition.x > 500 ? "translateX(-100%)" : "none",
              }}
            >
              <div className="font-medium mb-2">
                {selectedTask.name}{" "}
                {selectedTask.startDate &&
                  selectedTask.endDate &&
                  `(${selectedTask.startDate} - ${selectedTask.endDate})`}
              </div>

              <div className="grid grid-cols-2 gap-y-1 text-sm">
                <div className="text-muted-foreground">Duración:</div>
                <div className="font-medium">{selectedTask.duration || "7 días"}</div>

                <div className="text-muted-foreground">Porcentaje:</div>
                <div className="font-medium">{selectedTask.percentDone || "100"}%</div>

                {selectedTask.resource && (
                  <>
                    <div className="text-muted-foreground">Recurso:</div>
                    <div className="font-medium text-red-500">{selectedTask.resource}</div>
                  </>
                )}

                {selectedTask.isCriticalPath !== undefined && (
                  <>
                    <div className="text-muted-foreground">Ruta crítica:</div>
                    <div className="font-medium">{selectedTask.isCriticalPath ? "Sí" : "No"}</div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="border-t p-2 overflow-x-auto">
        <div className="min-w-[800px] flex justify-between text-xs text-muted-foreground">
          <span>Aug 11</span>
          <span>Sep 1</span>
          <span>Sep 15</span>
          <span>Oct 1</span>
          <span>Oct 15</span>
          <span>Nov 1</span>
          <span>Nov 15</span>
          <span>Dec 1</span>
        </div>
      </div>
    </div>
  )
}

