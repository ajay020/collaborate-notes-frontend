import type { Note } from "../types/note.types";
import { apiClient } from "./client";

export const noteApi = {
    // Get all notes for the dashboard
    getAllNotes: async (): Promise<Note[]> => {
        const response = await apiClient.get<Note[]>("/notes");
        return response.data;
    },

    // Initialize a new note in the database
    createNote: async (noteId: string, title: string): Promise<Note> => {
        const response = await apiClient.post<Note>("/notes", { noteId, title });
        return response.data;
    },

    // Delete a note from the dashboard
    deleteNote: async (noteId: string): Promise<{ message: string }> => {
        const response = await apiClient.delete(`/notes/${noteId}`);
        return response.data;
    }
};