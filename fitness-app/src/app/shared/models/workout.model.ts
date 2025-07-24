export interface WorkoutExercise {
    exerciseId: string;
    sets: number;
    reps: number;
    duration: number;
}

export interface Workout {
    id?: string;
    _id?: string;
    date: string;
    exercises: WorkoutExercise[];
}