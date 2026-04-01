import { create } from 'zustand';
import { noteApi } from '../api/notes-api';
import type { Note } from '../types/note.types';

interface NoteState {
    notes: Note[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchNotes: () => Promise<void>;
    addNote: (noteId: string) => Promise<void>;
    removeNote: (noteId: string) => Promise<void>;
}

export const useNoteStore = create<NoteState>((set, get) => ({
    notes: [],
    isLoading: false,
    error: null,

    fetchNotes: async () => {
        set({ isLoading: true, error: null });
        try {
            const notes = await noteApi.getAllNotes();
            set({ notes, isLoading: false });
        } catch (err) {
            set({ error: "Failed to load notes", isLoading: false });
        }
    },

    addNote: async (noteId: string) => {
        try {
            const newNote = await noteApi.createNote(noteId);
            // Update the local state so the UI reflects the change immediately
            set((state) => ({ notes: [newNote, ...state.notes] }));
        } catch (err) {
            set({ error: "Failed to create note" });
        }
    },

    removeNote: async (noteId: string) => {
        // Optimistic Update: Remove it from UI first
        const previousNotes = get().notes;
        set((state) => ({
            notes: state.notes.filter((n) => n.noteId !== noteId)
        }));

        try {
            await noteApi.deleteNote(noteId);
        } catch (err) {
            // Rollback if API fails
            set({ notes: previousNotes, error: "Delete failed" });
        }
    }
}));