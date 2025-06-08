import React from 'react';
import { Scale, RotateCcw, Info } from 'lucide-react';

interface ChatHeaderProps {
  onClearChat: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClearChat }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-amber-400 p-2 rounded-lg">
            <Scale size={24} className="text-blue-900" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Sheria AI</h1>
            <p className="text-blue-100 text-sm">Constitutional Law Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onClearChat}
            className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition-colors duration-200 text-sm"
            title="Start new conversation"
          >
            <RotateCcw size={16} />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>
      </div>
      
      <div className="mt-3 flex items-start gap-2 bg-blue-500/20 rounded-lg p-3">
        <Info size={16} className="text-blue-200 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-100">
          <p className="font-medium mb-1">About Sheria AI</p>
          <p className="text-xs leading-relaxed">
            I'm specialized in the Constitution of Kenya. Ask me about constitutional rights, 
            government structure, legal procedures, or any provisions in Kenya's 2010 Constitution.
          </p>
        </div>
      </div>
    </div>
  );
};