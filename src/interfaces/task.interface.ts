export interface Task {
    id: number;
    title: string;
    description: string | null;
    status: 'pending' | 'completed';
    created_at: Date;
    updated_at: Date;
  }