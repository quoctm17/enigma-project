import * as React from "react"
import { cn } from "@/lib/utils"

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean
    onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className, ...props }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
            <div
                className={cn(
                    "w-full max-w-lg p-6 bg-background rounded-md shadow-lg",
                    className
                )}
                {...props}
            >
                {children}
                <button
                    onClick={onClose}
                    className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export { Modal }
