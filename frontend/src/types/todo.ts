export type Status = "completed" | "pending"

export interface ITodo {
    _id: string;
    task: string;
    deadline: string;
    status: Status
}