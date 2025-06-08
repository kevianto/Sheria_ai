import { useState, useCallback } from 'react';
import { Message, ChatState } from '../types/chat';
import { chatApi, ApiError } from '../services/api';

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        content: 'Hello! I\'m Sheria AI, your constitutional law assistant. I can help you understand the Constitution of Kenya. What would you like to know?',
        role: 'assistant',
        timestamp: new Date(),
      }
    ],
    isLoading: false,
    error: null,
  });

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || state.isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await chatApi.sendMessage(content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : 'An unexpected error occurred';
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  }, [state.isLoading]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const clearChat = useCallback(() => {
    setState({
      messages: [
        {
          id: '1',
          content: 'Hello! I\'m Sheria AI, your constitutional law assistant. I can help you understand the Constitution of Kenya. What would you like to know?',
          role: 'assistant',
          timestamp: new Date(),
        }
      ],
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearError,
    clearChat,
  };
};