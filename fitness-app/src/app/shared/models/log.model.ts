import { WorkoutExercise } from "./workout.model";

export interface WorkoutLog {
    id?: string;
    date: string;
    exercises: Array<WorkoutExercise & { name: string }>;
}